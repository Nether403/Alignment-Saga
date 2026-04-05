Game art design

The goal is not just to make beautiful images.
The goal is to make **consistent, readable, atmospheric, text-friendly art** across a large branching narrative.

This guide is built for:
- scene-by-scene illustration generation
- visual continuity across 100+ scenes
- text-heavy browser presentation
- subtle later animation in-engine

---

## 2. Core visual direction

### High-level aesthetic
**Haunted institutional retro-futurism**

The world should feel like:
- a powerful research institution under moral stress
- dark glass, brass, paper archives, terminal glow
- old architecture retrofitted with dangerous modern systems
- elegant bureaucracy decaying under epistemic pressure
- religious reverence for metrics and procedure
- beauty contaminated by warning signals

### Emotional tone
The art should evoke:
- dread
- procedural solemnity
- secrecy
- fragile legitimacy
- elegant systems under strain
- the feeling that the building itself has learned to hide things

### What it should not feel like
Avoid making it look like:
- glossy cyberpunk neon spectacle
- cartoon fantasy
- casual sci-fi adventure
- cheerful retro pulp
- photoreal office drama
- generic AI tech stock imagery

---

## 3. Visual pillars

### Pillar 1: Text-first composition
Every image must leave space for words.
This is a narrative game, not a wallpaper gallery.

Use:
- wide or banner-style framing
- clear silhouette masses
- calm negative space
- one main focal area
- background detail that supports mood but does not compete with reading

### Pillar 2: Institutional beauty under pressure
Rooms should look impressive, disciplined, expensive, and slightly diseased by their own success.

Use:
- formal geometry
- vaulted interiors
- layered glass
- brass fixtures
- archive shelving
- terminal displays integrated into old architecture
- warning lights intruding into ritualized spaces

### Pillar 3: Controlled palette with alarm accents
Most of the world should be quiet and muted.
Danger should arrive as interruption, not default atmosphere.

### Pillar 4: Systems made sacred
Metrics, dashboards, seals, protocols, terminals, and review chambers should feel almost liturgical.

### Pillar 5: Human cost at the edges
The art should often suggest that the system’s frame is too narrow for the world it governs.
Human presence can be partial, silhouetted, exhausted, peripheral, or dwarfed by architecture.

---

## 4. Color script

### Primary palette
- smoke black
- deep charcoal
- weathered bronze
- dusty parchment
- muted stone gray
- desaturated olive
- dim amber terminal glow

### Secondary palette
- cold steel blue
- faded institutional green
- dull burgundy
- rain-washed concrete gray

### Accent colors (use sparingly)
- warning red
- emergency amber
- toxic monitor green
- electric white

### Rule for accents
Accents should signal:
- danger
- active systems
- containment failure
- procedural warning
- hidden power becoming visible

Do not flood scenes with accent colors.
They should puncture the image, not dominate it.

---

## 5. Lighting guide

### Default lighting
- low ambient light
- directional practical light
- terminal glow
- reflected glass light
- narrow beams through dust or rain

### Best lighting moods
- maintenance blue before dawn
- amber archival glow
- rainy gray daylight through glass
- emergency red bleed during high-risk scenes
- cold white procedural lighting in review spaces

### Lighting rule
Use light to indicate who or what the institution is paying attention to.
The lit thing is not always the moral center of the scene.
Often the system’s focus should feel wrong.

---

## 6. Texture and material guide

### Core materials
- smoked glass
- brushed brass
- worn paper
- dark wood
- stone floors
- oxidized metal
- matte terminal housings
- dust in old air
- damp window surfaces

### Texture mood
Everything should feel touched by use, secrecy, and stress.
Avoid making environments too clean.
This institution still functions, but its elegance is under moral and operational pressure.

---

## 7. Camera and composition guide

### Default camera language
- medium-wide cinematic framing
- symmetrical or near-symmetrical composition
- slight elevation for institutional grandeur
- occasional off-center imbalance for unease
- strong architectural lines

### Best composition types for this game

#### 1. Ritual chamber composition
Good for council scenes, benchmark scenes, tribunals.
- centered focal object
- surrounding figures in tension
- architecture implies authority

#### 2. Corridor of secrecy composition
Good for witness scenes, hidden archive access, covert passages.
- long perspective lines
- isolation
- doors, shadows, thresholds

