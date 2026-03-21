export type ChallengeStatus = "not_started" | "in_progress" | "completed";

export type ChallengeMode = "guided" | "semi_guided" | "independent";

export interface UserProgress {
  challengeId: string;
  status: ChallengeStatus;
  mode: ChallengeMode;
  attempts: number;
  completedAt: string | null;
  userSolution: string | null;
  timeSpentSeconds: number;
  /** Which steps the user has completed so far */
  completedSteps: string[];
  /** The step the user was last on */
  lastStep: string | null;
  /** Saved user rephrasing for Step 1 */
  savedRephrasing: string | null;
  /** Saved block order for Step 2 */
  savedBlockOrder: string[] | null;
  /** Saved selected concepts for Step 3 */
  savedConcepts: string[] | null;
}

export interface TrackProgress {
  /** Map of challenge slug -> UserProgress */
  challenges: Record<string, UserProgress>;
}
