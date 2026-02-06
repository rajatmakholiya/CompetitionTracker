import React, { useState, useMemo, useEffect } from "react";
import { ContentItem, Source, TabType } from "../types";
import { SOURCES } from "../constants";

interface SourceTableProps {
  items: ContentItem[];
  activeTab: TabType;
}

const ITEMS_PER_PAGE = 15;

const PublisherIcon = ({
  name,
  initials,
  colorClass,
}: {
  name: string;
  initials: string;
  colorClass: string;
}) => {
  const [imgError, setImgError] = useState(false);
  const iconFileName =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") + ".png";
  const iconPath = `/assets/${iconFileName}`;

  if (imgError) {
    return (
      <div
        className={`w-10 h-10 ${colorClass} text-[10px] font-black flex items-center justify-center rounded-lg mr-3 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={iconPath}
      alt={name}
      onError={() => setImgError(true)}
      className="w-10 h-10 rounded-lg mr-3 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 object-contain bg-white border border-black/5 dark:border-white/10 p-0.5"
    />
  );
};

const SourceTable: React.FC<SourceTableProps> = ({ items, activeTab }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const isMsnTab = activeTab === TabType.ARTICLES;

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [items, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getSource = (id: string): Source | undefined => {
    return SOURCES.find((s) => s.id === id);
  };

  const getFallbackInitial = (name: string) =>
    name ? name.charAt(0).toUpperCase() : "?";

  const formatToPST = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return dateString;
    }
  };

  const getDuration = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();

      if (diffInMs < 0) return "Just now";

      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);

      if (diffInSeconds < 60) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInDays < 30) return `${diffInDays}d ago`;
      if (diffInMonths < 12) return `${diffInMonths}mo ago`;
      return `${diffInYears}y ago`;
    } catch (e) {
      return "";
    }
  };

  const formatCategory = (cat?: string) => {
    if (!cat) return "General";
    const lower = cat.toLowerCase();
    if (lower === "tv") return "TV";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const getTypeIcon = (type?: string) => {
    const t = (type || "").toLowerCase();
    if (t.includes("video")) return "play_circle_filled";
    if (t.includes("slideshow")) return "collections";
    return "article";
  };

  const getTypeColor = (type?: string) => {
    const t = (type || "").toLowerCase();
    if (t.includes("video")) return "text-red-500";
    if (t.includes("slideshow")) return "text-blue-500";
    return "text-zinc-400";
  };

  return (
    <div className="flex-1 animate-in fade-in zoom-in-95 duration-700 flex flex-col">
      <div className="min-w-[1000px] glass bg-white dark:bg-zinc-900/40 rounded-3xl border border-border-light dark:border-white/10 overflow-hidden shadow-xl flex flex-col">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5 text-[10px] font-black text-text-secondary-light uppercase tracking-widest border-b border-border-light dark:border-border-dark">
              {isMsnTab && (
                <th className="px-6 py-5 text-left w-[5%]">Source</th>
              )}
              <th
                className={`px-6 py-5 text-left ${isMsnTab ? "w-[12%]" : "w-[17%]"}`}
              >
                Publisher
              </th>
              {isMsnTab && (
                <th className="px-6 py-5 text-center w-[5%]">Type</th>
              )}
              <th className="px-6 py-5 text-left w-[8%]">Category</th>
              <th
                className={`px-6 py-5 text-left ${isMsnTab ? "w-[25%]" : "w-[30%]"}`}
              >
                Story
              </th>
              <th className="px-6 py-5 text-left w-[15%]">Summary</th>

              {!isMsnTab && (
                <th className="px-6 py-5 text-left w-[12%]">Published (PST)</th>
              )}
              {isMsnTab && (
                <th className="px-6 py-5 text-left w-[8%]">Duration</th>
              )}

              {isMsnTab && (
                <th className="px-6 py-5 text-center w-[5%]">Likes</th>
              )}
              <th className="px-6 py-5 text-center w-[5%]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light/50 dark:divide-border-dark/50">
            {currentItems.map((item) => {
              const source = getSource(item.sourceId);
              const displaySource = source || {
                name: item.sourceId || "Unknown Source",
                platform: "RSS Feed",
                initials: getFallbackInitial(item.sourceId),
                colorClass: "bg-zinc-500 text-white",
              };
              const itemType = (item as any).type;
              const itemLikes = (item as any).likes;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                  {isMsnTab && (
                    <td className="px-6 py-6 align-middle">
                      <img
                        src="/assets/msn.png"
                        alt="MSN"
                        className="w-6 h-6 object-contain opacity-80"
                      />
                    </td>
                  )}

                  <td className="px-6 py-6 align-middle">
                    {isMsnTab ? (
                      <div className="flex items-center h-full">
                        <p className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark truncate">
                          {displaySource.name}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center h-full">
                        <PublisherIcon
                          name={displaySource.name}
                          initials={displaySource.initials}
                          colorClass={displaySource.colorClass}
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark truncate">
                            {displaySource.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </td>

                  {isMsnTab && (
                    <td className="px-6 py-6 align-middle text-center">
                      <span
                        className={`material-icons-outlined text-lg ${getTypeColor(itemType)}`}
                        title={itemType || "Article"}
                      >
                        {getTypeIcon(itemType)}
                      </span>
                    </td>
                  )}

                  <td className="px-6 py-6 align-top">
                    <span className="px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-black uppercase tracking-tighter border border-purple-200 dark:border-purple-800 whitespace-nowrap">
                      {formatCategory(item.category)}
                    </span>
                  </td>

                  <td className="px-6 py-6 align-top">
                    <div className="w-full">
                      <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark leading-relaxed mb-2">
                        {item.title}
                      </p>
                      {item.isViral && (
                        <span className="flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-tighter">
                          <span className="material-icons-outlined text-sm mr-1">
                            trending_up
                          </span>
                          Active
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-6 align-top">
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark italic leading-relaxed line-clamp-3">
                      "{item.summary}"
                    </p>
                  </td>

                  {!isMsnTab && (
                    <td className="px-6 py-6 align-top">
                      <div className="inline-block">
                        <p className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                          {formatToPST(item.publishedAt)}
                        </p>
                      </div>
                    </td>
                  )}

                  {isMsnTab && (
                    <td className="px-6 py-6 align-top">
                      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        {getDuration(item.publishedAt)}
                      </span>
                    </td>
                  )}

                  {isMsnTab && (
                    <td className="px-6 py-6 align-middle text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="material-icons-outlined text-[14px] text-pink-500">
                          favorite
                        </span>
                        <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">
                          {itemLikes !== undefined ? itemLikes : 0}
                        </span>
                      </div>
                    </td>
                  )}

                  <td className="px-6 py-6 align-middle text-center">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-black border border-border-light dark:border-zinc-700 text-text-primary-light dark:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black"
                      title="Visit Original Article"
                    >
                      <span className="material-icons-outlined text-lg">
                        north_east
                      </span>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="py-24 text-center">
            <span className="material-icons-outlined text-5xl text-zinc-300 dark:text-zinc-700 mb-4 block">
              query_stats
            </span>
            <p className="text-sm text-text-secondary-light font-medium">
              No signals detected.
            </p>
          </div>
        )}

        {items.length > 0 && (
          <div className="px-6 py-4 bg-black/5 dark:bg-white/5 border-t border-border-light dark:border-border-dark flex items-center justify-between">
            <span className="text-xs font-bold text-text-secondary-light">
              Showing{" "}
              {Math.min(items.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)}-
              {Math.min(items.length, currentPage * ITEMS_PER_PAGE)} of{" "}
              {items.length}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white dark:bg-black border border-border-light dark:border-zinc-700 text-text-primary-light dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-icons-outlined text-sm">
                  chevron_left
                </span>
              </button>

              <div className="px-4 py-1.5 rounded-lg bg-white dark:bg-black border border-border-light dark:border-zinc-700 text-xs font-black text-text-primary-light dark:text-white">
                {currentPage} / {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white dark:bg-black border border-border-light dark:border-zinc-700 text-text-primary-light dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-icons-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceTable;
