import React from 'react';
import { Heart, DollarSign, Target, TrendingUp, Plus } from 'lucide-react';
import { Button } from '../ui/button';

const trackers = [
  {
    id: '1',
    title: 'HEALTH SCORE',
    type: 'health',
    currentValue: 85,
    targetValue: 100,
    unit: '%',
    icon: Heart,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    barColor: 'health-bar',
    change: '+5 this week',
  },
  {
    id: '2',
    title: 'SAVINGS GOAL',
    type: 'finance',
    currentValue: 2500,
    targetValue: 5000,
    unit: '$',
    icon: DollarSign,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    barColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    change: '+$200 this month',
  },
  {
    id: '3',
    title: 'FITNESS STREAK',
    type: 'habit',
    currentValue: 12,
    targetValue: 30,
    unit: ' days',
    icon: Target,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    barColor: 'mana-bar',
    change: '+2 days',
  },
];

export function ProgressTrackers() {
  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="pixel-font text-sm text-purple-400">PROGRESS TRACKERS</h2>
        <Button variant="outline" size="sm" className="pixel-font text-xs border-slate-600">
          <Plus className="w-3 h-3 mr-1" />
          ADD TRACKER
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trackers.map((tracker) => (
          <div key={tracker.id} className="pixel-border border-slate-600 p-4 bg-slate-800/30">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 ${tracker.bgColor} pixel-border flex items-center justify-center`}>
                <tracker.icon className={`w-4 h-4 ${tracker.color}`} />
              </div>
              <TrendingUp className="w-3 h-3 text-green-400" />
            </div>

            <div className="space-y-2">
              <h3 className="pixel-font text-xs text-slate-300">{tracker.title}</h3>
              
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-bold text-white">
                  {tracker.unit === '$' ? tracker.unit : ''}{tracker.currentValue}{tracker.unit !== '$' ? tracker.unit : ''}
                </span>
                <span className="pixel-font text-xs text-slate-400">
                  / {tracker.unit === '$' ? tracker.unit : ''}{tracker.targetValue}{tracker.unit !== '$' ? tracker.unit : ''}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-700 h-2 pixel-border">
                  <div 
                    className={`${tracker.barColor} h-full transition-all duration-300`}
                    style={{ width: `${(tracker.currentValue / tracker.targetValue) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className="pixel-font text-xs text-slate-500">
                    {Math.round((tracker.currentValue / tracker.targetValue) * 100)}%
                  </span>
                  <span className="pixel-font text-xs text-green-400">{tracker.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t-2 border-slate-600">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="pixel-font text-xs border-slate-600">
            <Heart className="w-3 h-3 mr-1" />
            LOG HEALTH
          </Button>
          <Button variant="outline" size="sm" className="pixel-font text-xs border-slate-600">
            <DollarSign className="w-3 h-3 mr-1" />
            ADD EXPENSE
          </Button>
          <Button variant="outline" size="sm" className="pixel-font text-xs border-slate-600">
            <Target className="w-3 h-3 mr-1" />
            UPDATE GOAL
          </Button>
        </div>
      </div>
    </div>
  );
}