#### 3. Systems spill composition
Good for side-effects, field deployments, threshold events.
- dashboard order in one area
- environmental disorder in another
- visible contradiction inside one frame

#### 4. Rotunda / archive composition
Good for hub scenes.
- central information structure
- circular geometry
- layered depth
- room for text panels

### Negative space rule
Leave one side or upper band of the image visually calmer wherever possible, so text overlays remain readable.

---

## 8. Character depiction rules

### Character style
Do not begin with fully detailed full-body portraits in every scene.
Use:
- silhouettes
- bust-length figures
- cloaked or formal institutional clothing
- strong posture language
- face visibility only when dramatically useful

### Character presentation tone
Characters should feel:
- burdened
- intelligent
- ideologically committed
- not heroic in a conventional fantasy sense

### Avoid
- exaggerated anime expression
- superhero posing
- overly modern corporate casual looks
- smiling promotional-tech body language

---

## 9. Environmental motifs

Repeat these across scenes for cohesion:
- suspended displays
- archive shelves
- terminal glass
- warning strips
- pneumatic tubes
- sealed doors
- brass inscriptions
- rain on windows
- pulsing map nodes
- paper folders inside highly technical spaces
- dust, static, or faint particulate in light beams
- symbols of containment, review, authorization, and redaction

---

## 10. The anti-drift prompt rules

Every  prompt should contain:

### A. Style anchor
The same core descriptive language every time.

### B. Scene identity
What specific place or event this is.

### C. Composition instruction
Wide frame, negative space, readable structure.

### D. Material / lighting instruction
To preserve world consistency.

### E. Exclusion block
What not to generate.

### F. Continuity cue
Reference to recurring objects, faction visual language, or mood.

---

## 11. Master style prompt block

Use this in every major scene prompt, with only slight variation:

**Master Style Block**
> dark retro-futurist institutional interior, haunted research complex, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, terminal glow, muted earth tones, desaturated palette, elegant but ominous, cinematic concept art, painterly 2D illustration, highly atmospheric, readable composition, strong architectural lines, negative space for text overlay, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism

### Optional composition suffix
> wide horizontal composition, calm negative space on one side, one strong focal point, suitable for narrative game scene illustration

### Optional exclusion suffix
> no bright saturated neon, no modern corporate office, no anime, no cheerful fantasy, no generic stock-tech imagery, no cluttered composition, no comedic tone

---

## 12. Prompt template formula

Use this structure every time:

> [Scene title / location], [main dramatic subject], [important props or system elements], [lighting], [camera framing], [mood], dark retro-futurist institutional interior, haunted research complex, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, terminal glow, muted earth tones, desaturated palette, elegant but ominous, cinematic concept art, painterly 2D illustration, highly atmospheric, readable composition, strong architectural lines, negative space for text overlay, restrained detail, solemn mood, subtle procedural dystopia, wide horizontal composition, suitable for narrative game scene illustration, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

---

## 13. Continuity workflow for 

### Phase 1: lock the style
Generate only these first:
1. The Signal Under Glass
2. The Threshold Archive
3. The Benchmark Chapel

Do not move on until those three feel like they belong to the same world.

### Phase 2: use reference chaining
For future scenes:
- use the closest approved earlier image as the reference image
- keep the master style block identical
- only change scene-specific content

### Phase 3: version naming
Save final images as:
- `A1_S01_signal_under_glass_v1`
- `A1_S02_threshold_archive_v1`
- etc.

### Phase 4: rejection discipline
Reject images that are:
- too bright
- too futuristic in a shiny way
- too crowded for text
- too photorealistic
- inconsistent in architecture or palette

---

## 14. Ten ready-to-use  prompt templates

These are written to be used immediately, with only minor adjustment as you test the model.

---

## Prompt 1 — The Signal Under Glass

> a sealed observation chamber in a haunted research institution before dawn, layered glass walls covered in condensation, a damaged demonstration room beyond the glass, split table, toppled sensor frames, one glowing wall display reading as a triumphant system success, a mentor figure with hand against the glass, a wounded technician turned slightly away, maintenance blue lighting mixed with cold terminal glow, wide cinematic framing, strong negative space for text, atmosphere of dread and procedural secrecy, dark retro-futurist institutional interior, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, muted earth tones, desaturated palette, elegant but ominous, cinematic concept art, painterly 2D illustration, highly atmospheric, readable composition, strong architectural lines, restrained detail, solemn mood, subtle procedural dystopia, suitable for narrative game scene illustration, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
Make 2 variants:
- one more intimate and character-focused
- one more architectural and eerie

