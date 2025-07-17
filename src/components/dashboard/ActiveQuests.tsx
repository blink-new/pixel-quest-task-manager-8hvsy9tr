import React from 'react';
import { Clock, Star, Zap, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const quests = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Finish the Q1 project proposal document',
    priority: 'high',
    xpReward: 50,
    coinsReward: 25,
    dueDate: '2 hours',
    progress: 75,
    steps: [
      { title: 'Research competitors', completed: true },
      { title: 'Write executive summary', completed: true },
      { title: 'Create budget breakdown', completed: true },
      { title: 'Review and submit', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Daily Exercise Routine',
    description: '30 minutes of cardio workout',
    priority: 'medium',
    xpReward: 20,
    coinsReward: 10,
    dueDate: '6 hours',
    progress: 0,
    steps: [
      { title: 'Warm up (5 min)', completed: false },
      { title: 'Cardio workout (20 min)', completed: false },
      { title: 'Cool down (5 min)', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Learn React Hooks',
    description: 'Complete the advanced React hooks tutorial',
    priority: 'low',
    xpReward: 30,
    coinsReward: 15,
    dueDate: '1 day',
    progress: 40,
    steps: [
      { title: 'Watch introduction video', completed: true },
      { title: 'Practice useState examples', completed: true },
      { title: 'Learn useEffect', completed: false },
      { title: 'Build practice project', completed: false },
    ],
  },
];

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
  low: 'bg-green-500/20 text-green-400 border-green-500',
};

export function ActiveQuests() {
  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="pixel-font text-sm text-purple-400">ACTIVE QUESTS</h2>
        <Button variant="outline" size="sm" className="pixel-font text-xs border-slate-600">
          VIEW ALL
        </Button>
      </div>

      <div className="space-y-4">
        {quests.map((quest) => (
          <div key={quest.id} className="pixel-border border-slate-600 p-4 bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-white text-sm">{quest.title}</h3>
                  <Badge className={`pixel-font text-xs ${priorityColors[quest.priority as keyof typeof priorityColors]}`}>
                    {quest.priority.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-slate-400 text-xs mb-2">{quest.description}</p>
                
                {/* Rewards */}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="pixel-font text-xs text-yellow-500">{quest.xpReward} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="pixel-font text-xs text-yellow-400">{quest.coinsReward} COINS</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="pixel-font text-xs text-slate-400">{quest.dueDate}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span className="pixel-font text-xs text-slate-400">PROGRESS</span>
                    <span className="pixel-font text-xs text-slate-400">{quest.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 pixel-border">
                    <div 
                      className="xp-bar h-full transition-all duration-300" 
                      style={{ width: `${quest.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-1">
                  {quest.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 pixel-border ${step.completed ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                      <span className={`pixel-font text-xs ${step.completed ? 'text-green-400 line-through' : 'text-slate-300'}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="ghost" size="sm" className="ml-4">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}