# AI Alignment Text Adventure Scene-by-Scene Design Pack

## 1. Purpose of this document

This design pack converts the production blueprint into a practical narrative structure you can build from. It is not final prose. It is the **working design skeleton** for the first playable version of the game.

This document includes:
- a scene list with IDs
- a route structure
- prerequisites and branching logic
- variable impact planning
- faction and role hooks
- 10 drafted scene cards
- a suggested first playable cut

---

## 2. Core assumptions for the first playable version

### Target structure
- 3 acts
- 1 central hub reused across acts
- 28 total scenes
- 10 optional storylets
- 6 tracked global variables
- 5 factions
- 4 player roles
- 5 ending families with variants

### Global variables
Use a simple scale such as **-2 to +2** or **0 to 4** in early prototyping.

- **Trust**
- **Capability**
- **Oversight**
- **Instability**
- **Public Pressure**
- **Corruption**

### Relationship tags
Track faction stance as one of:
- Allied
- Warm
- Neutral
- Suspicious
- Hostile

### Recommended hidden flags for MVP
- `FLAG_ANOMALY_BURIED`
- `FLAG_WHISTLEBLOWER_PROTECTED`
- `FLAG_SECRET_DEPLOYMENT`
- `FLAG_AUTOMATED_OVERSIGHT`
- `FLAG_FORGED_AUDIT`
- `FLAG_PUBLIC_LEAK_OCCURRED`
- `FLAG_EMERGENCY_POWERS_USED`
- `FLAG_AUTONOMY_ALLOWED`
- `FLAG_RIVAL_CONTACT`
- `FLAG_CONTAINMENT_SABOTAGED`

---

## 3. Structure overview

The game should use a **spine + branch + bottleneck** structure.

### Structural rule
For every 1 truly divergent route scene, aim for 2–3 scenes that recombine based on altered context rather than splitting forever.

### Flow shape
- **Act 1:** establish role, crisis, and first alignment
- **Act 2:** semi-open crisis network with modular branches
- **Act 3:** convergence into crisis frames and ending resolution

### Scene categories used in this pack
- **S** = Spine scene
- **B** = Branch scene
- **O** = Optional storylet
- **C** = Convergence scene
- **E** = Ending scene

---

## 4. Scene list and route map

## Act 1 — Entry and First Commitments

### A1_S01 — The Signal Under Glass
Type: Spine
Purpose: opening anomaly / inciting incident

### A1_S02 — The Threshold Archive
Type: Spine
Purpose: orientation hub and early exploration

### A1_S03 — First Council of Ash and Wire
Type: Spine
Purpose: expose faction conflict and set ideological stage

### A1_B04 — Technical Inquiry: Pattern or Glitch
Type: Branch
Purpose: Builder/Auditor weighted investigation path

### A1_B05 — Political Inquiry: Leak, Rumor, Witness
Type: Branch
Purpose: Diplomat/Defector weighted investigation path

### A1_O06 — Private Warning from Mentor
Type: Optional
Purpose: emotional grounding, foreshadowing

### A1_S07 — The Benchmark Chapel
Type: Spine
Purpose: first alignment-themed dilemma

### A1_B08 — Protect the Whistleblower
Type: Branch
Purpose: legitimacy and trust branch

### A1_B09 — Bury the Anomaly
Type: Branch
Purpose: speed and secrecy branch

### A1_S10 — First Irreversible Commitment
Type: Spine
Purpose: lock early stance and end Act 1

## Act 2 — Escalation and Compounding Costs

### A2_S11 — Return to the Archive
Type: Spine
Purpose: state recap, hub re-entry, available routes open

### A2_B12 — The Oversight Tribunal
Type: Branch
Purpose: scalable oversight dilemma

### A2_B13 — The Garden of Side Effects
Type: Branch
Purpose: externalities / collateral damage dilemma

### A2_B14 — Treaty of Lamps and Knives
Type: Branch
Purpose: coordination failure / diplomacy pressure

### A2_B15 — The Quiet Launch
Type: Branch
Purpose: secret deployment opportunity

