export const NAME = "PRIYODARSHINI";
export const NAME_LETTERS = NAME.split("");

// Birthday: August 18, 2026. Day 20 starts July 29, 2026.
export const BIRTHDAY = new Date(2026, 7, 18); // month is 0-indexed
export const START_DATE = new Date(2026, 6, 29);

export type DayStatus = number | "not-started" | "complete";

export function getCurrentDay(): DayStatus {
  // Check for ?day=X override
  const params = new URLSearchParams(window.location.search);
  const override = params.get("day");
  if (override !== null) {
    const num = parseInt(override, 10);
    if (!isNaN(num) && num >= 0 && num <= 20) return num;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(START_DATE);
  const birthday = new Date(BIRTHDAY);

  if (today < start) return "not-started";
  if (today > birthday) return "complete";

  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // Day 20 on Jul 29 (diffDays=0), Day 19 on Jul 30 (diffDays=1), etc.
  return 20 - diffDays;
}

export function getRevealedLetterCount(dayNumber: number): number {
  // Days 20-8: unlock letters 1-13
  // Days 7-0: all 13 revealed
  if (dayNumber >= 8) {
    return 20 - dayNumber + 1; // Day 20 → 1, Day 19 → 2, ..., Day 8 → 13
  }
  return 13; // all revealed
}

export function isCountdownPhase(dayNumber: number): boolean {
  return dayNumber <= 7 && dayNumber >= 0;
}

export function getCountdownText(dayNumber: number): string {
  if (dayNumber === 0) return "today is the day";
  if (dayNumber === 1) return "tomorrow…";
  return `${dayNumber} days until your birthday`;
}
