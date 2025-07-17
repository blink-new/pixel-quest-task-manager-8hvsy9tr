import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Layout({ children, activeSection, onSectionChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 pixel-grid">
      <div className="flex h-screen">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 modern-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}