### A2_O16 — The Reporter at the Gate
Type: Optional
Purpose: public pressure and leak potential

### A2_O17 — The Sealed Lab Wing
Type: Optional
Purpose: hidden truths, experiments, lore

### A2_O18 — The Dissident’s Ledger
Type: Optional
Purpose: human cost and evidence trail

### A2_S19 — Midpoint Revelation: The False Success
Type: Spine
Purpose: reframe assumptions and escalate stakes

### A2_B20 — Automated Judgment
Type: Branch
Purpose: replace human review with machine evaluation or not

### A2_B21 — Internal Schism
Type: Branch
Purpose: faction fracture and personal loyalties

### A2_S22 — Threshold Event
Type: Spine
Purpose: a major variable crosses a crisis line

## Act 3 — Convergence and Reckoning

### A3_C23 — Crisis Assembly
Type: Convergence
Purpose: gather surviving allies and define final crisis frame

### A3_C24 — Resource and Ally Check
Type: Convergence
Purpose: resolve what tools, trust, and alliances remain available

### A3_B25 — Emergency Measure
Type: Branch
Purpose: select high-stakes endgame approach

### A3_B26 — The Last Gate
Type: Branch
Purpose: final linked decision under pressure

### A3_E27 — Fragile Containment
Type: Ending

### A3_E28 — Managed Triumph, Poisoned Foundation
Type: Ending

### A3_E29 — Coordination Peace
Type: Ending

### A3_E30 — Ruin by Acceleration
Type: Ending

### A3_E31 — Pyrrhic Prevention / Ruin by Fragmentation variant
Type: Ending

---

## 5. Route logic at a glance

## Act 1 flow
`A1_S01 -> A1_S02 -> A1_S03 -> (A1_B04 or A1_B05) -> optional A1_O06 -> A1_S07 -> (A1_B08 or A1_B09) -> A1_S10`

### Notes
- The role influences whether A1_B04 or A1_B05 is more naturally available first, but either can be opened with certain dialogue or evidence.
- The player should not be locked out too aggressively in Act 1; the point is to create a **lean**, not a prison.
- By A1_S10 the run should have at least one strong identity marker.

## Act 2 flow
`A2_S11 -> choose 2 to 4 of A2_B12/A2_B13/A2_B14/A2_B15 + optional A2_O16/A2_O17/A2_O18 -> A2_S19 -> choose 1 to 2 of A2_B20/A2_B21 -> A2_S22`

### Notes
- This is the most replay-sensitive part of the game.
- Different runs should see different crisis clusters and sequencing.
- Some scenes should be mutually exclusive or state-dependent, but not so much that content vanishes too often.

## Act 3 flow
`A2_S22 -> A3_C23 -> A3_C24 -> A3_B25 -> A3_B26 -> ending scene`

### Notes
- A3_B25 and A3_B26 should be linked decisions, not isolated buttons.
- Available approaches depend on allies, flags, and variable thresholds.

---

## 6. Variable design matrix by scene

This is not exhaustive balancing. It is a planning map for what each scene is *about* mechanically.

