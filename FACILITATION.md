# Facilitation Guide — AI Basics

The learner experience is fully facilitatable: every teaching section has
(1) a **simulator or play moment**, (2) a **labeled, timed activity** — *As a
group* or *On your own* — and (3) a **validation point** that tells you whether
learning landed before you move on.

The full per-section runbook (timings, what to say, watch-fors, validation
criteria) lives in [`facilitator/notes.json`](facilitator/notes.json). A
planned **facilitator version** of the site will mirror the learner deck with
those notes rendered in a rail to the right of each slide — keep the JSON in
sync whenever slides change.

## Run of show (~50 min)

| # | Slide | Min | Interaction (practice / play) | Validation point |
|---|---|---|---|---|
| — | Welcome / QR | 3 | Scan-to-join | Room is in the experience |
| — | Objectives | 2 | — | Objectives acknowledged |
| — | Agenda | 1 | — | — |
| 01 | What AI is | 6 | **Rings simulator** + group sort | Inline check (rings) |
| 02 | How machines learn | 7 | **ML trainer game** (4 scenarios) + group dataset match | Trainer score 3/4+ |
| 03 | Neural networks | 5 | **Run-the-network** + vendor-question discussion | Inline check (weights) |
| 04 | Language models | 6 | **Token predictor** + solo trust/check note | Volunteers share; recap Q2 |
| 05 | Temperature | 4 | **Slider** + same-question-twice experiment | Inline check (low temp) |
| 06 | Prompting | 8 | **Anatomy highlighter** + real-email prompt practice | Peer screen-swap; recap Q5 |
| 07 | Strengths & limits | 6 | Group risk-ranking (uses Section 04 notes) | Inline check + task/check/owner stated |
| 08 | Responsible use | 6 | Group policy-sentence drafting | Every table produces a sentence |
| 09 | Wellbeing | 5 | Private self-check (never shared) | Recap wellbeing question only |
| — | Recap quiz | 4 | **Scored 6-question quiz** | 5/6 room-wide = pass signal |
| — | Glossary / Watch / Close | 5 | Flip cards; homework commitment | Verbal commitments |

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
