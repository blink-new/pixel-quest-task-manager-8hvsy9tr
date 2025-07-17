import React, { useState, useEffect } from 'react';
import { Star, Zap, Trophy, Crown, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { blink } from '../../blink/client';

interface UserStats {
  id: string;
  level: number;
  xp: number;
  coins: number;
  jobType: 'creative' | 'technical' | 'business' | 'social';
  rankTitle: string;
  health: number;
  mana: number;
}

interface Rank {
  id: string;
  title: string;
  minLevel: number;
  jobType: string;
  description: string;
  icon: string;
  color: string;
}

interface XPTransaction {
  id: string;
  amount: number;
  source: string;
  description: string;
  createdAt: string;
}

const JOB_TYPE_INFO = {
  creative: {
    name: 'Creative',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    icon: '🎨'
  },
  technical: {
    name: 'Technical',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    icon: '💻'
  },
  business: {
    name: 'Business',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    icon: '📊'
  },
  social: {
    name: 'Social',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
    icon: '👥'
  }
};

const LEVEL_XP_REQUIREMENTS = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250,
  3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10450, 11500,
  12600, 13750, 14950, 16200, 17500, 18850, 20250, 21700, 23200, 24750
];

const MOCK_RANKS: Rank[] = [
  // Creative ranks
  { id: 'creative_1', title: 'Creative Novice', minLevel: 1, jobType: 'creative', description: 'Just starting your creative journey', icon: '🎨', color: '#F59E0B' },
  { id: 'creative_2', title: 'Artistic Apprentice', minLevel: 5, jobType: 'creative', description: 'Learning the creative arts', icon: '🖌️', color: '#10B981' },
  { id: 'creative_3', title: 'Design Specialist', minLevel: 10, jobType: 'creative', description: 'Skilled in creative design', icon: '✨', color: '#3B82F6' },
  { id: 'creative_4', title: 'Creative Master', minLevel: 20, jobType: 'creative', description: 'Master of creative expression', icon: '🎭', color: '#8B5CF6' },

  // Technical ranks
  { id: 'technical_1', title: 'Code Rookie', minLevel: 1, jobType: 'technical', description: 'Beginning your technical journey', icon: '💻', color: '#F59E0B' },
  { id: 'technical_2', title: 'Junior Developer', minLevel: 5, jobType: 'technical', description: 'Growing technical skills', icon: '⚙️', color: '#10B981' },
  { id: 'technical_3', title: 'Senior Engineer', minLevel: 10, jobType: 'technical', description: 'Experienced technical expert', icon: '🔧', color: '#3B82F6' },
  { id: 'technical_4', title: 'Tech Architect', minLevel: 20, jobType: 'technical', description: 'Master of technical systems', icon: '🏗️', color: '#8B5CF6' },

  // Business ranks
  { id: 'business_1', title: 'Business Trainee', minLevel: 1, jobType: 'business', description: 'Starting your business career', icon: '📊', color: '#F59E0B' },
  { id: 'business_2', title: 'Project Coordinator', minLevel: 5, jobType: 'business', description: 'Managing business operations', icon: '📈', color: '#10B981' },
  { id: 'business_3', title: 'Strategy Manager', minLevel: 10, jobType: 'business', description: 'Leading business initiatives', icon: '💼', color: '#3B82F6' },
  { id: 'business_4', title: 'Executive Leader', minLevel: 20, jobType: 'business', description: 'Master of business strategy', icon: '👔', color: '#8B5CF6' },

  // Social ranks
  { id: 'social_1', title: 'Social Newcomer', minLevel: 1, jobType: 'social', description: 'Building social connections', icon: '👥', color: '#F59E0B' },
  { id: 'social_2', title: 'Community Helper', minLevel: 5, jobType: 'social', description: 'Supporting your community', icon: '🤝', color: '#10B981' },
  { id: 'social_3', title: 'Social Coordinator', minLevel: 10, jobType: 'social', description: 'Leading social initiatives', icon: '🌟', color: '#3B82F6' },
  { id: 'social_4', title: 'Community Leader', minLevel: 20, jobType: 'social', description: 'Master of social engagement', icon: '👑', color: '#8B5CF6' }
];

