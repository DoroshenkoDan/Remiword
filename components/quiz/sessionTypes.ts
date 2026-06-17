/**
 * Unified result types for all quiz session modes.
 *
 * All modes store results as SessionResult so SessionWordQueue
 * and other shared components work with a single type.
 */

/** Stored result for any quiz mode word. */
export type SessionResult =
  | 'correct'   // flashcard Easy/Good, spelling exact match
  | 'good'      // flashcard Good (rating 2)
  | 'hard'      // flashcard Hard (rating 1)
  | 'missed'    // flashcard Didn't know, spelling wrong answer
  | 'almost'    // spelling close match (Levenshtein ≤ 2)
  | 'revealed'  // spelling — user revealed the answer
  | 'skipped'   // flashcard skip

/** Tailwind dot class per result, used in SessionWordQueue. */
export const SESSION_RESULT_DOT: Record<SessionResult, string> = {
  correct:  'bg-success',
  good:     'bg-nav-active',
  hard:     'bg-warning',
  missed:   'bg-error',
  almost:   'bg-warning',
  revealed: 'bg-error',
  skipped:  'bg-nav-inactive',
}

/** Flashcard numeric rating from the 4 rating buttons. */
export type Rating = 0 | 1 | 2 | 3

/** Convert flashcard rating to unified SessionResult. */
export const RATING_TO_RESULT: Record<Rating, SessionResult> = {
  0: 'missed',
  1: 'hard',
  2: 'good',
  3: 'correct',
}