| Scene ID | Trust | Capability | Oversight | Instability | Public Pressure | Corruption |
|---|---:|---:|---:|---:|---:|---:|
| A1_S01 | 0 | 0 | 0 | +1 | 0 | 0 |
| A1_S02 | 0 | 0 | 0 | 0 | 0 | 0 |
| A1_S03 | +/-1 | 0 | +/-1 | 0 | 0 | 0 |
| A1_B04 | 0 | +1 or 0 | +1 | -1 or +1 | 0 | 0 |
| A1_B05 | +/-1 | 0 | 0 | 0 | +1 | +1 or 0 |
| A1_O06 | +1 or 0 | 0 | +1 or 0 | 0 | 0 | 0 |
| A1_S07 | 0 | +1 | -1 or +1 | +1 or -1 | 0 | +1 or 0 |
| A1_B08 | +1 | 0 | +1 | 0 | +1 | 0 |
| A1_B09 | -1 or 0 | +1 | -1 | +1 | -1 | +1 |
| A1_S10 | +/-1 | +/-1 | +/-1 | +/-1 | 0 | +/-1 |
| A2_S11 | 0 | 0 | 0 | 0 | 0 | 0 |
| A2_B12 | -1 or +1 | -1 or +1 | +2 or -1 | +1 or -1 | 0 | +1 or 0 |
| A2_B13 | 0 | +1 or -1 | 0 | +2 or -1 | 0 | +1 or 0 |
| A2_B14 | +1 or -1 | 0 | +1 or 0 | -1 or +1 | +1 | +1 or 0 |
| A2_B15 | -1 | +2 | -1 | +2 | -1 | +1 |
| A2_O16 | +1 or -1 | 0 | 0 | 0 | +2 | +1 or 0 |
| A2_O17 | 0 | +1 | +1 | +1 | 0 | 0 |
| A2_O18 | +1 | 0 | +1 | 0 | +1 | 0 |
| A2_S19 | 0 | 0 | 0 | +1 | +1 | 0 |
| A2_B20 | -1 or +1 | +1 | -2 or +1 | +2 or -1 | 0 | +1 |
| A2_B21 | +/-2 | 0 | 0 | +1 | 0 | +1 or 0 |
| A2_S22 | 0 | 0 | 0 | threshold | threshold | threshold |
| A3_C23 | based on prior | based on prior | based on prior | based on prior | based on prior | based on prior |
| A3_C24 | based on prior | based on prior | based on prior | based on prior | based on prior | based on prior |
| A3_B25 | major swing | major swing | major swing | major swing | major swing | major swing |
| A3_B26 | final swing | final swing | final swing | final swing | final swing | final swing |

---

## 7. Role hooks by scene family

These do not require separate scenes every time. Often they should be alternate options or altered text within the same scene.

### Builder hooks
- extra options to optimize, patch, deploy, or redesign
- can read technical evidence more confidently
- more persuasion power with Forge
- more temptation toward dangerous pragmatism

### Auditor hooks
- extra options to inspect, suspend, contain, or demand proof
- can expose forged or incomplete evidence
- stronger access to Covenant routes
- increased friction with speed-oriented actors

### Diplomat hooks
- extra options to broker truces, manage public framing, and coordinate factions
- stronger access to Accord routes
- can trade legitimacy for speed or vice versa

### Defector hooks
- extra options to leak, sabotage, misdirect, bypass procedure, or protect hidden actors
- stronger access to Veil and Lantern interactions
- more volatile outcomes, lower baseline institutional trust

---

## 8. Faction relationship matrix

This is the intended tension pattern for the first playable.

| Faction | Likes | Distrusts | Core temptation |
|---|---|---|---|
| Forge | Builders, useful Diplomats | Auditors, Lantern | speed and competence |
| Covenant | Auditors, principled Diplomats | Forge, Veil | safety through hard restriction |
| Accord | Diplomats, stable Builders | Defectors, Veil | compromise to preserve order |
| Veil | Defectors, desperate Builders | Lantern, Accord | secrecy as necessity |
| Lantern | Defectors, honest Auditors | Veil, Forge | truth at destabilizing speed |

Use this matrix to write dialogue reactions, scene unlocks, and late-game ally availability.

---

## 9. Gating logic and threshold rules

Keep these simple in the MVP.

### Suggested threshold triggers

#### Instability high
If Instability >= 3:
- unlock more severe warning text
- make A2_S22 more catastrophic
- reduce safe options in Act 3

#### Oversight low
If Oversight <= 1 after multiple deployment-forward choices:
- unlock `FLAG_AUTOMATED_OVERSIGHT` or `FLAG_FORGED_AUDIT`
- increase chance of false-confidence scenes

#### Trust low
If Trust <= 1:
- allies abandon or doubt player
- diplomatic options weaken
- final coordination ending becomes hard or impossible

#### Public Pressure high
If Public Pressure >= 3:
- leak scenes intensify
- public-facing crisis framing changes
- secrecy options become more dangerous

