import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { TaskManager } from './components/tasks/TaskManager';
import { ProjectManager } from './components/projects/ProjectManager';
import { PartyManager } from './components/party/PartyManager';
import { XPSystem } from './components/character/XPSystem';
import { blink } from './blink/client';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setLoading(state.isLoading);
    });
    return unsubscribe;
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskManager />;
      case 'projects':
        return <ProjectManager />;
      case 'party':
        return <PartyManager />;
      case 'character':
      case 'xp':
        return <XPSystem />;
      case 'stats':
        return (
          <div className="pixel-card p-12 text-center">
            <h2 className="font-heading text-2xl text-white mb-4">Statistics Dashboard</h2>
            <p className="text-slate-400">Detailed analytics and performance metrics coming soon!</p>
          </div>
        );
      case 'settings':
        return (
          <div className="pixel-card p-12 text-center">
            <h2 className="font-heading text-2xl text-white mb-4">Settings</h2>
            <p className="text-slate-400">Customize your Pixel Quest experience - coming soon!</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="pixel-card p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 pixel-border mx-auto mb-4 flex items-center justify-center glow-effect animate-pulse">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="font-pixel text-sm text-purple-400">LOADING PIXEL QUEST...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 pixel-grid flex items-center justify-center">
        <div className="pixel-card p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 pixel-border mx-auto mb-6 flex items-center justify-center glow-effect animate-float">
            <span className="font-pixel text-lg text-white">PQ</span>
          </div>
          <h1 className="font-heading text-2xl text-purple-400 mb-4">PIXEL QUEST</h1>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Transform your productivity into an epic RPG adventure! Level up by completing tasks, 
            join parties with friends, and achieve your goals in style.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Gamified task management</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Real-time XP and leveling</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Party collaboration</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Project management</span>
            </div>
          </div>
          <button 
            onClick={() => blink.auth.login()}
            className="w-full pixel-button text-sm h-12 font-medium"
          >
            START YOUR QUEST
          </button>
          <p className="text-slate-500 text-xs mt-4">
            Join thousands of adventurers already leveling up their productivity!
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
    >
      {renderActiveSection()}
    </Layout>
  );
}

export default App;