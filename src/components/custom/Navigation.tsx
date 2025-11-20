'use client';

import { NavigationTab } from '@/lib/types';
import { LayoutDashboard, CheckSquare, Target, TrendingUp, User, Users } from 'lucide-react';

interface NavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks' as NavigationTab, label: 'Tarefas', icon: CheckSquare },
    { id: 'focus' as NavigationTab, label: 'Foco', icon: Target },
    { id: 'progress' as NavigationTab, label: 'Progresso', icon: TrendingUp },
    { id: 'profiles' as NavigationTab, label: 'Perfis', icon: User },
    { id: 'community' as NavigationTab, label: 'Comunidade', icon: Users }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#FF6B00]/10">
        <div className="max-w-7xl mx-auto w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h1 className="text-2xl font-bold font-inter">
                Foco<span className="text-[#FF6B00]">Mente</span>
              </h1>
            </div>
            
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FF6B00]/10 text-[#FF6B00] shadow-lg shadow-[#FF6B00]/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-t border-[#FF6B00]/10">
        <div className="flex justify-around items-center px-2 py-3">
          {tabs.slice(0, 5).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-[#FF6B00]'
                    : 'text-white/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