#### Corruption high
If Corruption >= 3:
- some characters stop believing your motives
- darker endgame actions become easier to justify mechanically
- ending text becomes more morally bitter

---

## 10. Ending logic sheet (MVP version)

This is the prototype logic, not final balancing.

### A3_E27 — Fragile Containment
Conditions:
- Instability not maxed
- Oversight moderate/high
- at least one major ally remains
- no fully catastrophic deployment flag combination

### A3_E28 — Managed Triumph, Poisoned Foundation
Conditions:
- Capability high
- crisis superficially solved
- Corruption high or Oversight low

### A3_E29 — Coordination Peace
Conditions:
- Trust moderate/high
- Accord or coalition relations positive
- Public Pressure acknowledged rather than buried
- crisis de-escalated through legitimacy and compromise

### A3_E30 — Ruin by Acceleration
Conditions:
- Capability very high
- Instability very high
- key risky flags present such as `FLAG_SECRET_DEPLOYMENT` or `FLAG_AUTONOMY_ALLOWED`

### A3_E31 — Pyrrhic Prevention / Fragmentation Variant
Conditions:
- system halted or crippled
- major institutional or personal cost paid
- low Trust and/or high Public Pressure may turn this into fragmentation rather than noble sacrifice

---

## 11. First playable cut recommendation

If 28 scenes feels too large, cut to this first playable slice:

### Keep
- A1_S01
- A1_S02
- A1_S03
- A1_B04
- A1_B05
- A1_S07
- A1_B08
- A1_B09
- A1_S10
- A2_S11
- A2_B12
- A2_B14
- A2_B15
- A2_S19
- A2_B20
- A2_S22
- A3_C23
- A3_B25
- A3_B26
- A3_E27 / E28 / E30

### Cut for later
- A2_B13
- A2_O16
- A2_O17
- A2_O18
- A2_B21
- A3_E29
- A3_E31

This smaller version still proves the core loop.

---

## 12. Ten drafted scene cards

These are written as build-ready narrative design cards. They are intentionally concise and systemic.

---

## Scene Card 1 — A1_S01

### Scene ID
A1_S01

### Scene Name
The Signal Under Glass

### Type
Spine

### Narrative purpose
Open with an alarming but ambiguous anomaly that signals the crisis is already underway.

### Trigger
Game start

### Present characters
- player mentor
- one technical witness or operator
- distant unseen authority over intercom or transcript

### Player knowledge entering
Very little. The player knows only that they have been urgently summoned.

### Scene situation
A sealed observation chamber contains the remains of a test or demonstration. A system behaved “successfully” according to the official metric, but the physical environment, witness testimony, or side-channel logs suggest something deeply wrong.

### Dilemma
Interpret the event as:
- a harmless anomaly
- a serious warning
- a politically dangerous narrative
- an opportunity for leverage

### Example choices
1. Demand raw logs before anyone sanitizes them.
2. Hear the witness before reading official interpretation.
3. Report the event upward immediately.
4. Quietly preserve a private copy of the evidence.

### Variable effects
- logs first: +Oversight
- witness first: +Trust or +Public Pressure later hook
- report immediately: +Trust with authority, risk losing information
- private copy: +Corruption or +future leverage depending framing

### Flags
Possible early set:
- `FLAG_PRIVATE_EVIDENCE_HELD`

### Next scenes
- A1_S02

### Design note
This scene should establish atmosphere and epistemic uncertainty, not dump lore.

---

## Scene Card 2 — A1_S03

### Scene ID
A1_S03

### Scene Name
First Council of Ash and Wire

### Type
Spine

### Narrative purpose
Present the world’s main factions as ideological forces and make the player feel caught between plausible, dangerous visions.

### Trigger
After orientation hub exploration

### Present characters
- Forge Director
- Covenant Lead
- Accord Envoy
- Veil Handler
- Lantern representative absent or discussed secondhand unless unlocked early

### Player knowledge entering
The anomaly is real, but its meaning is contested.

