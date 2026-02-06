import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onMenuClick }) => {
  return (
    <header className="h-16 flex items-center px-4 md:px-8 border-b border-border-light dark:border-border-dark glass bg-white/50 dark:bg-background-dark/50 flex-shrink-0 z-10 sticky top-0">
      <button 
        onClick={onMenuClick}
        className="md:hidden mr-4 p-2 -ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-primary-light dark:text-white"
      >
        <span className="material-icons-outlined">menu</span>
      </button>
      
      <div className="flex items-center text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest truncate">
        <span className="material-icons-outlined mr-2 text-lg opacity-50 hidden sm:block">dataset</span>
        <span className="hidden sm:inline">Tracker</span>
        <span className="mx-3 opacity-20 hidden sm:inline">/</span>
        <span className="text-text-primary-light dark:text-white font-black">{activeTab}</span>
      </div>

      <div className="ml-auto flex items-center space-x-2 md:space-x-6">
        <div className="hidden lg:flex items-center bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-xl px-4 py-1.5 w-72 focus-within:ring-1 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-500 transition-all">
          <span className="material-icons-outlined text-sm text-text-secondary-light mr-2">search</span>
          <input type="text" placeholder="Search system nodes..." className="bg-transparent border-none focus:ring-0 text-xs w-full p-0 font-medium placeholder:text-zinc-500" />
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 text-text-secondary-light hover:text-text-primary-light transition-colors relative">
            <span className="material-icons-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-zinc-500 rounded-full"></span>
          </button>
          <div className="h-6 w-px bg-border-light dark:bg-border-dark hidden sm:block"></div>
          <div className="flex items-center space-x-2 hidden sm:flex">
            <div className="text-right">
              <p className="text-[10px] font-bold leading-none mb-1">Signal Engine</p>
              <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-tighter">Active State</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
              <span className="material-icons-outlined text-sm">bolt</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;