export function XPSystem() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<XPTransaction[]>([]);
  const [currentRank, setCurrentRank] = useState<Rank | null>(null);
  const [nextRank, setNextRank] = useState<Rank | null>(null);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadUserStats();
        loadRecentTransactions();
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userStats) {
      updateRankInfo();
    }
  }, [userStats]);

  const loadUserStats = async () => {
    // Mock data - replace with actual API calls
    const mockStats: UserStats = {
      id: 'user_1',
      level: 12,
      xp: 3850,
      coins: 1250,
      jobType: 'technical',
      rankTitle: 'Senior Engineer',
      health: 85,
      mana: 60
    };

    setUserStats(mockStats);
  };

  const loadRecentTransactions = async () => {
    // Mock XP transaction data
    const mockTransactions: XPTransaction[] = [
      {
        id: 'xp_1',
        amount: 25,
        source: 'task',
        description: 'Completed "Design Landing Page"',
        createdAt: '2024-07-17T10:30:00Z'
      },
      {
        id: 'xp_2',
        amount: 5,
        source: 'subtask',
        description: 'Finished wireframes',
        createdAt: '2024-07-17T09:15:00Z'
      },
      {
        id: 'xp_3',
        amount: 50,
        source: 'achievement',
        description: 'Unlocked "Task Master" achievement',
        createdAt: '2024-07-16T16:45:00Z'
      }
    ];

    setRecentTransactions(mockTransactions);
  };

  const updateRankInfo = () => {
    if (!userStats) return;

    const jobRanks = MOCK_RANKS.filter(rank => rank.jobType === userStats.jobType)
      .sort((a, b) => a.minLevel - b.minLevel);

    const current = jobRanks
      .filter(rank => userStats.level >= rank.minLevel)
      .pop();

    const next = jobRanks
      .find(rank => rank.minLevel > userStats.level);

    setCurrentRank(current || null);
    setNextRank(next || null);
  };

  const addXP = async (amount: number, source: string, description: string) => {
    if (!userStats) return;

    const newXP = userStats.xp + amount;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > userStats.level;

    // Update user stats
    setUserStats({
      ...userStats,
      xp: newXP,
      level: newLevel,
      coins: userStats.coins + Math.floor(amount / 2) // Coins = XP / 2
    });

    // Add transaction
    const newTransaction: XPTransaction = {
      id: `xp_${Date.now()}`,
      amount,
      source,
      description,
      createdAt: new Date().toISOString()
    };

    setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);

    // Show level up animation
    if (leveledUp) {
      setLevelUpAnimation(true);
      setTimeout(() => setLevelUpAnimation(false), 3000);
    }
  };

  const calculateLevel = (xp: number): number => {
    for (let i = LEVEL_XP_REQUIREMENTS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_XP_REQUIREMENTS[i]) {
        return i;
      }
    }
    return 0;
  };

  const getXPForNextLevel = (currentLevel: number): number => {
    return LEVEL_XP_REQUIREMENTS[currentLevel + 1] || LEVEL_XP_REQUIREMENTS[LEVEL_XP_REQUIREMENTS.length - 1];
  };

  const getXPProgress = (): { current: number; required: number; percentage: number } => {
    if (!userStats) return { current: 0, required: 100, percentage: 0 };

    const currentLevelXP = LEVEL_XP_REQUIREMENTS[userStats.level] || 0;
    const nextLevelXP = getXPForNextLevel(userStats.level);
    const current = userStats.xp - currentLevelXP;
    const required = nextLevelXP - currentLevelXP;
    const percentage = Math.min((current / required) * 100, 100);

    return { current, required, percentage };
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'task': return <Star className="w-4 h-4 text-blue-400" />;
      case 'subtask': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'project': return <Trophy className="w-4 h-4 text-purple-400" />;
      case 'achievement': return <Award className="w-4 h-4 text-green-400" />;
      default: return <Star className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!user || !userStats) {
    return <div className="pixel-card p-6 text-center">Loading...</div>;
  }

  const jobInfo = JOB_TYPE_INFO[userStats.jobType];
  const xpProgress = getXPProgress();

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      {levelUpAnimation && (
        <div className="level-up-animation">
          <div className="text-center">
            <div className="text-6xl font-bold text-yellow-400 mb-4 animate-bounce">
              LEVEL UP!
            </div>
            <div className="text-2xl text-white">
              Level {userStats.level}
            </div>
          </div>
        </div>
      )}

      {/* Character Overview */}
      <div className="pixel-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${jobInfo.bgColor} ${jobInfo.borderColor} border-2 rounded-xl flex items-center justify-center text-2xl`}>
              {jobInfo.icon}
            </div>
            <div>
              <h2 className="font-heading text-2xl text-white">{user.email?.split('@')[0] || 'Adventurer'}</h2>
              <div className="flex items-center space-x-2">
                <Badge className={`job-badge ${jobInfo.color} ${jobInfo.bgColor} ${jobInfo.borderColor}`}>
                  {jobInfo.name}
                </Badge>
                {currentRank && (
                  <Badge className="rank-badge">
                    {currentRank.icon} {currentRank.title}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-white mb-1">Level {userStats.level}</div>
            <div className="text-slate-400">{userStats.xp.toLocaleString()} Total XP</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Progress to Level {userStats.level + 1}</span>
            <span className="text-slate-400">
              {xpProgress.current.toLocaleString()} / {xpProgress.required.toLocaleString()} XP
            </span>
          </div>
          <Progress value={xpProgress.percentage} className="h-3" />
          <div className="text-center text-xs text-slate-500">
            {Math.max(0, xpProgress.required - xpProgress.current).toLocaleString()} XP to next level
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{userStats.coins.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Coins</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">{userStats.health}/100</div>
            <div className="text-slate-400 text-sm">Health</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{userStats.mana}/100</div>
            <div className="text-slate-400 text-sm">Mana</div>
          </div>
        </div>
      </div>

      {/* Rank Progression */}
      {currentRank && (
        <div className="pixel-card p-6">
          <h3 className="font-heading text-lg text-white mb-4">Rank Progression</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{currentRank.icon}</span>
                <div>
                  <div className="font-medium text-white">{currentRank.title}</div>
                  <div className="text-slate-400 text-sm">{currentRank.description}</div>
                </div>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Current
              </Badge>
            </div>

            {nextRank && (
              <div className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border-l-4 border-slate-600">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl opacity-50">{nextRank.icon}</span>
                  <div>
                    <div className="font-medium text-slate-300">{nextRank.title}</div>
                    <div className="text-slate-500 text-sm">{nextRank.description}</div>
                  </div>
                </div>
                <Badge className="bg-slate-600/20 text-slate-400 border-slate-600/30">
                  Level {nextRank.minLevel}
                </Badge>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent XP Activity */}
      <div className="pixel-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg text-white">Recent Activity</h3>
          <Button 
            onClick={() => addXP(10, 'test', 'Test XP gain')}
            size="sm"
            className="pixel-button"
          >
            <Zap className="w-4 h-4 mr-1" />
            Test +10 XP
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                {getSourceIcon(transaction.source)}
                <div>
                  <div className="text-white text-sm">{transaction.description}</div>
                  <div className="text-slate-500 text-xs">{formatTimeAgo(transaction.createdAt)}</div>
                </div>
              </div>
              <div className="text-green-400 font-medium">+{transaction.amount} XP</div>
            </div>
          ))}
        </div>

        {recentTransactions.length === 0 && (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-400">No recent activity</p>
            <p className="text-slate-500 text-sm">Complete tasks to start earning XP!</p>
          </div>
        )}
      </div>
    </div>
  );
}