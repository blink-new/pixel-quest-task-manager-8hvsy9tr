import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { blink } from './blink/client';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setLoading(state.isLoading);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="pixel-card p-8 text-center">
          <div className="w-16 h-16 bg-purple-500 pixel-border mx-auto mb-4 flex items-center justify-center glow-effect">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="pixel-font text-sm text-purple-400">LOADING PIXEL QUEST...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 pixel-grid flex items-center justify-center">
        <div className="pixel-card p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 pixel-border mx-auto mb-6 flex items-center justify-center glow-effect">
            <span className="pixel-font text-lg text-white">PQ</span>
          </div>
          <h1 className="pixel-font text-lg text-purple-400 mb-4">PIXEL QUEST</h1>
          <p className="text-slate-300 text-sm mb-6">
            Transform your productivity into an epic RPG adventure! Level up by completing tasks and achieving your goals.
          </p>
          <button 
            onClick={() => blink.auth.login()}
            className="w-full pixel-button text-sm h-12"
          >
            START YOUR QUEST
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default App;