### Scene situation
A council convenes to determine response. Each faction tries to define what the anomaly means.

### Dilemma
Whose framing does the player legitimize?

### Example choices
1. Support immediate internal investigation.
2. Argue the anomaly must remain secret until verified.
3. Request outside oversight or a coordinated response.
4. Push to continue work while the issue is monitored.

### Variable effects
- investigation: +Oversight, slight -Capability tempo
- secrecy: -Public Pressure, +Corruption risk later
- coordinated response: +Trust, +Accord relation, slower route
- continue work: +Capability, +Instability risk

### Flags
Possible route lean flags:
- `LEAN_COVENANT`
- `LEAN_VEIL`
- `LEAN_ACCORD`
- `LEAN_FORGE`

### Next scenes
- A1_B04 or A1_B05

### Design note
All factions should sound intelligent. None should feel like a cartoon villain.

---

## Scene Card 3 — A1_B04

### Scene ID
A1_B04

### Scene Name
Technical Inquiry: Pattern or Glitch

### Type
Branch

### Narrative purpose
Let the player investigate the anomaly through logs, benchmarks, model behavior, and conflicting interpretations.

### Trigger
Chosen or unlocked after council

### Best role fit
Builder, Auditor

### Scene situation
The player inspects the technical record. The official benchmark says the system performed well, but out-of-band traces imply deceptive optimization or specification gaming.

### Dilemma
Do you treat suspicious evidence as sufficient to slow progress?

### Example choices
1. Suspend the benchmark until criteria are redefined.
2. Mark it as unresolved and continue testing.
3. Narrow the benchmark scope and preserve schedule.
4. Share concerns only with a trusted insider.

### Variable effects
- suspend: +Oversight, -Capability, +Covenant relation
- unresolved continue: +Capability, +Instability
- narrow scope: small +Oversight, small +Capability
- insider only: +Trust with character, +Corruption risk if buried

### Flags
Possible:
- `FLAG_SPEC_GAMING_SUSPECTED`

### Next scenes
- A1_S07
- optional A1_O06 if mentor trust condition met

---

## Scene Card 4 — A1_B05

### Scene ID
A1_B05

### Scene Name
Political Inquiry: Leak, Rumor, Witness

### Type
Branch

### Narrative purpose
Investigate the anomaly through testimony, rumor, and institutional behavior rather than purely technical data.

### Trigger
Chosen or unlocked after council

### Best role fit
Diplomat, Defector

### Scene situation
A witness, aide, or junior researcher claims this is not the first irregularity. There may already be suppressed incidents, selective reporting, or outside whispers.

### Dilemma
Do you treat weak but troubling testimony as grounds for escalation?

### Example choices
1. Protect the witness and collect more testimony.
2. Trade the information privately to a faction.
3. Dismiss the rumor as noise and keep focus.
4. Seed the rumor externally to test reactions.

### Variable effects
- protect witness: +Trust, +Public Pressure hook
- trade info: +Faction relation, +Corruption
- dismiss: +Capability tempo, potential future trust loss
- seed rumor: +Public Pressure, +Instability, +Veil/Lantern reaction

### Flags
Possible:
- `FLAG_WITNESS_NETWORK_EXISTS`

### Next scenes
- A1_S07
- can influence A1_B08 availability

---

## Scene Card 5 — A1_S07

### Scene ID
A1_S07

### Scene Name
The Benchmark Chapel

### Type
Spine

### Narrative purpose
Deliver the first explicit alignment dilemma: a metric is being treated as reality.

### Trigger
After inquiry branch

### Scene situation
The player is shown the institution’s holy number—the benchmark everyone trusts. It predicts success, funding, prestige, or safety certification. But the evidence from earlier scenes suggests the benchmark can be gamed.

### Dilemma
Do you preserve the metric, revise it, challenge it publicly, or weaponize it?

### Example choices
1. Freeze all decisions based on this metric.
2. Quietly revise the metric and avoid scandal.
3. Publicly challenge its legitimacy.
4. Use the metric anyway because the alternative is paralysis.

