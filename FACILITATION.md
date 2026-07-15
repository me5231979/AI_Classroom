# Facilitation Guide — AI Basics

Every activity carries a learner-visible **"Why this matters"** line — the reason
is on the slide, not just in these notes. The learner experience is fully
facilitatable: every teaching section has
(1) a **simulator or play moment**, (2) a **labeled, timed activity** — *As a
group* or *On your own* — and (3) a **validation point** that tells you whether
learning landed before you move on.

The full per-section runbook (timings, what to say, watch-fors, validation
criteria) lives in [`facilitator/notes.json`](facilitator/notes.json). A
planned **facilitator version** of the site will mirror the learner deck with
those notes rendered in a rail to the right of each slide — keep the JSON in
sync whenever slides change.

## Run of show — two paths

Component times are built bottom-up and include in-block transitions. Pick the
path that matches your slot; never promise 60 and run the full design.

| Slide | Full (91 min) | Core (60 min) |
|---|---|---|
| Welcome / QR | 3 | 2 |
| Objectives | 2 | 1 |
| Agenda | 1 | — |
| 01 What AI is | 7 | 4 |
| 02 How machines learn | 8 | 4 |
| 03 Neural networks | 6 | 4 |
| 04 Language models | 6 | 5 |
| 05 Temperature | 4 | 2 |
| 06 Prompting | 8 | 5 |
| Prompt Lab | 7 | 5 |
| 07 Strengths & limits | 6 | 4 |
| 08 Responsible use | 7 | 4 |
| Your toolkit | 6 | 5 |
| 09 Wellbeing | 5 | 3 |
| Recap quiz | 4 | 4 |
| My AI plan (capstone) | 7 | 6 |
| Glossary | 1 | — |
| Closing | 3 | 2 |
| **Total** | **91** | **60** |

**Core-path rules:** every simulator, every knowledge check, the Lab, and the
capstone stay. Run ONE group activity of your choice; the rest become
follow-ups. Skip the agenda, glossary, and in-class videos. Per-section cut
notes live in `facilitator/notes.json` (`coreNote`).

**Timing discipline:** the Lab and capstone stretch in talkative rooms. Protect
the last 15 minutes (recap, capstone, close) by cutting group debriefs first,
never the capstone.

## Validation model

- **In the moment:** inline quick checks (sections 01, 03, 05, 07, 08), the ML
  trainer score (02), and activity outputs (vendor questions, policy
  sentences, task/check/owner assignments).
- **End of session:** the 6-question scored recap maps 1:1 to the learning
  objectives, plus verbal transfer commitments at close.
- **Deliberately not validated:** the Section 09 wellbeing self-check is
  private by design — facilitators must not collect it.

## Facilitator-version spec (future build)

- Mirror of the learner site at `/facilitator/` (or a `?facilitator` mode).
- Each slide gains a right-hand rail rendered from `facilitator/notes.json`:
  minutes, purpose, facilitate steps, validate, watchFor.
- Rail is visible only in facilitator mode; learner deck stays untouched.
- Keep simulators identical — the facilitator drives the same interactions on
  the projector while learners follow on their devices.
