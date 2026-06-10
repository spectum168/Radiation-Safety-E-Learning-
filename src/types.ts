/**
 * Types & Enums for Radiation Safety E-Learning application
 */

export interface AnswerItem {
  questionIndex: number;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface ScoreRecord {
  id: string;
  name: string;
  department: string;
  score: number;
  totalQuestions: number;
  answers: AnswerItem[];
  completedAt: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DeptStats {
  department: string;
  count: number;
  averageScore: number;
  passRate: number;
  passed: number;
  failed: number;
}

export enum AppScreen {
  Register = "REGISTER",
  Learn = "LEARN",
  Quiz = "QUIZ",
  Result = "RESULT",
  Dashboard = "DASHBOARD"
}
