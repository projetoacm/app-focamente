'use client';

import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function DashboardCard({ title, children, icon, className = '' }: DashboardCardProps) {
  return (
    <div
      className={`bg-[#1A1A1A] border border-[#FF6B00]/10 rounded-2xl p-6 hover:border-[#FF6B00]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B00]/5 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="w-10 h-10 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-white font-inter">{title}</h3>
      </div>
      {children}
    </div>
  );
}
