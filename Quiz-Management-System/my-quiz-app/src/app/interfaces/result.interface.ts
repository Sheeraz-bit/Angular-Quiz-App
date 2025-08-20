export interface Result {
  id: number;
  userId: number;
  score: number;
  submittedAt: string; // Use string for simplicity, or Date if parsing
}
