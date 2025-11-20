// FocoMente - Mock Data

import { Task, FocusSession, Badge, UserStats, LearningProfile } from './types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Estudar React Hooks',
    completed: false,
    priority: 'high',
    category: 'Desenvolvimento',
    dueDate: '2024-01-20',
    focusTime: 45
  },
  {
    id: '2',
    title: 'Revisar TypeScript',
    completed: true,
    priority: 'medium',
    category: 'Desenvolvimento',
    focusTime: 30
  },
  {
    id: '3',
    title: 'Praticar algoritmos',
    completed: false,
    priority: 'high',
    category: 'Estudo',
    dueDate: '2024-01-18',
    focusTime: 60
  },
  {
    id: '4',
    title: 'Ler documentação Next.js',
    completed: false,
    priority: 'low',
    category: 'Desenvolvimento',
    focusTime: 20
  }
];

export const mockFocusSessions: FocusSession[] = [
  { id: '1', duration: 45, date: '2024-01-15', taskId: '1', completed: true },
  { id: '2', duration: 30, date: '2024-01-15', taskId: '2', completed: true },
  { id: '3', duration: 60, date: '2024-01-14', completed: true },
  { id: '4', duration: 25, date: '2024-01-14', completed: false },
  { id: '5', duration: 50, date: '2024-01-13', completed: true },
  { id: '6', duration: 40, date: '2024-01-12', completed: true },
  { id: '7', duration: 35, date: '2024-01-11', completed: true },
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Primeira Sessão',
    description: 'Complete sua primeira sessão de foco',
    icon: 'Zap',
    earned: true,
    earnedAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'Streak de 7 dias',
    description: 'Mantenha foco por 7 dias consecutivos',
    icon: 'Flame',
    earned: true,
    earnedAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Mestre do Foco',
    description: 'Complete 100 horas de foco',
    icon: 'Trophy',
    earned: false
  },
  {
    id: '4',
    name: 'Madrugador',
    description: 'Complete sessão antes das 7h',
    icon: 'Sunrise',
    earned: false
  }
];

export const mockUserStats: UserStats = {
  totalFocusTime: 285, // minutos
  tasksCompleted: 12,
  currentStreak: 7,
  longestStreak: 14,
  badges: mockBadges
};

export const mockLearningProfiles: LearningProfile[] = [
  {
    id: '1',
    name: 'Desenvolvedor Full Stack',
    description: 'Foco em desenvolvimento web moderno',
    color: '#00FF00',
    active: true
  },
  {
    id: '2',
    name: 'Designer UI/UX',
    description: 'Design de interfaces e experiência',
    color: '#FF00FF',
    active: false
  },
  {
    id: '3',
    name: 'Data Science',
    description: 'Análise de dados e machine learning',
    color: '#00FFFF',
    active: false
  }
];

// Dados para gráficos
export const weeklyFocusData = [
  { day: 'Seg', minutes: 45 },
  { day: 'Ter', minutes: 60 },
  { day: 'Qua', minutes: 30 },
  { day: 'Qui', minutes: 75 },
  { day: 'Sex', minutes: 50 },
  { day: 'Sáb', minutes: 25 },
  { day: 'Dom', minutes: 0 }
];

export const categoryDistribution = [
  { name: 'Desenvolvimento', value: 45 },
  { name: 'Estudo', value: 30 },
  { name: 'Leitura', value: 15 },
  { name: 'Prática', value: 10 }
];
