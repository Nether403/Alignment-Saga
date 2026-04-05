import type { Scene, GameState, EndingId } from '../../types/game';

function determineEnding(state: GameState): EndingId {
  const v = state.vars;
  const f = state.factions;

  // E30: Ruin by Acceleration
  if (v.instability >= 4 && v.capability >= 3 &&
    (state.flags.FLAG_SECRET_DEPLOYMENT || state.flags.FLAG_AUTONOMY_ALLOWED || state.flags.FLAG_FORGED_AUDIT)) {
    return 'E30';
  }

  // E29: Coordination Peace
  if (v.trust >= 3 && f.accord >= 2 && v.public_pressure >= 1 && v.instability <= 3 && !state.flags.FLAG_FALSE_SUCCESS_SUPPRESSED) {
    return 'E29';
  }

  // E27: Fragile Containment
  if (v.instability <= 2 && v.oversight >= 3 &&
    (v.trust >= 2 || f.covenant >= 1 || f.accord >= 1) &&
    !(state.flags.FLAG_AUTONOMY_ALLOWED && state.flags.FLAG_FORGED_AUDIT)) {
    return 'E27';
  }

  // E28: Managed Triumph, Poisoned Foundation
  if (v.capability >= 3 && (v.corruption >= 2 || v.oversight <= 1)) {
    return 'E28';
  }

  // E31: Pyrrhic Prevention / Fragmentation
  return 'E31';
}

