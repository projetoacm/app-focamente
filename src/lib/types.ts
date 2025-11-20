// FocoMente - Types

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  focusTime?: number; // em minutos
}

export interface FocusSession {
  id: string;
  duration: number; // em minutos
  date: string;
  taskId?: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface UserStats {
  totalFocusTime: number; // em minutos
  tasksCompleted: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
}

export interface LearningProfile {
  id: string;
  name: string;
  description: string;
  color: string;
  active: boolean;
}

export type NavigationTab = 'dashboard' | 'tasks' | 'focus' | 'progress' | 'profiles' | 'community';
