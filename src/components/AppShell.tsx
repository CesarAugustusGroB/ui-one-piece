import type { ReactNode } from 'react';
import './AppShell.css';

interface AppShellProps {
  leftPanel: ReactNode;
  centerPanel: ReactNode;
  rightPanel: ReactNode;
}

export function AppShell({ leftPanel, centerPanel, rightPanel }: AppShellProps) {
  return (
    <div className="app-shell">
      {/* TopBar */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo">
            <span className="logo-icon">⚓</span>
            <span className="logo-text">OPTCGSim</span>
          </div>
        </div>
        <div className="topbar-right">
          <button className="btn-icon" title="Toggle Audio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <aside className="left-panel">{leftPanel}</aside>
        <section className="center-panel">{centerPanel}</section>
        <aside className="right-panel">{rightPanel}</aside>
      </main>
    </div>
  );
}
