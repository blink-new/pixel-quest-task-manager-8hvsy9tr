import React from 'react';
import { StatsOverview } from './StatsOverview';
import { ActiveQuests } from './ActiveQuests';
import { CharacterCard } from './CharacterCard';
import { RecentAchievements } from './RecentAchievements';
import { ProgressTrackers } from './ProgressTrackers';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="pixel-card p-6">
        <h1 className="pixel-font text-lg text-purple-400 mb-2">WELCOME BACK, ADVENTURER!</h1>
        <p className="text-slate-300 text-sm">Ready to level up your productivity? You have 3 active quests waiting.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <StatsOverview />
          <ActiveQuests />
          <ProgressTrackers />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CharacterCard />
          <RecentAchievements />
        </div>
      </div>
    </div>
  );
}