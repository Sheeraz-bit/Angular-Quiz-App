export interface Quiz {
  id: number;
  question: string;
  optA: string;
  optB: string;
  optC: string;
  optD: string;
  answer: string; // The correct answer (e.g., 'A', 'B', 'C', 'D')
}
