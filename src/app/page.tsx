'use client';

import { useState } from 'react';
import Navigation from '@/components/custom/Navigation';
import DashboardCard from '@/components/custom/DashboardCard';
import { NavigationTab } from '@/lib/types';
import { mockUserStats, mockTasks, weeklyFocusData } from '@/lib/mock-data';
import { 
  Flame, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Zap,
  Target,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function FocoMente() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  const stats = mockUserStats;
  const pendingTasks = mockTasks.filter(t => !t.completed);
  const completedToday = mockTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-24 md:pt-28 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-inter">
                Bem-vindo ao <span className="text-[#FF6B00]">FocoMente</span>
              </h2>
              <p className="text-white/60">Seu espaço premium de produtividade e foco</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DashboardCard
                title="Streak Atual"
                icon={<Flame className="w-5 h-5 text-[#FF6B00]" />}
                className="col-span-1"
              >
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-[#FF6B00]">{stats.currentStreak}</span>
                  <span className="text-white/60 mb-1">dias</span>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Tempo Total"
                icon={<Clock className="w-5 h-5 text-[#FF6B00]" />}
                className="col-span-1"
              >
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-[#FF6B00]">
                    {Math.floor(stats.totalFocusTime / 60)}h
                  </span>
                  <span className="text-white/60 mb-1">{stats.totalFocusTime % 60}m</span>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Tarefas Concluídas"
                icon={<CheckCircle2 className="w-5 h-5 text-[#FF6B00]" />}
                className="col-span-1"
              >
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-[#FF6B00]">{stats.tasksCompleted}</span>
                  <span className="text-white/60 mb-1">total</span>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Badges"
                icon={<Trophy className="w-5 h-5 text-[#FF6B00]" />}
                className="col-span-1"
              >
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-[#FF6B00]">
                    {stats.badges.filter(b => b.earned).length}
                  </span>
                  <span className="text-white/60 mb-1">/{stats.badges.length}</span>
                </div>
              </DashboardCard>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Focus Chart */}
              <DashboardCard
                title="Foco Semanal"
                icon={<TrendingUp className="w-5 h-5 text-[#FF6B00]" />}
                className="md:col-span-2"
              >
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyFocusData}>
                      <XAxis 
                        dataKey="day" 
                        stroke="#FFFFFF40"
                        tick={{ fill: '#FFFFFF60' }}
                      />
                      <YAxis 
                        stroke="#FFFFFF40"
                        tick={{ fill: '#FFFFFF60' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1A1A1A',
                          border: '1px solid #FF6B0020',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Bar 
                        dataKey="minutes" 
                        fill="#FF6B00" 
                        radius={[8, 8, 0, 0]}
                        opacity={0.8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardCard>

              {/* Quick Actions */}
              <DashboardCard
                title="Ações Rápidas"
                icon={<Zap className="w-5 h-5 text-[#FF6B00]" />}
              >
                <div className="space-y-3">
                  <button className="w-full bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 border border-[#FF6B00]/30 text-[#FF6B00] py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF6B00]/20 flex items-center justify-center gap-2 font-medium">
                    <Target className="w-5 h-5" />
                    Iniciar Sessão de Foco
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    Adicionar Tarefa
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium">
                    <Calendar className="w-5 h-5" />
                    Ver Calendário
                  </button>
                </div>
              </DashboardCard>

              {/* Pending Tasks */}
              <DashboardCard
                title="Tarefas Pendentes"
                icon={<CheckCircle2 className="w-5 h-5 text-[#FF6B00]" />}
              >
                <div className="space-y-3">
                  {pendingTasks.slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      className="bg-[#0D0D0D] border border-white/10 rounded-lg p-3 hover:border-[#FF6B00]/30 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-[#FF6B00] transition-colors">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              task.priority === 'high' 
                                ? 'bg-red-500/10 text-red-400' 
                                : task.priority === 'medium'
                                ? 'bg-yellow-500/10 text-yellow-400'
                                : 'bg-blue-500/10 text-blue-400'
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-white/40">{task.category}</span>
                          </div>
                        </div>
                        {task.focusTime && (
                          <div className="text-xs text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-1 rounded">
                            {task.focusTime}m
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {pendingTasks.length === 0 && (
                    <div className="text-center py-8 text-white/40">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Nenhuma tarefa pendente!</p>
                    </div>
                  )}
                </div>
              </DashboardCard>
            </div>

            {/* Recent Badges */}
            <DashboardCard
              title="Conquistas Recentes"
              icon={<Trophy className="w-5 h-5 text-[#FF6B00]" />}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      badge.earned
                        ? 'bg-[#FF6B00]/10 border-[#FF6B00]/30 hover:scale-105 cursor-pointer'
                        : 'bg-white/5 border-white/10 opacity-40'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        badge.earned ? 'bg-[#FF6B00]/20' : 'bg-white/10'
                      }`}>
                        <Trophy className={`w-6 h-6 ${badge.earned ? 'text-[#FF6B00]' : 'text-white/40'}`} />
                      </div>
                      <h4 className={`text-sm font-medium mb-1 ${
                        badge.earned ? 'text-white' : 'text-white/40'
                      }`}>
                        {badge.name}
                      </h4>
                      <p className="text-xs text-white/40">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        )}

        {/* Placeholder para outras tabs */}
        {activeTab !== 'dashboard' && (
          <div className="flex flex-col items-center justify-center h-[60vh] animate-in fade-in duration-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-[#FF6B00]" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className="text-white/60">Esta seção será implementada no próximo módulo</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
