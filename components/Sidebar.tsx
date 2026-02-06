import React from 'react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isOpen: boolean;
  onClose: () => void;
  activeCategory: 'Sports' | 'Pop-Culture';
  onCategoryChange: (category: 'Sports' | 'Pop-Culture') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isOpen, 
  onClose,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-72 glass bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark 
        flex flex-col h-screen transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        {/* Header Section */}
        <div className="flex flex-col px-6 md:px-8 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-zinc-200 dark:shadow-none">
              <span className="material-icons-outlined text-white dark:text-black text-xl md:text-2xl font-bold">play_arrow</span>
            </div>
            <span className="font-extrabold text-lg md:text-xl tracking-tighter text-text-primary-light dark:text-white uppercase italic">
              E5 Tube<span className="text-zinc-500 not-italic">.</span>
            </span>
            <button 
              onClick={onClose}
              className="md:hidden ml-auto p-2 text-text-secondary-light hover:text-text-primary-light"
            >
              <span className="material-icons-outlined">close</span>
            </button>
          </div>

          {/* Category Toggle */}
          <div className="bg-zinc-100 dark:bg-black/20 p-1 rounded-xl flex items-center relative border border-black/5 dark:border-white/5">
            <button 
              onClick={() => onCategoryChange('Sports')}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg text-xs font-bold transition-all duration-300 relative z-10 ${
                activeCategory === 'Sports' 
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm' 
                  : 'text-text-secondary-light hover:text-text-primary-light dark:hover:text-white'
              }`}
            >
              Sports
            </button>
            <button 
              onClick={() => onCategoryChange('Pop-Culture')}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg text-xs font-bold transition-all duration-300 relative z-10 ${
                activeCategory === 'Pop-Culture' 
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm' 
                  : 'text-text-secondary-light hover:text-text-primary-light dark:hover:text-white'
              }`}
            >
              Pop-Culture
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-[0.2em] opacity-60">
            Intelligence Engines
          </div>

          <div className="space-y-1">
            <div className="flex items-center px-4 py-3 text-sm font-bold rounded-xl text-text-primary-light dark:text-white bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="material-icons-outlined mr-3 text-xl opacity-80">dataset</span>
              <span className="flex-1">Source Tracker</span>
            </div>
            
            <div className="pl-8 mt-2 space-y-1">
              {[TabType.ARTICLES, TabType.TIER_2, TabType.SOCIAL].map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    activeTab === tab
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-lg scale-[1.02]"
                      : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary-light dark:hover:text-text-primary-dark"
                  }`}
                >
                  <span className={`material-icons-outlined mr-3 text-lg ${
                    activeTab === tab ? "opacity-100" : "opacity-50 group-hover:opacity-100"
                  }`}>
                    {tab === TabType.ARTICLES ? 'article' : tab === TabType.TIER_2 ? 'layers' : 'share'}
                  </span>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-border-light dark:border-border-dark space-y-4 flex-shrink-0">
          <button 
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <span className="text-text-secondary-light dark:text-text-secondary-dark">Theme Control</span>
            <span className="material-icons-outlined text-sm hidden dark:block">light_mode</span>
            <span className="material-icons-outlined text-sm block dark:hidden">dark_mode</span>
          </button>
          
          <div className="flex items-center p-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-border-light dark:border-border-dark shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 border border-border-light dark:border-zinc-700 flex items-center justify-center">
              <span className="material-icons-outlined text-zinc-500">person</span>
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-xs font-bold truncate">Analytical Lead</p>
              <p className="text-[10px] text-text-secondary-light opacity-70">Internal Access</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;