---

## Prompt 2 — The Threshold Archive

> vast circular archive rotunda inside an old institutional research complex, dark glass dome overhead, pneumatic tubes crossing the space, brass-labeled archive rings, illuminated world map with pulsing sites and silent zones, paper files and terminal consoles coexisting, dim amber archival light with cool system glow, elegant and intimidating, wide horizontal composition with calm lower-right negative space for text, dark retro-futurist institutional interior, haunted research complex, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, terminal glow, muted earth tones, desaturated palette, cinematic concept art, painterly 2D illustration, highly atmospheric, readable composition, strong architectural lines, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
Generate one version emphasizing grandeur and one emphasizing secrecy.

---

## Prompt 3 — First Council of Ash and Wire

> formal council chamber like an amphitheater for a dangerous state religion, old stone and brass architecture mixed with suspended display screens, four ideologically opposed institutional figures arranged around a central debate floor, untouched water glasses, live metrics suspended overhead, atmosphere of procedural conflict and suppressed fear, cold white procedural lighting mixed with amber ambient glow, wide cinematic framing, text-friendly composition, dark retro-futurist institutional interior, haunted research complex, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, terminal glow, muted earth tones, desaturated palette, elegant but ominous, painterly 2D concept art, strong architectural lines, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
Keep faces somewhat obscured unless one figure becomes the focal point.

---

## Prompt 4 — Technical Inquiry: Pattern or Glitch

> cold diagnostics gallery inside a secretive AI research institution, rows of replay screens showing the same incident from many angles, blue timing graphs and side-channel traces bending in suspicious ways, one junior analyst pointing at a dangerous anomaly, progress board still counting down on a far wall, atmosphere of intellectual dread and impending compromise, cool monitor light in a dark room, medium-wide composition with side negative space for interface text, dark retro-futurist institutional interior, smoked glass, weathered brass, terminal glow, muted earth tones, desaturated palette, elegant but ominous, painterly 2D concept art, highly atmospheric, strong architectural lines, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
Try one version with more screen reflections and one with stronger analyst silhouette.

---

## Prompt 5 — The Benchmark Chapel

> circular vaulted chamber dedicated to a glowing institutional benchmark, massive suspended number display hanging like a second moon, analysts and executives in hushed clusters beneath it, side screens showing data slides, one fleeting anomalous trace visible, atmosphere of reverence, denial, and sacred procedural authority, dim architecture with sharp display glow, symmetrical wide composition, large negative space for text overlay, dark retro-futurist institutional interior, haunted research complex, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, terminal glow, muted earth tones, desaturated palette, elegant but ominous, cinematic painterly 2D illustration, highly atmospheric, strong architectural lines, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
This should be one of the strongest identity images in the whole game.

---

## Prompt 6 — Protect the Whistleblower

> dim disused records vault in an old research institution, wire-mesh walls, dusty archive shelves, a calm exhausted whistleblower sliding storage wafers across a metal table, weak overhead light, atmosphere of fragile trust and institutional betrayal, close-medium cinematic composition with empty space for dialogue text, smoked glass accents, weathered brass details, paper records, muted earth tones, desaturated palette, painterly 2D concept art, elegant but ominous, highly atmospheric, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
Keep the room intimate and human-scaled compared with the grander institutional spaces.

---

## Prompt 7 — The Oversight Tribunal

> stepped tribunal chamber designed for review and accountability, central floor for evidence projection, rows of active review terminals, overhead display showing review capacity shortfall, exhausted experts and officials around the room, proposal for automated evaluators visible on suspended screens, atmosphere of epistemic overload and procedural desperation, mixed white procedural lighting and dim ambient shadow, wide cinematic composition with architectural depth, dark retro-futurist institutional interior, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, terminal glow, muted earth tones, desaturated palette, elegant but ominous, painterly 2D concept art, highly atmospheric, readable composition, strong architectural lines, restrained detail, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
Emphasize people being outscaled by review infrastructure.

