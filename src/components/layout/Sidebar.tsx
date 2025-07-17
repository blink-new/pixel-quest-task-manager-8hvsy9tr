import React from 'react';
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
  Coins
} from 'lucide-react';
import { Button } from '../ui/button';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '#dashboard' },
  { name: 'Tasks', icon: CheckSquare, href: '#tasks' },
  { name: 'Projects', icon: FolderOpen, href: '#projects' },
  { name: 'Character', icon: User, href: '#character' },
  { name: 'Stats', icon: BarChart3, href: '#stats' },
  { name: 'Settings', icon: Settings, href: '#settings' },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-800 pixel-border border-r-2 border-slate-600">
      {/* Logo/Title */}
      <div className="p-6 border-b-2 border-slate-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 pixel-border flex items-center justify-center">
            <Sword className="w-4 h-4 text-white" />
          </div>
          <h1 className="pixel-font text-purple-400 text-xs">PIXEL QUEST</h1>
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
            className="w-full justify-start pixel-font text-xs h-10 text-slate-300 hover:text-white hover:bg-slate-700 pixel-border hover:border-purple-500"
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