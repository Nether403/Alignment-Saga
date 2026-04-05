import { useState, useEffect, useCallback } from 'react';
import type { Choice, GameState } from './types/game';
import { createInitialState } from './engine/initialState';
import { gameReducer } from './engine/gameReducer';
import { getScene, getAct2HubScenes, canProceedToRevelation } from './engine/sceneRegistry';
import type { Role } from './types/game';

import { TitleScreen } from './components/TitleScreen';
import { StoryBriefingScreen } from './components/StoryBriefingScreen';
import { RoleSelectScreen } from './components/RoleSelectScreen';
import { HowToPlayScreen } from './components/HowToPlayScreen';
import { GameScene } from './components/GameScene';
import { HUD } from './components/HUD';
import { ConsequenceModal } from './components/ConsequenceModal';
import { PanelOverlay } from './components/PanelOverlay';
import { Act2Hub } from './components/Act2Hub';
import { EndingScreen } from './components/EndingScreen';
import { TutorialOverlay, shouldShowTutorial } from './components/TutorialOverlay';

const SAVE_KEY = 'alignment_game_save_v2';

type UIPhase =
  | 'title'
  | 'how_to_play'
  | 'story_briefing'
  | 'role_select'
  | 'playing'
  | 'consequence'
  | 'ending';

function hasSaveGame(): boolean {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return false;
    const parsed: GameState = JSON.parse(saved);
    return !!(parsed?.role && parsed.phase !== 'summary');
  } catch {
    return false;
  }
}

