import React from "react";
import { TabType, FilterState } from "../types";

interface FiltersProps {
  activeTab: TabType;
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: any) => void;
  onApply: () => void;
  onClear: () => void;
  activeCategory?: "Sports" | "Pop-Culture";
}

const Filters: React.FC<FiltersProps> = ({
  activeTab,
  filters,
  onFilterChange,
  onApply,
  onClear,
  activeCategory,
}) => {
  const isSocial = activeTab === TabType.SOCIAL;
  const isTier2 = activeTab === TabType.TIER_2;
  const isArticles = activeTab === TabType.ARTICLES;

  const MSN_POP_CATEGORIES = ["Music", "TV", "Movies", "Entertainment"];
  const MSN_SPORTS_CATEGORIES = ["Cricket", "Sports", "NFL", "NBA", "F1"];

  const TIER2_POP_CATEGORIES = [
    "Music",
    "TV",
    "Movies",
    "Lifestyle",
    "Business",
    "Celebrity",
    "Theatre",
    "Hollywood",
  ];
  const TIER2_SPORTS_CATEGORIES = [
    "Sports",
    "Cricket",
    "Football",
    "Tennis",
    "Basketball",
    "Hockey",
    "Badminton",
    "Motorsports",
  ];

  const TIER2_POP_PUBLISHERS = [
    "People",
    "Variety",
    "TMZ",
    "Deadline",
    "EW",
    "Reporter",
  ];
  const TIER2_SPORTS_PUBLISHERS = [
    "FoxSports",
    "NDTV",
    "Sportstar",
    "The Print",
  ];

  if (isArticles) {
    const currentCategories =
      activeCategory === "Sports" ? MSN_SPORTS_CATEGORIES : MSN_POP_CATEGORIES;

    return (
      <div className="px-4 md:px-8 py-4 flex-shrink-0">
        <div className="glass bg-white/50 dark:bg-zinc-900/40 rounded-3xl p-4 md:p-6 border border-border-light dark:border-white/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-2">
              <span className="material-icons-outlined text-text-primary-light dark:text-white opacity-80">
                tune
              </span>
              <h2 className="text-sm font-bold tracking-tight">Filters</h2>{" "}
            </div>

            <div className="flex items-center space-x-3 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
              <span className="text-[10px] font-bold text-text-secondary-light uppercase tracking-wider">
                Sort by Likes
              </span>
              <button
                onClick={() =>
                  onFilterChange("sortByLikes", !filters.sortByLikes)
                }
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${filters.sortByLikes ? "bg-pink-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-300 ${filters.sortByLikes ? "left-6" : "left-1"}`}
                ></div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Keywords
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-zinc-400 p-3 pl-10 placeholder-zinc-400 transition-all"
                  placeholder="Search..."
                  type="text"
                  value={filters.keywords}
                  onChange={(e) => onFilterChange("keywords", e.target.value)}
                />
                <span className="material-icons-outlined absolute left-3 top-2.5 text-lg text-zinc-400">
                  search
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Source
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 p-3 pr-10 appearance-none transition-all cursor-pointer"
                  value={filters.platform}
                  onChange={(e) => onFilterChange("platform", e.target.value)}
                >
                  <option>All Sources</option>
                  <option>MSN</option>
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-zinc-500 material-icons-outlined text-sm opacity-50">
                  dns
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Publisher
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-zinc-400 p-3 pl-10 placeholder-zinc-400 transition-all"
                  placeholder="Filter Publisher..."
                  type="text"
                  value={filters.publication}
                  onChange={(e) =>
                    onFilterChange("publication", e.target.value)
                  }
                />
                <span className="material-icons-outlined absolute left-3 top-2.5 text-lg text-zinc-400">
                  business
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Content Type
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 p-3 pr-10 appearance-none transition-all cursor-pointer"
                  value={filters.contentType}
                  onChange={(e) =>
                    onFilterChange("contentType", e.target.value)
                  }
                >
                  <option>All Types</option>
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="slideshow">Slideshow</option>
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-zinc-500 material-icons-outlined text-sm opacity-50">
                  perm_media
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Category
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 p-3 pr-10 appearance-none transition-all cursor-pointer"
                  value={filters.category}
                  onChange={(e) => onFilterChange("category", e.target.value)}
                >
                  <option>All Categories</option>
                  {currentCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-zinc-500 material-icons-outlined text-sm opacity-50">
                  category
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between pt-4 border-t border-border-light dark:border-border-dark/30 gap-4">
            <div className="hidden md:block"></div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={onClear}
                className="flex-1 md:flex-none px-6 py-2.5 text-xs font-bold text-text-secondary-light hover:text-text-primary-light dark:hover:text-white transition-colors"
              >
                Reset
              </button>
              <button
                onClick={onApply}
                className="flex-1 md:flex-none justify-center px-8 py-2.5 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-black rounded-xl transition-all hover:scale-[1.02] flex items-center"
              >
                <span className="material-icons-outlined text-sm mr-2">
                  filter_list
                </span>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isTier2) {
    const currentCategories =
      activeCategory === "Sports"
        ? TIER2_SPORTS_CATEGORIES
        : TIER2_POP_CATEGORIES;
    const currentPublishers =
      activeCategory === "Sports"
        ? TIER2_SPORTS_PUBLISHERS
        : TIER2_POP_PUBLISHERS;

    return (
      <div className="px-4 md:px-8 py-4 flex-shrink-0">
        <div className="glass bg-white/50 dark:bg-zinc-900/40 rounded-3xl p-4 md:p-6 border border-border-light dark:border-white/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-2">
              <span className="material-icons-outlined text-text-primary-light dark:text-white opacity-80">
                tune
              </span>
              <h2 className="text-sm font-bold tracking-tight">Filters</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Keyword
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-zinc-400 p-3 pl-10 placeholder-zinc-400 transition-all"
                  placeholder="Search..."
                  type="text"
                  value={filters.keywords}
                  onChange={(e) => onFilterChange("keywords", e.target.value)}
                />
                <span className="material-icons-outlined absolute left-3 top-2.5 text-lg text-zinc-400">
                  search
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Publisher
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 p-3 pr-10 appearance-none transition-all cursor-pointer"
                  value={filters.platform}
                  onChange={(e) => onFilterChange("platform", e.target.value)}
                >
                  <option>All Publishers</option>
                  {currentPublishers.map((pub) => (
                    <option key={pub} value={pub}>
                      {pub}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-zinc-500 material-icons-outlined text-sm opacity-50">
                  expand_more
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Category
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 p-3 pr-10 appearance-none transition-all cursor-pointer"
                  value={filters.category}
                  onChange={(e) => onFilterChange("category", e.target.value)}
                >
                  <option>All Categories</option>
                  {currentCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-zinc-500 material-icons-outlined text-sm opacity-50">
                  category
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-text-secondary-light uppercase tracking-wider ml-1">
                Duration
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-black/40 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark text-xs rounded-xl focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 p-3 pr-10 appearance-none transition-all cursor-pointer"
                  value={filters.duration}
                  onChange={(e) => onFilterChange("duration", e.target.value)}
                >
                  <option>All Time</option>
                  <option>Last 24 hours</option>
                  <option>Last 48 hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-zinc-500 material-icons-outlined text-sm opacity-50">
                  schedule
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between pt-4 border-t border-border-light dark:border-border-dark/30 gap-4">
            <div className="hidden md:block"></div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={onClear}
                className="flex-1 md:flex-none px-6 py-2.5 text-xs font-bold text-text-secondary-light hover:text-text-primary-light dark:hover:text-white transition-colors"
              >
                Reset
              </button>
              <button
                onClick={onApply}
                className="flex-1 md:flex-none justify-center px-8 py-2.5 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-black rounded-xl transition-all hover:scale-[1.02] flex items-center"
              >
                <span className="material-icons-outlined text-sm mr-2">
                  filter_list
                </span>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Filters;
