import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Filters from "./components/Filters";
import SourceTable from "./components/SourceTable";
import SocialCards from "./components/SocialCards";
import { TabType, FilterState, ContentItem } from "./types";
import { MOCK_SOCIAL } from "./constants";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ARTICLES);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "Sports" | "Pop-Culture"
  >("Sports");

  const [articlesData, setArticlesData] = useState<ContentItem[]>([]);
  const [tier2Data, setTier2Data] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    keywords: "",
    platform: "All Publishers",
    contentType: "All Types",
    publication: "", 
    minVirality: "",
    minEngagement: "",
    category: "All Categories",
    duration: "All Time",
    sortByLikes: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === TabType.SOCIAL) return;

      setIsLoading(true);
      setError(null);
      let url = "";
      const typeParam = activeCategory === "Sports" ? "sports" : "pop-culture";

      if (activeTab === TabType.ARTICLES) {
        url = `https://competitiontracker-4ikc.onrender.com/api/articles?type=${typeParam}`;
      } else if (activeTab === TabType.TIER_2) {
        url = `https://competitiontracker-4ikc.onrender.com/api/tier2?type=${typeParam}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Server Error: ${response.statusText}`);
        const data = await response.json();

        if (activeTab === TabType.ARTICLES) setArticlesData(data);
        else setTier2Data(data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to connect to backend");
        if (activeTab === TabType.ARTICLES) setArticlesData([]);
        else setTier2Data([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, activeCategory]);

  const handleFilterChange = (name: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      keywords: "",
      platform: "All Publishers",
      contentType: "All Types",
      publication: "",
      minVirality: "",
      minEngagement: "",
      category: "All Categories",
      duration: "All Time",
      sortByLikes: false,
    });
  };

  const displayItems = useMemo(() => {
    let items: ContentItem[] = [];

    switch (activeTab) {
      case TabType.ARTICLES:
        items = [...articlesData];
        break;
      case TabType.TIER_2:
        items = [...tier2Data];
        break;
      case TabType.SOCIAL:
        items = [...MOCK_SOCIAL];
        break;
      default:
        items = [];
    }

    if (filters.category && filters.category !== "All Categories") {
      items = items.filter(
        (item) =>
          (item.category || "").toLowerCase() ===
          filters.category.toLowerCase(),
      );
    }

    if (filters.keywords && filters.keywords.trim() !== "") {
      const lowerKeyword = filters.keywords.toLowerCase().trim();
      items = items.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(lowerKeyword)) ||
          (item.summary && item.summary.toLowerCase().includes(lowerKeyword)),
      );
    }

    if (filters.platform && !filters.platform.includes("All")) {
    }

    if (filters.publication && filters.publication.trim() !== "") {
      const lowerPub = filters.publication.toLowerCase().trim();
      items = items.filter((item) =>
        (item.sourceId || "").toLowerCase().includes(lowerPub),
      );
    }

    if (filters.contentType && filters.contentType !== "All Types") {
      items = items.filter(
        (item) =>
          (item.type || "").toLowerCase() === filters.contentType.toLowerCase(),
      );
    }

    if (filters.duration && filters.duration !== 'All Time') {
      const now = new Date();
      const oneDayMs = 24 * 60 * 60 * 1000;
      
      items = items.filter(item => {
        if (!item.publishedAt) return false;
        const pubDate = new Date(item.publishedAt);
        const diffMs = now.getTime() - pubDate.getTime();
        switch (filters.duration) {
          case 'Last 24 hours': return diffMs <= oneDayMs;
          case 'Last 48 hours': return diffMs <= oneDayMs * 2;
          case 'Last 7 Days':   return diffMs <= oneDayMs * 7;
          case 'Last 30 Days':  return diffMs <= oneDayMs * 30;
          default: return true;
        }
      });
    }

    if (filters.sortByLikes) {
      items.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
      items.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    }

    return items;
  }, [activeTab, articlesData, tier2Data, filters]);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 font-sans selection:bg-zinc-800 selection:text-white dark:selection:bg-white dark:selection:text-black overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

        <Header
          activeTab={activeTab}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative z-0">
          <div className="flex-shrink-0">
            <div className="px-4 md:px-8 mt-6 md:mt-8 mb-4 flex items-end justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-text-primary-light dark:text-white">
                  {activeTab === TabType.ARTICLES ? "MSN Feed" : "Tier 2 Feed"}
                  <span className="opacity-50 mx-2">/</span>
                  {activeCategory}
                </h1>
                <p className="text-xs text-text-secondary-light mt-1 font-medium">
                  Monitoring {activeCategory.toLowerCase()} signal clusters from{" "}
                  {activeTab === TabType.ARTICLES ? "primary" : "secondary"}{" "}
                  sources
                </p>
              </div>
            </div>

            <Filters
              activeTab={activeTab}
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={() =>
                console.log("Processing with parameters:", filters)
              }
              onClear={handleClearFilters}
              activeCategory={activeCategory}
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-8 pb-10 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
              </div>
            )}

            {error && !isLoading && (
              <div className="p-8 text-center animate-in fade-in zoom-in-95">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                  <span className="material-icons-outlined">error_outline</span>
                </div>
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                  Connection Error
                </h3>
                <p className="text-sm text-text-secondary-light">{error}</p>
              </div>
            )}

            {activeTab === TabType.SOCIAL ? (
              <SocialCards items={displayItems} />
            ) : (
              !error && (
                <SourceTable items={displayItems} activeTab={activeTab} />
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
