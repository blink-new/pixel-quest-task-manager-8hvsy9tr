import React from 'react';
import { CheckSquare, Target, Trophy, Coins, TrendingUp, Calendar } from 'lucide-react';

const stats = [
  {
    title: 'QUESTS COMPLETED',
    value: '24',
    change: '+3 today',
    icon: CheckSquare,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  {
    title: 'ACTIVE PROJECTS',
    value: '5',
    change: '2 due soon',
    icon: Target,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    title: 'ACHIEVEMENTS',
    value: '12',
    change: '+1 this week',
    icon: Trophy,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
  {
    title: 'COINS EARNED',
    value: '1,250',
    change: '+50 today',
    icon: Coins,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-600/20',
  },
];

export function StatsOverview() {
  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="pixel-font text-sm text-purple-400">ADVENTURE STATS</h2>
        <div className="flex items-center space-x-2 text-slate-400">
          <Calendar className="w-4 h-4" />
          <span className="pixel-font text-xs">THIS WEEK</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="pixel-border border-slate-600 p-4 bg-slate-800/50">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 ${stat.bgColor} pixel-border flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <TrendingUp className="w-3 h-3 text-green-400" />
            </div>
            
            <div className="space-y-1">
              <p className="pixel-font text-xs text-slate-400">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="pixel-font text-xs text-slate-500">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}