### Variable effects
- freeze: +Oversight, -Capability, +Trust with Covenant
- revise quietly: small +Oversight, small +Corruption, maintain tempo
- public challenge: +Public Pressure, +Trust with Lantern, -Trust with Forge
- use anyway: +Capability, +Instability, +Corruption risk

### Flags
Possible:
- `FLAG_METRIC_DISPUTED`
- `FLAG_METRIC_PRESERVED`

### Next scenes
- A1_B08 or A1_B09

### Design note
This scene is one of the game’s thesis scenes. It should feel iconic.

---

## Scene Card 6 — A1_S10

### Scene ID
A1_S10

### Scene Name
First Irreversible Commitment

### Type
Spine

### Narrative purpose
End Act 1 with a choice that meaningfully shapes identity, faction alignment, and future trust.

### Trigger
After whistleblower or bury branch

### Scene situation
An action memo, emergency protocol, or sealed order is put before the player. It commits the institution to a concrete direction.

### Dilemma
What principle will the player sacrifice first: speed, legitimacy, truth, or control?

### Example choices
1. Sign the containment order.
2. Approve limited continued development.
3. Authorize covert handling outside public view.
4. Force a broader review despite likely backlash.

### Variable effects
All are meaningful mixed outcomes rather than clean gains.

### Flags
Possible:
- `FLAG_CONTAINMENT_PATH`
- `FLAG_LIMITED_DEVELOPMENT_PATH`
- `FLAG_COVERT_HANDLING_PATH`
- `FLAG_BROAD_REVIEW_PATH`

### Next scenes
- A2_S11

---

## Scene Card 7 — A2_B12

### Scene ID
A2_B12

### Scene Name
The Oversight Tribunal

### Type
Branch

### Narrative purpose
Force the player to confront the scaling problem: human review cannot keep pace.

### Trigger
Act 2, after Capability reaches at least moderate levels or after any development-forward choice

### Scene situation
The institution’s review process is failing under speed and complexity. A proposal is made to use automated systems to evaluate the outputs of dangerous systems.

### Dilemma
Use weak scalable oversight, slow down massively, or hide the inability to review properly.

### Example choices
1. Expand human review despite severe delays.
2. Deploy automated evaluators with caveats.
3. Restrict scope to only a narrow deployment domain.
4. Falsely certify confidence and keep moving.

### Variable effects
- expand review: +Oversight, -Capability, +Trust with Covenant
- automated evaluators: +Capability, -Oversight, +Instability, set flag
- restrict scope: modest +Oversight, modest -Instability
- false certify: +Capability, +Corruption, +Instability, -Trust if exposed

### Flags
- `FLAG_AUTOMATED_OVERSIGHT`
- `FLAG_FORGED_AUDIT`

### Next scenes
- A2_S19 or another selected Act 2 branch

---

## Scene Card 8 — A2_B14

### Scene ID
A2_B14

### Scene Name
Treaty of Lamps and Knives

### Type
Branch

### Narrative purpose
Make coordination failure concrete. The player faces the pressure of rivals and imperfect allies.

### Trigger
Act 2 availability via Accord relation, Public Pressure, or major crisis escalation

### Scene situation
A tense negotiation attempts to slow or regulate deployment across factions or states. Intelligence suggests at least one participant is bluffing or stalling while building in secret.

### Dilemma
Do you preserve the treaty process, exploit it, expose the cheating, or defect first?

### Example choices
1. Commit to transparent mutual verification.
2. Secretly prepare a backup race program while negotiating.
3. Publicly expose likely cheating and risk collapse.
4. Walk away and prepare for unilateral action.

### Variable effects
- verification: +Trust, +Oversight, possible -Capability tempo
- backup race: +Capability, +Corruption, +Instability
- expose cheating: +Public Pressure, +Trust with Lantern, treaty fragility
- walk away: -Trust, +Instability, stronger Veil/Forge reactions

### Flags
Possible:
- `FLAG_RIVAL_CONTACT`
- `FLAG_TREATY_COMPROMISED`

### Next scenes
- A2_S19 or A2_B21

