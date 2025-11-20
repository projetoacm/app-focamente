import { supabase } from './supabase';

// Verificar se usuário está autenticado
export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Buscar perfil do usuário
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

// Buscar estatísticas do usuário
export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

// Buscar tarefas do usuário
export async function getUserTasks(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Buscar badges do usuário
export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Buscar sessões de foco do usuário (últimos 7 dias)
export async function getWeeklyFocusSessions(userId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { data, error } = await supabase
    .from('focus_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('date', sevenDaysAgo.toISOString().split('T')[0])
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data;
}

// Criar nova tarefa
export async function createTask(userId: string, task: {
  title: string;
  category: string;
  priority?: 'low' | 'medium' | 'high';
  due_date?: string;
  focus_time?: number;
}) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ user_id: userId, ...task }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Atualizar tarefa
export async function updateTask(taskId: string, updates: {
  title?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  due_date?: string;
  focus_time?: number;
}) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Criar sessão de foco
export async function createFocusSession(userId: string, session: {
  duration: number;
  task_id?: string;
  completed?: boolean;
}) {
  const { data, error } = await supabase
    .from('focus_sessions')
    .insert([{ user_id: userId, ...session }])
    .select()
    .single();
  
  if (error) throw error;
  
  // Atualizar estatísticas do usuário
  await updateUserStats(userId);
  
  return data;
}

// Atualizar estatísticas do usuário
export async function updateUserStats(userId: string) {
  // Buscar total de tempo de foco
  const { data: sessions } = await supabase
    .from('focus_sessions')
    .select('duration')
    .eq('user_id', userId)
    .eq('completed', true);
  
  const totalFocusTime = sessions?.reduce((sum, s) => sum + s.duration, 0) || 0;
  
  // Buscar total de tarefas completadas
  const { count: tasksCompleted } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('completed', true);
  
  // Calcular streak atual
  const { data: recentSessions } = await supabase
    .from('focus_sessions')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(30);
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  if (recentSessions && recentSessions.length > 0) {
    const uniqueDates = [...new Set(recentSessions.map(s => s.date))].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (uniqueDates[i] === expectedDateStr) {
        currentStreak++;
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        break;
      }
    }
  }
  
  // Atualizar no banco
  const { error } = await supabase
    .from('user_stats')
    .update({
      total_focus_time: totalFocusTime,
      tasks_completed: tasksCompleted || 0,
      current_streak: currentStreak,
      longest_streak: Math.max(longestStreak, currentStreak),
      last_activity_date: new Date().toISOString().split('T')[0],
    })
    .eq('user_id', userId);
  
  if (error) throw error;
}

// Marcar badge como conquistado
export async function earnBadge(badgeId: string) {
  const { data, error } = await supabase
    .from('badges')
    .update({
      earned: true,
      earned_at: new Date().toISOString(),
    })
    .eq('id', badgeId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