export default function App() {
  const [uiPhase, setUiPhase] = useState<UIPhase>('title');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [openPanel, setOpenPanel] = useState<'journal' | 'evidence' | 'alerts' | null>(null);
  const [act2DirectScene, setAct2DirectScene] = useState<string | null>(null);
  const [skipAnim, setSkipAnim] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [saveExists, setSaveExists] = useState(hasSaveGame);

  // Persist state
  useEffect(() => {
    if (gameState) {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
      } catch {}
    }
  }, [gameState]);

  const applyChoice = useCallback((state: GameState, choice: Choice, sceneId: string): GameState => {
    return gameReducer(state, { type: 'MAKE_CHOICE', choice, sceneId });
  }, []);

  const handleStart = useCallback(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const parsed: GameState = JSON.parse(saved);
        if (parsed?.role && parsed.phase !== 'summary') {
          setGameState(parsed);
          setSaveExists(true);
          if (parsed.phase === 'ending') {
            setUiPhase('ending');
          } else {
            setUiPhase('playing');
          }
          return;
        }
      }
    } catch {}
    // New game — go to story briefing first
    setUiPhase('story_briefing');
  }, []);

  const handleNewGame = useCallback(() => {
    try { localStorage.removeItem(SAVE_KEY); } catch {}
    setSaveExists(false);
    setGameState(null);
    setAct2DirectScene(null);
    setSkipAnim(false);
    setShowTutorial(false);
    setUiPhase('story_briefing');
  }, []);

  const handleRoleSelect = useCallback((role: Role) => {
    const initialState = createInitialState(role);
    setGameState(initialState);
    setAct2DirectScene(null);
    // Show tutorial only for first-time players
    const firstRun = shouldShowTutorial();
    setShowTutorial(firstRun);
    setUiPhase('playing');
  }, []);

  const handleChoice = useCallback((choice: Choice, sceneId: string, fromAct2Direct = false) => {
    if (!gameState) return;

    const newState = applyChoice(gameState, choice, sceneId);
    setGameState(newState);

    if (fromAct2Direct) {
      setAct2DirectScene(null);
    }

    if (choice.consequence) {
      if (newState.phase === 'ending') {
        setUiPhase('ending');
      } else {
        setUiPhase('consequence');
      }
    } else {
      if (newState.phase === 'ending') {
        setUiPhase('ending');
      }
    }
  }, [gameState, applyChoice]);

  const handleConsequenceContinue = useCallback(() => {
    if (!gameState) return;
    if (gameState.phase === 'ending') {
      setUiPhase('ending');
    } else {
      setUiPhase('playing');
    }
  }, [gameState]);

  const handleRestart = useCallback(() => {
    localStorage.removeItem(SAVE_KEY);
    setSaveExists(false);
    setGameState(null);
    setAct2DirectScene(null);
    setSkipAnim(false);
    setShowTutorial(false);
    setUiPhase('title');
  }, []);

  // --- Routing logic ---
  const currentSceneId = gameState?.currentSceneId;
  const isAct2Hub = currentSceneId === 'A2_HUB' || currentSceneId === 'A2_S19_READY';

  const displaySceneId = act2DirectScene || currentSceneId;
  const currentScene = displaySceneId && !isAct2Hub
    ? getScene(displaySceneId)
    : isAct2Hub && !act2DirectScene
    ? null
    : displaySceneId
    ? getScene(displaySceneId)
    : null;

  const act2HubData = (isAct2Hub && gameState && !act2DirectScene)
    ? getAct2HubScenes(gameState)
    : null;

  const showRevelationButton = (isAct2Hub && gameState)
    ? canProceedToRevelation(gameState)
    : false;

  // --- Render ---

  if (uiPhase === 'title') {
    return (
      <div className="w-screen h-screen bg-stone-950 overflow-hidden">
        <TitleScreen
          onStart={handleStart}
          onNewGame={handleNewGame}
          onHowToPlay={() => setUiPhase('how_to_play')}
          hasSave={saveExists}
        />
      </div>
    );
  }

  if (uiPhase === 'how_to_play') {
    return (
      <div className="w-screen h-screen bg-stone-950 overflow-hidden">
        <HowToPlayScreen onBack={() => setUiPhase('title')} />
      </div>
    );
  }

  if (uiPhase === 'story_briefing') {
    return (
      <div className="w-screen h-screen bg-stone-950 overflow-hidden">
        <StoryBriefingScreen onContinue={() => setUiPhase('role_select')} />
      </div>
    );
  }

  if (uiPhase === 'role_select') {
    return (
      <div className="w-screen h-screen bg-stone-950 overflow-hidden">
        <RoleSelectScreen onSelect={handleRoleSelect} />
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="w-screen h-screen bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 font-mono text-sm">Loading...</p>
      </div>
    );
  }

  if (uiPhase === 'ending') {
    return (
      <div className="w-screen h-screen bg-stone-950 overflow-y-auto">
        <EndingScreen state={gameState} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-stone-950 flex overflow-hidden">
      {/* HUD sidebar */}
      <HUD
        state={gameState}
        onJournalClick={() => setOpenPanel('journal')}
        onEvidenceClick={() => setOpenPanel('evidence')}
        onAlertsClick={() => setOpenPanel('alerts')}
      />

      {/* Main area */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative pb-16 md:pb-0">
        {/* Consequence modal */}
        {uiPhase === 'consequence' && gameState.lastConsequenceText && (
          <ConsequenceModal
            text={gameState.lastConsequenceText}
            onContinue={handleConsequenceContinue}
          />
        )}

        {/* Skip animation toggle */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={() => setSkipAnim(v => !v)}
            className="text-xs font-mono text-stone-700 hover:text-stone-400 transition-colors"
          >
            {skipAnim ? '[anim: off]' : '[anim: on]'}
          </button>
        </div>

        {/* Act 2 Hub */}
        {isAct2Hub && act2HubData && !act2DirectScene && (
          <Act2Hub
            state={gameState}
            coreScenes={act2HubData.core}
            optionalScenes={act2HubData.optional}
            canReveal={showRevelationButton}
            onSelectScene={(id) => {
              setAct2DirectScene(id);
            }}
            onProceedToRevelation={() => {
              if (!gameState) return;
              const revelationChoice: Choice = {
                id: 'proceed_revelation',
                text: 'Proceed to midpoint revelation',
                consequence: 'You gather the collected evidence and prepare to face what it reveals about the institution you have served.',
                nextSceneId: 'A2_S19',
              };
              handleChoice(revelationChoice, 'A2_HUB');
            }}
          />
        )}

        {/* Act 2 direct scene */}
        {act2DirectScene && currentScene && (
          <GameScene
            key={act2DirectScene}
            scene={currentScene}
            state={gameState}
            skipAnimation={skipAnim}
            onChoice={(choice) => {
              handleChoice(choice, act2DirectScene, true);
            }}
          />
        )}

        {/* Regular scene */}
        {!isAct2Hub && !act2DirectScene && currentScene && (
          <GameScene
            key={currentScene.id}
            scene={currentScene}
            state={gameState}
            skipAnimation={skipAnim}
            onChoice={(choice) => {
              handleChoice(choice, currentScene.id);
            }}
          />
        )}

        {/* Fallback */}
        {!currentScene && !isAct2Hub && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-stone-500 font-mono text-sm mb-2">Scene not found: {currentSceneId}</p>
              <button
                onClick={handleRestart}
                className="text-xs font-mono text-stone-600 hover:text-amber-400 transition-colors"
              >
                Return to Title
              </button>
            </div>
          </div>
        )}

        {/* Tutorial overlay — only on first run */}
        {showTutorial && uiPhase === 'playing' && (
          <TutorialOverlay onComplete={() => setShowTutorial(false)} />
        )}
      </main>

      {/* Panel overlays */}
      {openPanel && (
        <PanelOverlay
          type={openPanel}
          state={gameState}
          onClose={() => setOpenPanel(null)}
        />
      )}
    </div>
  );
}
