import React from 'react';
import { ContentItem, Source } from '../types';
import { SOURCES } from '../constants';

interface SocialCardsProps {
  items: ContentItem[];
}

const SocialCards: React.FC<SocialCardsProps> = ({ items }) => {
  const getSource = (id: string): Source | undefined => {
    return SOURCES.find(s => s.id === id);
  };

  return (
    <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {items.map(item => {
          const source = getSource(item.sourceId);
          return (
            <div key={item.id} className="glass bg-white dark:bg-zinc-900/40 border border-border-light dark:border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:scale-[1.01] transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mr-4 border border-border-light dark:border-zinc-700">
                      <span className="material-icons-outlined text-zinc-500">person</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black dark:bg-white rounded border border-white dark:border-zinc-900 flex items-center justify-center">
                       <span className="material-icons-outlined text-[10px] text-white dark:text-black">verified</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-text-primary-light dark:text-text-primary-dark">{item.author}</h3>
                    <p className="text-[10px] font-bold text-text-secondary-light uppercase tracking-tight opacity-70">{item.handle}</p>
                  </div>
                </div>
                <div className={`w-8 h-8 ${source?.colorClass} text-[10px] font-black flex items-center justify-center rounded border border-white/20`}>
                  {source?.initials}
                </div>
              </div>
              
              {item.imageUrl && (
                <div className="px-6 pb-2">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 relative">
                    <img src={item.imageUrl} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="content" />
                  </div>
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-medium text-text-primary-light dark:text-text-primary-dark leading-relaxed mb-6 line-clamp-4">
                  {item.content}
                </p>
                
                <div className="mt-auto pt-6 border-t border-border-light/30 dark:border-border-dark/30 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-text-secondary-light hover:text-text-primary-light transition-colors">
                      <span className="material-icons-outlined text-xl mr-1.5 opacity-50">favorite_border</span>
                      <span className="text-[10px] font-black tracking-tighter uppercase">React</span>
                    </div>
                    <div className="flex items-center text-text-secondary-light hover:text-text-primary-light transition-colors">
                      <span className="material-icons-outlined text-xl mr-1.5 opacity-50">auto_graph</span>
                      <span className="text-[10px] font-black tracking-tighter uppercase">Reach</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-white dark:text-black bg-black dark:bg-white px-2 py-1 rounded tracking-tighter uppercase">
                    {item.publishedAt}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialCards;