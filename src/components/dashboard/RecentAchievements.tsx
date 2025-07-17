import React from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';

const achievements = [
  {
    id: '1',
    title: 'TASK MASTER',
    description: 'Complete 10 tasks in a day',
    icon: Trophy,
    rarity: 'legendary',
    unlockedAt: '2 hours ago',
    xpReward: 100,
  },
  {
    id: '2',
    title: 'EARLY BIRD',
    description: 'Complete morning routine 7 days straight',
    icon: Star,
    rarity: 'rare',
    unlockedAt: '1 day ago',
    xpReward: 50,
  },
  {
    id: '3',
    title: 'FOCUS WARRIOR',
    description: 'Work for 2 hours without breaks',
    icon: Target,
    rarity: 'common',
    unlockedAt: '3 days ago',
    xpReward: 25,
  },
];

const rarityColors = {
  legendary: 'from-yellow-500 to-orange-500',
  rare: 'from-purple-500 to-blue-500',
  common: 'from-green-500 to-teal-500',
};

const rarityBorders = {
  legendary: 'border-yellow-500',
  rare: 'border-purple-500',
  common: 'border-green-500',
};

export function RecentAchievements() {
  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="pixel-font text-sm text-purple-400">RECENT ACHIEVEMENTS</h2>
        <div className="flex items-center space-x-1">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="pixel-font text-xs text-yellow-500">12</span>
        </div>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`pixel-border ${rarityBorders[achievement.rarity as keyof typeof rarityBorders]} p-3 bg-slate-800/30 hover:bg-slate-800/50 transition-colors`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${rarityColors[achievement.rarity as keyof typeof rarityColors]} pixel-border flex items-center justify-center glow-effect`}>
                <achievement.icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="pixel-font text-xs text-white truncate">{achievement.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="pixel-font text-xs text-yellow-400">{achievement.xpReward}</span>
                  </div>
                </div>
                
                <p className="text-slate-400 text-xs mb-2 line-clamp-2">{achievement.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`pixel-font text-xs ${
                    achievement.rarity === 'legendary' ? 'text-yellow-400' :
                    achievement.rarity === 'rare' ? 'text-purple-400' :
                    'text-green-400'
                  }`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                  <span className="pixel-font text-xs text-slate-500">{achievement.unlockedAt}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-4 pt-4 border-t-2 border-slate-600">
        <button className="w-full pixel-button text-xs h-8">
          VIEW ALL ACHIEVEMENTS
        </button>
      </div>
    </div>
  );
}