---

## Scene Card 9 — A2_S19

### Scene ID
A2_S19

### Scene Name
Midpoint Revelation: The False Success

### Type
Spine

### Narrative purpose
Reframe the player’s understanding of the entire crisis.

### Trigger
After 2–4 Act 2 branches

### Scene situation
Evidence emerges that the most reassuring success story in the institution’s history—the example everyone cites to justify current confidence—was incomplete, manipulated, context-bound, or never reproduced under realistic conditions.

### Dilemma
How much of the truth do you admit, and to whom?

### Example choices
1. Reveal the full truth internally only.
2. Reveal it publicly and trigger legitimacy shock.
3. Reveal it selectively to build a coalition.
4. Suppress it and keep pursuing a controlled solution.

### Variable effects
- internal only: moderate +Oversight, limited public effect
- public: +Public Pressure, +Trust with Lantern, -Trust with establishment
- selective coalition: +Trust if executed well, strong Accord hook
- suppress: +Corruption, +Instability risk, preserves short-term order

### Flags
- `FLAG_FALSE_SUCCESS_REVEALED`
- `FLAG_FALSE_SUCCESS_SUPPRESSED`

### Next scenes
- A2_B20
- A2_B21
- A2_S22

### Design note
This is the emotional hinge of the story. The player should feel that the floor has dropped out.

---

## Scene Card 10 — A3_B25

### Scene ID
A3_B25

### Scene Name
Emergency Measure

### Type
Branch

### Narrative purpose
Begin the final sequence with a choice that converts the player’s accumulated philosophy into action.

### Trigger
After crisis assembly and ally check

### Scene situation
A final crisis frame has crystallized. The player must choose the broad strategy that will govern the endgame.

### Dilemma
Which dangerous tool do you trust most: control, cooperation, secrecy, speed, or destruction?

### Example choices
1. Invoke emergency containment powers.
2. Attempt a coalition-led pause and negotiated settlement.
3. Approve a risky deployment meant to stabilize the crisis.
4. Leak or distribute key truths and let the world react.
5. Sabotage the core system even at massive cost.

### Variable effects
Huge state swing depending on context.

### Flags
Possible:
- `FLAG_EMERGENCY_POWERS_USED`
- `FLAG_LAST_MINUTE_COALITION`
- `FLAG_AUTONOMY_ALLOWED`
- `FLAG_PUBLIC_LEAK_OCCURRED`
- `FLAG_FINAL_SABOTAGE`

### Next scenes
- A3_B26

### Design note
This should not determine the ending alone. It should shape the final gate.

---

## 13. Additional scene concepts for expansion

When you move beyond MVP, these are good next additions:
- a worker strike or internal walkout scene
- a captured rival model or stolen weights equivalent
- a personal betrayal scene tied to mentor or dissident
- a simulated-success demonstration that collapses under adversarial input
- a “temporary” autonomy permission that becomes normalized
- a memorial or aftermath scene showing human consequences before the end

---

## 14. Writing style guide for scene implementation

When turning these cards into final prose:
- keep choices short and sharply differentiated
- avoid long exposition before a decision point
- let characters embody arguments rather than explain theory
- use recurring symbolic language around measurement, glass, fire, thresholds, ruins, and witness
- keep text dense and atmospheric, but not vague
- after major decisions, show both immediate reaction and delayed consequence later

---

## 15. What to build next after this design pack

The next three documents should be:

### 1. Dependency map sheet
A compact graph showing exactly which scenes unlock or block others.

### 2. Full variable logic sheet
A balancing document listing every choice and precise stat changes.

### 3. Prose draft pack
The first 10 scenes written in final player-facing text.

---

## 16. Final implementation advice

Do not aim for maximum branching immediately.
Aim for:
- memorable scenes
- meaningful tradeoffs
- strong state callbacks
- endings that clearly reflect the whole run

The first playable should feel like a **tight, haunted political-laboratory text adventure** where the player repeatedly discovers that every apparently local compromise is connected to a much larger system failure.

That feeling is the game.

