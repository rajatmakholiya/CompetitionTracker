// types.ts (or wherever you defined FilterState)
export enum TabType {
  ARTICLES = 'Articles',
  TIER_2 = 'Tier 2',
  SOCIAL = 'Social'
}

export interface ContentItem {
  id: string;
  sourceId: string;
  title: string;
  summary: string;
  url: string;
  publishedAt?: string;
  fetchedAt?: string;
  category?: string;
  isViral?: boolean;
  score?: number;
  // New fields for MSN
  type?: string; 
  likes?: number;
}

export interface Source {
  id: string;
  name: string;
  platform: string;
  initials: string;
  colorClass: string;
}

export interface FilterState {
  keywords: string;
  platform: string;     // Used for "Source" or "Publisher" dropdowns depending on tab
  contentType: string;
  publication: string;  // Specific publisher text search
  minVirality: string;
  minEngagement: string;
  category: string;
  duration: string;
  sortByLikes: boolean; // <--- NEW FIELD
}