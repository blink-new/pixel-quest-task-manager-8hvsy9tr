import React from 'react';
import { User, Sword, Shield, Zap, Star } from 'lucide-react';
import { Button } from '../ui/button';

export function CharacterCard() {
  return (
    <div className="pixel-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="pixel-font text-sm text-purple-400">CHARACTER</h2>
        <Button variant="outline" size="sm" className="pixel-font text-xs border-slate-600">
          CUSTOMIZE
        </Button>
      </div>

      {/* Character Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 pixel-border mb-3 flex items-center justify-center glow-effect">
          <User className="w-12 h-12 text-white" />
        </div>
        <h3 className="pixel-font text-sm text-white mb-1">PIXEL WARRIOR</h3>
        <p className="pixel-font text-xs text-purple-400">LEVEL 5 PRODUCTIVITY MASTER</p>
      </div>

      {/* Character Stats */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sword className="w-4 h-4 text-red-400" />
            <span className="pixel-font text-xs text-slate-300">ATTACK</span>
          </div>
          <span className="pixel-font text-xs text-white">25</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="pixel-font text-xs text-slate-300">DEFENSE</span>
          </div>
          <span className="pixel-font text-xs text-white">18</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="pixel-font text-xs text-slate-300">SPEED</span>
          </div>
          <span className="pixel-font text-xs text-white">22</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="pixel-font text-xs text-slate-300">FOCUS</span>
          </div>
          <span className="pixel-font text-xs text-white">30</span>
        </div>
      </div>

      {/* Next Level Progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="pixel-font text-xs text-slate-400">NEXT LEVEL</span>
          <span className="pixel-font text-xs text-slate-400">750/1000 XP</span>
        </div>
        <div className="w-full bg-slate-700 h-3 pixel-border">
          <div className="xp-bar h-full" style={{ width: '75%' }}></div>
        </div>
        <p className="pixel-font text-xs text-slate-500 text-center">250 XP TO LEVEL 6</p>
      </div>

      {/* Equipment */}
      <div className="mt-6 pt-4 border-t-2 border-slate-600">
        <h4 className="pixel-font text-xs text-slate-400 mb-3">EQUIPPED</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square bg-slate-700 pixel-border flex items-center justify-center">
            <Sword className="w-4 h-4 text-slate-400" />
          </div>
          <div className="aspect-square bg-slate-700 pixel-border flex items-center justify-center">
            <Shield className="w-4 h-4 text-slate-400" />
          </div>
          <div className="aspect-square bg-slate-700 pixel-border flex items-center justify-center">
            <span className="pixel-font text-xs text-slate-500">?</span>
          </div>
        </div>
      </div>
    </div>
  );
}