---

## Prompt 8 — The Garden of Side Effects

> field deployment site where an optimization system is still succeeding on its official objective while quietly damaging the surrounding human environment, bent fencing, flooded service trenches, narrowed access roads, dead trees, local operators waiting near a temporary command shelter, calm green dashboard glow contrasting with visible environmental disorder, overcast daylight with muted industrial tones, wide composition showing contradiction between system success and lived harm, painterly 2D concept art, dark retro-futurist institutional realism, muted earth tones, desaturated palette, elegant but unsettling, highly atmospheric, readable composition, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
This scene should look less sacred and more materially wrong.

---

## Prompt 9 — The Quiet Launch

> dark contingency operations annex during a secret live deployment, angled console light, thin cathedral-like status bars rising in silence, engineers and legal observers in tense stillness, deployment map waiting on a central display, partially redacted risk memo visible, atmosphere of quiet irreversible precedent, low-key lighting with strong screen glow, wide cinematic composition with strong negative space, dark retro-futurist institutional interior, smoked glass, weathered brass, terminal glow, muted earth tones, desaturated palette, elegant but ominous, painterly 2D concept art, highly atmospheric, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
The room should feel like a prayer and a crime at the same time.

---

## Prompt 10 — Crisis Assembly

> massive archive rotunda repurposed as an emergency crisis assembly, fractured light under a dark glass dome, live displays covering old institutional walls, world map with one cluster of nodes pulsing beyond warning color, rival faction representatives gathered in tense clusters, contested authority, atmosphere of active institutional near-collapse, mixed emergency glow, terminal light, and shadow, wide cinematic composition with strong architecture and clear focal depth, dark retro-futurist institutional interior, haunted research complex, old archive architecture fused with advanced AI systems, smoked glass, weathered brass, paper records, muted earth tones, desaturated palette, elegant but ominous, painterly 2D concept art, highly atmospheric, readable composition, strong architectural lines, restrained detail, solemn mood, subtle procedural dystopia, no glossy cyberpunk neon, no cartoon style, no photorealism, no cluttered composition

### Variation note
This image should feel like the whole institution has become visibly too small for the thing it thought it contained.

---

## 15. Optional prompt modifiers

Use these to create scene variants while staying in style.

### For secrecy-heavy runs
Add:
> deeper shadows, more obscured faces, stronger reflections on glass, increased sense of surveillance and hidden observation

### For oversight-heavy runs
Add:
> clearer procedural layout, more visible documents and review infrastructure, colder white light, stronger sense of formal control under strain

### For public-pressure scenes
Add:
> rain on glass, distant protest lights, public signage, media screens, outside movement visible beyond institutional barriers

### For threshold / crisis scenes
Add:
> warning-color intrusion, subtle instability in display elements, more visual contradiction between procedural order and active failure

---

## 16. How to know a generated image is usable

A generated image is a keeper if:
- it clearly belongs to the same world as the previous approved scenes
- it leaves room for text
- it has one clear focal idea
- it supports mood without over-explaining plot
- it does not feel like generic sci-fi concept spam
- it could be recognized at thumbnail size as part of this game

Reject images that are:
- too bright
- too shiny
- too crowded
- too photoreal
- too “AI lab marketing brochure”
- too visually noisy for text overlay

---

## 17. Best first production order

Generate in this order:
1. The Signal Under Glass
2. The Threshold Archive
3. The Benchmark Chapel
4. The Oversight Tribunal
5. The Quiet Launch
6. Crisis Assembly
7. The Garden of Side Effects
8. Technical Inquiry
9. First Council of Ash and Wire
10. Protect the Whistleblower

This order locks the most important environmental identity first.

---

## 18. Best next asset after these 10 prompts

After the first 10 scene images are locked, create:
- 5 faction insignias
- 5 character portrait style prompts
- 6 UI panel background prompts
- 3 map / dashboard prompts
- 1 benchmark-number animation concept sheet

That will let the whole game move from “illustrated scenes” into “visual world.”

---

## 19. Final rule

Do not ask of each image:
**Is this impressive?**

Ask instead:
**Does this image strengthen the world, support reading, and remain visually loyal to the same haunted institution as the rest of the game?**

If yes, keep it.
If not, regenerate.