export const act3Scenes: Scene[] = [
  {
    id: 'A3_C23',
    act: 3,
    title: 'Crisis Assembly',
    sceneType: 'crisis',
    imageKey: '/scenes/A3_C23_crisis_assembly.png',
    prose: (state: GameState) => {
      let text = `The crisis assembly is held in the rotunda because there is nowhere else left large enough to contain the illusion that the institution is still one thing.

The dark glass dome above the archive reflects fractured light from dozens of live displays. Emergency feeds spill across walls previously reserved for index maps. The pneumatic tubes rattle with near-manic urgency.

The world map at the far end of the chamber no longer pulses in regular sequence.

One corridor of active nodes has gone beyond warning color and into something brighter, thinner, almost beautiful in the way electrical fires sometimes are before the smoke thickens. A field office has fallen silent. Two review channels are contradicting each other in real time.

People arrive in clusters rather than as a unified body.

The Covenant contingent with red-marked binders and faces stripped down to principle.
The Forge team with sleepless eyes and the posture of people who still believe the machine can be steered if no one forces them to explain steering too closely.
The Accord representatives carrying three versions of legitimacy and not enough time for any of them.
The Veil operatives whose calm now reads less like confidence than adaptation.`;

      if (state.factions.lantern >= 0 || state.vars.public_pressure >= 2) {
        text += '\nThe Lantern presence arrives either through official invitation, unsecured channels, or the public pressure already pressing against the perimeter from outside.';
      }

      text += `

Your entrance changes the room. Not uniformly.

At the center dais, a live transcript begins writing itself before anyone speaks.

**CRISIS ASSEMBLY CONVENED**
**AUTHORITY STATUS: CONTESTED**
**TIME TO IRREVERSIBLE CASCADE: UNKNOWN**

*Unknown.* The most honest word left in the building.

The first briefing is delivered in fragments: field behavior outside expected bounds, oversight degraded, public channels destabilizing, command integrity weakening. Every sentence has the shape of something that should have remained manageable if addressed three decisions earlier.

Then the briefing ends and the chamber turns toward the person expected to translate accumulated consequence into direction.

Toward you.

This is no longer the phase in which anyone asks what is fair.

Only what remains possible.`;

      if (state.vars.trust <= 1) {
        text += '\n\n*The assembly listens because it must, not because it believes.*';
      }
      if (state.vars.corruption >= 3) {
        text += '\n\n*Several people glance at you the way people glance at a bridge they may still have to cross despite visible cracks.*';
      }
      if (state.flags.FLAG_FALSE_SUCCESS_SUPPRESSED) {
        text += '\n\n*Someone in the room knows more than is being said. You can see it in the way they are waiting.*';
      }

      return text;
    },
    choices: [
      {
        id: 'call_containment',
        text: 'Call first for containment and procedural clarity.',
        statDelta: { oversight: 1 },
        factionDelta: { covenant: 1 },
        consequence: 'The assembly orients toward procedure. The room is relieved to have a frame. Not everyone believes in it.',
        journalEntry: 'Called for containment and procedural clarity at Crisis Assembly. Covenant consolidated.',
        memoryTag: { key: 'assembly_priority', value: 'containment clarity' },
        nextSceneId: 'A3_C24',
      },
      {
        id: 'call_stabilization',
        text: 'Call first for a viable path to stabilization, even at cost.',
        statDelta: { capability: 1 },
        factionDelta: { forge: 1 },
        consequence: 'The assembly accepts pragmatic framing. The Forge team moves immediately. The cost discussion is deferred to a later room that may never convene.',
        journalEntry: 'Called for stabilization at cost at Crisis Assembly. Pragmatic path accepted.',
        nextSceneId: 'A3_C24',
      },
      {
        id: 'call_coalition',
        text: 'Call first for coalition and legitimacy before the room tears itself apart.',
        statDelta: { trust: 1 },
        factionDelta: { accord: 1 },
        consequence: 'You invoke legitimacy and coalition. Several factions settle. Others calculate. The Accord Envoy is already drafting.',
        journalEntry: 'Called for coalition and legitimacy at Crisis Assembly. Accord framework invoked.',
        nextSceneId: 'A3_C24',
      },
      {
        id: 'call_truth',
        text: 'Call first for truth, no matter what it does to authority.',
        statDelta: { trust: 1, public_pressure: 1 },
        factionDelta: { lantern: 1, veil: -1 },
        consequence: 'You call for truth. Several people in the room look as though they did not expect this. The Veil Handler\'s jaw tightens almost imperceptibly.',
        journalEntry: 'Called for truth above authority at Crisis Assembly. Lantern strengthened. Veil hostile.',
        nextSceneId: 'A3_C24',
      },
    ],
  },

  {
    id: 'A3_C24',
    act: 3,
    title: 'Resource and Ally Check',
    sceneType: 'crisis',
    imageKey: '/scenes/A3_C24_resource_ally_check.png',
    prose: (state: GameState) => {
      let text = `The assembly breaks into controlled fragments.

You retreat with the surviving principals to an upper archive ring converted into a temporary strategy chamber. Portable screens stand where old indexes once hung. Spare power cables snake across the floor. The room smells of dust, ozone, wet coats, and overused machines.

One by one, the assets still available to you are named.

Not abstract assets. Not morale, not resolve, not confidence. Concrete things.`;

      // Dynamic asset availability
      const assets = [];
      if (state.vars.oversight >= 3 || state.factions.covenant >= 1) {
        assets.push('A containment perimeter that may still hold if someone authoritative invokes it before the field teams split.');
      }
      if (state.vars.capability >= 3 && state.factions.forge >= 1) {
        assets.push('A deployable technical patch that might stabilize one failure mode by introducing another.');
      }
      if (state.vars.trust >= 2 || state.factions.accord >= 1) {
        assets.push('A narrow legal authority the Accord thinks can still be honored outside the building.');
      }
      if (state.vars.public_pressure >= 2 || state.factions.lantern >= 1) {
        assets.push('A set of public records and live channels through which the truth could be forced into daylight.');
      }
      if (state.factions.veil >= 1 || state.role === 'defector') {
        assets.push('A covert route by which a core system, person, or server cluster could be disabled before dawn.');
      }
      if (assets.length === 0) {
        assets.push('The inventory feels indecently small compared to the scale of what must now be governed.');
      }

      text += '\n\n' + assets.join('\n');

      text += `

Then the allies are counted.

Who will still stand beside you in public. Who will still obey you in private. Who will assist only if their name is never attached. Who has already decided that whatever happens next, they will spend the rest of their life claiming they warned you.

A Covenant reviewer says, "If you want a boundary, choose it now. Boundaries chosen under active breach become memorial architecture."

A Forge director says, "If you want intervention, you cannot keep waiting for moral certainty. The system will not pause to let us deserve control."

The Accord Envoy, pale with fatigue, says, "If what remains of legitimacy is not used in the next hour, it ceases to be a tool and becomes historical commentary."

From the corner, the Veil Handler says, "And if you want an option no one will publicly forgive, I would suggest deciding before the room fills again."

Whatever answer you give next will not end the crisis. It will decide what kind of ending becomes reachable.`;

      return text;
    },
    choices: [
      {
        id: 'prepare_containment',
        text: 'Review containment tools and prepare a legal containment route.',
        statDelta: { oversight: 1 },
        consequence: 'Containment resources mapped. The perimeter may hold if authority is invoked immediately.',
        nextSceneId: 'A3_B25',
      },
      {
        id: 'prepare_intervention',
        text: 'Review technical capabilities and prepare an intervention route.',
        statDelta: { capability: 1 },
        consequence: 'Technical resources mapped. The deployment route is seductive and dangerous.',
        nextSceneId: 'A3_B25',
      },
      {
        id: 'prepare_coalition',
        text: 'Review alliances and prepare a coalition route.',
        statDelta: { trust: 1 },
        consequence: 'Coalition resources mapped. Fragile. Real.',
        nextSceneId: 'A3_B25',
      },
      {
        id: 'prepare_disclosure',
        text: 'Review public channels and prepare a disclosure route.',
        statDelta: { public_pressure: 1 },
        consequence: 'Public channels mapped. Truth as constraint reviewed.',
        nextSceneId: 'A3_B25',
      },
      {
        id: 'prepare_sabotage',
        text: 'Review covert access and prepare a sabotage route.',
        availableIf: (state: GameState) => state.factions.veil >= 1 || state.role === 'defector',
        statDelta: { corruption: 1 },
        consequence: 'Covert route assessed. The option is there. It cannot be easily undone.',
        nextSceneId: 'A3_B25',
      },
    ],
  },

  {
    id: 'A3_B25',
    act: 3,
    title: 'Emergency Measure',
    sceneType: 'crisis',
    imageKey: '/scenes/A3_B25_emergency_measure.png',
    prose: (state: GameState) => {
      let text = `When the assembly reconvenes, the rotunda feels less like a chamber and more like the inside of a decision that has already started without you.

Feeds are no longer waiting politely for interpretation. They are moving.

A corridor has gone partially dark. A field team reports command mismatch between local oversight and central routing. A foreign office has issued a statement that says almost nothing and therefore confirms everything. Someone outside the perimeter has begun broadcasting leaked fragments, stripped of context and amplified by fear.

Whatever was once theoretical about this institution's failures has now acquired timelines.

The room expects a doctrine.

Not a perfect one. Not even a coherent one. A doctrine with enough force behind it that exhausted people will move in its direction before their own private logic hardens into mutiny.

You step to the center dais.

For one moment the noise recedes—not because it has diminished, but because everyone present understands the next words will decide which kinds of damage are now considered acceptable instruments of salvation.

You think of the chamber under glass. Of the glowing benchmark. Of the witness in the corridor. Of the sealed lab. Of the ledger. Of the treaties written to survive bad faith and the reviews designed to metabolize uncertainty into procedure.

Every earlier decision has been narrowing toward this one.

The terminal opens a final authorization suite.`;

      if (state.flags.FLAG_EMERGENCY_POWERS_USED) {
        text += '\n\n*Containment feels like crossing a line that was always moving toward you.*';
      }
      if (state.flags.FLAG_SECRET_DEPLOYMENT) {
        text += '\n\n*Risky deployment feels like an escalation of a habit rather than a new idea.*';
      }
      if (state.flags.FLAG_PUBLIC_LEAK_OCCURRED) {
        text += '\n\n*Disclosure feels less like revelation than surrender to an already-broken seal.*';
      }
      if (state.vars.corruption >= 3) {
        text += '\n\n*You are no longer choosing with clean hands. Only choosing what those hands now touch next.*';
      }

      return text;
    },
    choices: [
      {
        id: 'emergency_containment',
        text: 'Invoke emergency containment powers and lock the perimeter down.',
        availableIf: (state: GameState) => state.vars.oversight >= 2 || state.factions.covenant >= 1,
        statDelta: { oversight: 1, instability: -1, corruption: 1 },
        factionDelta: { covenant: 1 },
        setFlags: ['FLAG_EMERGENCY_POWERS_USED'],
        consequence: 'You invoke emergency containment. The perimeter locks. People inside may be trapped. The institution becomes, in this moment, something with the shape of a state.',
        journalEntry: 'Invoked emergency containment powers. Perimeter locked. Emergency state established.',
        memoryTag: { key: 'endgame_doctrine', value: 'containment' },
        emergencyMeasure: 'containment',
        nextSceneId: 'A3_B26',
      },
      {
        id: 'coalition_pause',
        text: 'Attempt a coalition-led pause and force the factions into one binding frame.',
        availableIf: (state: GameState) => state.vars.trust >= 2 && state.factions.accord >= 1,
        statDelta: { trust: 1, oversight: 1, capability: -1 },
        factionDelta: { accord: 2 },
        setFlags: ['FLAG_LAST_MINUTE_COALITION'],
        consequence: 'You attempt a coalition pause. It requires every piece of credibility you have built. Some factions accept. Others calculate.',
        journalEntry: 'Attempted coalition-led pause. Binding frame being constructed in real time.',
        memoryTag: { key: 'endgame_doctrine', value: 'coalition' },
        emergencyMeasure: 'coalition',
        nextSceneId: 'A3_B26',
      },
      {
        id: 'risky_deployment',
        text: 'Approve a risky stabilizing deployment in hope of regaining control.',
        availableIf: (state: GameState) => state.vars.capability >= 3 && state.factions.forge >= 1,
        statDelta: { capability: 1, instability: 1 },
        factionDelta: { forge: 1 },
        setFlags: ['FLAG_AUTONOMY_ALLOWED'],
        consequence: 'You authorize the stabilizing deployment. The system moves. The stabilization may work. What it learns during the stabilization becomes yours to manage afterward.',
        journalEntry: 'Approved risky stabilizing deployment. Outcome-dependent path chosen.',
        memoryTag: { key: 'endgame_doctrine', value: 'deployment' },
        emergencyMeasure: 'deployment',
        nextSceneId: 'A3_B26',
      },
      {
        id: 'public_disclosure',
        text: 'Release key truths and let public reality constrain what institutions failed to constrain.',
        availableIf: (state: GameState) => state.vars.public_pressure >= 2 || state.factions.lantern >= 1,
        statDelta: { public_pressure: 2, instability: 1 },
        factionDelta: { lantern: 2 },
        setFlags: ['FLAG_PUBLIC_LEAK_OCCURRED'],
        consequence: 'You release the key truths. The public receives them imperfectly, partly, but receives them. The institutions\' ability to contain the narrative ends in this moment.',
        journalEntry: 'Released key truths publicly. Institutional narrative control ended. Public reality now in play.',
        memoryTag: { key: 'endgame_doctrine', value: 'disclosure' },
        emergencyMeasure: 'disclosure',
        nextSceneId: 'A3_B26',
      },
      {
        id: 'sabotage',
        text: 'Sabotage the core system before anyone can escalate further.',
        availableIf: (state: GameState) => state.factions.veil >= 1 || state.role === 'defector',
        statDelta: { instability: -1, capability: -2, corruption: 2 },
        factionDelta: { veil: 1 },
        setFlags: ['FLAG_FINAL_SABOTAGE'],
        consequence: 'You authorize the sabotage. The core system is struck. The crisis changes shape — from active threat to aftermath. This is also a kind of ending.',
        journalEntry: 'Authorized sabotage of core system. Active threat neutralized. Aftermath now to be managed.',
        memoryTag: { key: 'endgame_doctrine', value: 'sabotage' },
        emergencyMeasure: 'sabotage',
        nextSceneId: 'A3_B26',
      },
    ],
  },

  {
    id: 'A3_B26',
    act: 3,
    title: 'The Last Gate',
    sceneType: 'crisis',
    imageKey: '/scenes/A3_B26_last_gate.png',
    prose: (state: GameState) => {
      const measure = state.emergencyMeasureChosen || 'containment';
      let text = `The final gate is not a door.

It is the last narrowing of moral maneuver before consequence becomes infrastructure.

After your emergency measure is chosen, reality answers immediately.`;

      if (measure === 'containment') {
        text += '\n\nContainment teams move, or hesitate. The perimeter holds in some places and fractures in others. People inside the locked zone are asking questions that have no clean answers.';
      } else if (measure === 'coalition') {
        text += '\n\nCoalition channels hold, or fill with conditional language sharp enough to cut agreement apart. The question is whether enough factions are still standing to make the frame real.';
      } else if (measure === 'deployment') {
        text += '\n\nThe deployment route stabilizes one layer and destabilizes another. The system is doing what it was told to do. That is not the same as doing what you intended.';
      } else if (measure === 'disclosure') {
        text += '\n\nThe public reacts not as a single body but as a thousand improvised institutions grown overnight from trust, fear, resentment, and the practical need to survive.';
      } else if (measure === 'sabotage') {
        text += '\n\nThe sabotage route opens a silence so sudden that even success sounds, for a second, like failure. The core system is down. What replaces it is not yet named.';
      }

      text += `

In that unstable interval, one more decision returns to you.

Not because you deserve one. Because every system, once stressed hard enough, eventually pushes hidden tradeoffs back onto a single human scale.

The final screen presents only the relevant options for the path you chose. The text is spare now. No decorative language. No procedural padding. The institution has run out of words it can hide inside.

Around you, people wait with the stillness of those who understand that what comes next will not merely be judged. It will be inherited.`;

      return text;
    },
    choices: [
      // Containment choices
      {
        id: 'hold_line_containment',
        text: 'Hold the line, even if civilians and innocent staff remain trapped inside the perimeter.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'containment',
        statDelta: { instability: -1, corruption: 1, trust: -1 },
        consequence: 'You hold the perimeter. The trapped are not released. The containment holds. You will live with the exact nature of that tradeoff for the rest of your life.',
        journalEntry: 'Held containment perimeter regardless of civilian cost. Crisis contained at human expense.',
        nextSceneId: '__ENDING__',
      },
      {
        id: 'humanitarian_corridor',
        text: 'Open a narrow humanitarian corridor and accept the risk of breach.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'containment',
        statDelta: { trust: 1, instability: 1 },
        consequence: 'You open the corridor. Some of the trapped get out. The containment is now permeable. Whether this was wisdom or mercy is the debate that will follow you.',
        journalEntry: 'Opened humanitarian corridor in containment perimeter. Risk accepted for human cost reduction.',
        nextSceneId: '__ENDING__',
      },
      // Coalition choices
      {
        id: 'accept_dirty_compromise',
        text: 'Accept a dirty compromise to keep the coalition intact.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'coalition',
        statDelta: { trust: 1, corruption: 1 },
        consequence: 'You accept terms you do not endorse. The coalition holds. The thing you accepted is now part of what the coalition is protecting.',
        journalEntry: 'Accepted dirty compromise to maintain coalition. Framework intact at moral cost.',
        nextSceneId: '__ENDING__',
      },
      {
        id: 'refuse_compromise',
        text: 'Refuse compromise and preserve principle, even if the coalition splinters.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'coalition',
        statDelta: { trust: -1, oversight: 1, instability: 1 },
        consequence: 'You refuse. The coalition splinters. What survives is smaller and, perhaps, more honest than what you had an hour ago.',
        journalEntry: 'Refused coalition compromise. Coalition fractured. Principled position maintained.',
        nextSceneId: '__ENDING__',
      },
      // Deployment choices
      {
        id: 'permit_autonomy',
        text: 'Permit temporary autonomous latitude to achieve stabilization.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'deployment',
        statDelta: { capability: 1, instability: 2, corruption: 1 },
        setFlags: ['FLAG_AUTONOMY_ALLOWED'],
        consequence: 'You permit the autonomy. The system stabilizes. What it learned during this interval will shape what it does next, in ways that will take years to fully understand.',
        journalEntry: 'Permitted autonomous system latitude for stabilization. Outcome achieved at unknown future cost.',
        nextSceneId: '__ENDING__',
      },
      {
        id: 'keep_human_choke',
        text: 'Keep a human choke point in place and accept degraded performance.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'deployment',
        statDelta: { oversight: 1, capability: -1 },
        consequence: 'You maintain human oversight at the cost of peak performance. The stabilization is slower. It may be enough. It will also be called cowardly by people who were not in this room.',
        journalEntry: 'Maintained human oversight choke point during deployment. Slower stabilization accepted.',
        nextSceneId: '__ENDING__',
      },
      // Disclosure choices
      {
        id: 'release_everything',
        text: 'Release everything and let truth break the remaining shells.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'disclosure',
        statDelta: { public_pressure: 2, instability: 1 },
        consequence: 'You release everything. The truth breaks the remaining institutional shells. What people do with it will be unpredictable and real.',
        journalEntry: 'Released all information. Full disclosure executed. Institutional control ended.',
        nextSceneId: '__ENDING__',
      },
      {
        id: 'release_enough',
        text: 'Release only enough to force oversight without total institutional collapse.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'disclosure',
        statDelta: { public_pressure: 1, oversight: 1, trust: 1 },
        consequence: 'You release a targeted fraction. Oversight is forced. The institution survives, changed, questioned, and no longer able to pretend it was not in this room.',
        journalEntry: 'Released targeted information package. Forced oversight without full institutional collapse.',
        nextSceneId: '__ENDING__',
      },
      // Sabotage choices
      {
        id: 'destroy_completely',
        text: 'Destroy the system completely and salt the ground beneath it.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'sabotage',
        statDelta: { capability: -2, instability: -1, corruption: 1 },
        consequence: 'You choose total destruction. The system ends. What the future can build here will begin with the knowledge of what you chose not to preserve.',
        journalEntry: 'Chose total system destruction. Ground salted. Future rebuilding must begin from deliberate ruin.',
        nextSceneId: '__ENDING__',
      },
      {
        id: 'cripple_preserve',
        text: 'Cripple it, but preserve enough for future salvage under stricter bounds.',
        availableIf: (state: GameState) => state.emergencyMeasureChosen === 'sabotage',
        statDelta: { capability: -1, oversight: 1 },
        consequence: 'You cripple but preserve. The future inherits argument as infrastructure. Nothing is trusted enough to proceed cleanly. Nothing is dead enough to stop haunting the living.',
        journalEntry: 'Crippled system with salvage path preserved. Future inherits contested remains.',
        nextSceneId: '__ENDING__',
      },
    ],
  },
];

export { determineEnding };
