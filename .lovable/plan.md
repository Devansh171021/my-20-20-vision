

# Plan: Romantic Single-Day Experience with Name Reveal + Countdown

## Overview
Completely redesign the landing page and flow. Only today's day is accessible (no day list). The landing page shows "PRIYODARSHINI" with letters unlocking one per day. The last 7 days (Day 7 to Day 0) show big romantic countdown numbers alongside the fully revealed name. Birthday: August 18, so Day 20 starts July 29.

## Date Logic

| Day | Date | What happens |
|-----|------|-------------|
| 20 | Jul 29 | Letter "P" unlocks |
| 19 | Jul 30 | Letter "R" unlocks |
| ... | ... | One letter per day |
| 8 | Aug 10 | Letter "I" (last) unlocks — full name revealed |
| 7 | Aug 11 | Countdown "7" appears |
| 6 | Aug 12 | Countdown "6" |
| ... | ... | ... |
| 1 | Aug 17 | Countdown "1" — "tomorrow..." |
| 0 | Aug 18 | Birthday — grand finale |
| Before Jul 29 | — | "Coming soon" state |
| After Aug 18 | — | Complete state, full name glowing |

## File Changes

### 1. New: `src/utils/dateUtils.ts`
- Constants: `BIRTHDAY = 2026-08-18`, `START_DATE = 2026-07-29`
- `getCurrentDay()` — returns day number (20 to 0), or `"not-started"` / `"complete"`
- `getRevealedLetterCount(dayNumber)` — Days 20-8 map to 1-13 letters; Days 7-0 return 13 (all)
- Support `?day=X` URL param for testing

### 2. Redesign: `src/pages/Index.tsx`
Remove the day list entirely. New flow:

**Landing page (after intro typing):**
- "PRIYODARSHINI" displayed as 13 letter tiles in a centered row
  - Unlocked: gold glow, heartbeat animation on today's letter
  - Locked: dim, blurred
- Below the name: day indicator + today's title
- Days 7-0: Full name glowing + big countdown number (e.g., giant "5" with gold glow) + text like "5 days until your birthday"
- Single "Open today's moment" button leading to unlock screen then day view
- Before start date: show "coming soon" with dim locked letters

### 3. Update: `tailwind.config.ts`
- Add `heartbeat` keyframe (subtle scale pulse)
- Add `countdown-glow` keyframe for the big countdown numbers

### 4. Update: `src/index.css`
- Letter tile styles (`.letter-tile`, `.letter-tile-locked`, `.letter-tile-active`)
- Countdown number styling with gold glow

### 5. Update: `src/components/DayView.tsx`
- Change "back to days" text to just "back"

### 6. Update: `src/components/UnlockScreen.tsx`
- During Days 20-8: also show the newly unlocking letter with a reveal animation
- During Days 7-0: show the countdown number fading in before the day content

### 7. `src/components/DayCard.tsx`
- Keep file but no longer used in main flow (can clean up later)

## Visual Design for Countdown (Days 7-0)

```text
   P R I Y O D A R S H I N I
         (all glowing gold)

            ╔═══════╗
            ║       ║
            ║   5   ║  ← large serif number, gold glow
            ║       ║
            ╚═══════╝

      5 days until your birthday

        [ Open today's moment ]
```

## Technical Notes
- All date logic uses local timezone
- `?day=X` URL param overrides for testing any day
- Mobile-first: letter tiles sized for small screens, responsive scaling
- The name "PRIYODARSHINI" = 13 characters: P-R-I-Y-O-D-A-R-S-H-I-N-I

