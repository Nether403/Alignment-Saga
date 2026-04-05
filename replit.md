# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### AI Alignment: The Crisis (`artifacts/alignment-game`)
A complete browser-based text adventure game inspired by Eliezer Yudkowsky's AI safety work.

**Architecture**: React + Vite, no backend, all state in React useState + localStorage (`alignment_game_save_v2`).

**Game structure**:
- 3 Acts, 28+ scenes
- 4 player roles: Builder, Auditor, Diplomat, Defector
- 5 factions: Forge, Covenant, Accord, Veil, Lantern
- 6 global variables (0–4 scale): Trust, Capability, Oversight, Instability, Public Pressure, Corruption
- 22 boolean flags
- 5 endings: E27 (Fragile Containment), E28 (Managed Triumph), E29 (Coordination Peace), E30 (Ruin by Acceleration), E31 (Pyrrhic Prevention)

**Key files**:
- `src/types/game.ts` — All TypeScript interfaces
- `src/engine/initialState.ts` — createInitialState(), clamp helpers
- `src/engine/gameReducer.ts` — Pure state reducer (applyChoice)
- `src/engine/sceneRegistry.ts` — Scene lookup, Act 2 hub utilities
- `src/engine/scenes/act1.ts` — 10 Act 1 scenes
- `src/engine/scenes/act2.ts` — 12 Act 2 scenes (hub + branches + optional)
- `src/engine/scenes/act3.ts` — Act 3 crisis + endings + determineEnding()
- `src/App.tsx` — Main state orchestration, phase routing
- `src/components/` — HUD, GameScene, TypewriterText, EndingScreen, etc.

**Images**: All 28 scene illustrations in `public/scenes/`, faction portraits in `public/factions/`, title screen at `public/title_screen.png`. Generated at build time using AI image generation.

**Act 2 Hub routing**: After A1_S10, game goes to `A2_HUB` state. Player picks from available core/optional branches. After completing 2+ core branches, `A2_S19_READY` unlocks the midpoint revelation.

**Visual style**: "Haunted institutional retro-futurism" — smoke black, weathered bronze, dusty parchment, amber glow.
