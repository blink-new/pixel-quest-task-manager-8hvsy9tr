import React, { useState } from 'react';
import { 
  Home, 
  CheckSquare, 
  FolderOpen, 
  User, 
  BarChart3, 
  Settings,
  Sword,
  Trophy,
  Heart,
  Coins,
  Users,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '#dashboard', key: 'dashboard' },
  { name: 'Tasks', icon: CheckSquare, href: '#tasks', key: 'tasks' },
  { name: 'Projects', icon: FolderOpen, href: '#projects', key: 'projects' },
  { name: 'Party', icon: Users, href: '#party', key: 'party' },
  { name: 'Character', icon: User, href: '#character', key: 'character' },
  { name: 'XP System', icon: Zap, href: '#xp', key: 'xp' },
  { name: 'Stats', icon: BarChart3, href: '#stats', key: 'stats' },
  { name: 'Settings', icon: Settings, href: '#settings', key: 'settings' },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-800 pixel-border border-r-2 border-slate-600">
      {/* Logo/Title */}
      <div className="p-6 border-b-2 border-slate-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 pixel-border flex items-center justify-center glow-effect">
            <Sword className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-heading text-purple-400 text-sm font-semibold">PIXEL QUEST</h1>
        </div>
      </div>

      {/* Character Stats */}
      <div className="p-4 border-b-2 border-slate-600">
        <div className="pixel-card p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="pixel-font text-xs text-slate-300">LEVEL 1</span>
            <div className="flex items-center space-x-1">
              <Coins className="w-3 h-3 text-yellow-500" />
              <span className="pixel-font text-xs text-yellow-500">150</span>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="pixel-font text-xs text-slate-400">XP</span>
              <span className="pixel-font text-xs text-slate-400">75/100</span>
            </div>
            <div className="w-full bg-slate-700 h-2 pixel-border">
              <div className="xp-bar h-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          {/* Health Bar */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="pixel-font text-xs text-red-400">HP</span>
              <span className="pixel-font text-xs text-red-400">85/100</span>
            </div>
            <div className="w-full bg-slate-700 h-2 pixel-border">
              <div className="health-bar h-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Mana Bar */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="pixel-font text-xs text-blue-400">MP</span>
              <span className="pixel-font text-xs text-blue-400">60/100</span>
            </div>
            <div className="w-full bg-slate-700 h-2 pixel-border">
              <div className="mana-bar h-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            onClick={() => onSectionChange(item.key)}
            className={`w-full justify-start font-pixel text-xs h-10 transition-all duration-200 ${
              activeSection === item.key
                ? 'text-white bg-purple-500/20 border-purple-500/50 pixel-border'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50 pixel-border hover:border-purple-500/30'
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.name.toUpperCase()}
          </Button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t-2 border-slate-600 mt-auto">
        <div className="space-y-2">
          <Button className="w-full pixel-button text-xs h-8">
            + NEW QUEST
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 pixel-font text-xs h-8 border-slate-600">
              <Trophy className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="flex-1 pixel-font text-xs h-8 border-slate-600">
              <Heart className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}