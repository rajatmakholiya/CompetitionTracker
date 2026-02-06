
import { TabType, Source, ContentItem } from './types';

export const SOURCES: Source[] = [
  { id: '1', name: 'Sports Illustrated', platform: 'MSN', initials: 'SI', colorClass: 'bg-black text-white' },
  { id: '2', name: 'Newsweek', platform: 'Google News', initials: 'N', colorClass: 'bg-red-600 text-white' },
  { id: '3', name: 'The Spun', platform: 'Yahoo', initials: 'S', colorClass: 'bg-white text-black border border-gray-200' },
  { id: '4', name: 'Sporting News', platform: 'MSN', initials: 'SN', colorClass: 'bg-black text-white' },
];

export const MOCK_ARTICLES: ContentItem[] = [
  {
    id: 'a1',
    sourceId: '1',
    title: "Mics caught Aaron Rodgers's message to Mike Tomlin after Steelers make playoffs",
    url: 'https://si.com/nfl/steelers-playoffs-rodgers',
    summary: "In a moment captured by NFL Films, Aaron Rodgers shared a candid exchange with Steelers coach Mike Tomlin immediately following Pittsburgh's dramatic victory.",
    category: 'Sports',
    isViral: false,
    publishedAt: '1 day ago',
    fetchedAt: '23h ago',
    viralityScore: 45,
    engagementScore: 1200
  },
  {
    id: 'a2',
    sourceId: '2',
    title: "ICE adds 12,000 agents after nationwide recruitment campaign",
    url: 'https://newsweek.com/us/ice-recruitment-surge',
    summary: "Following an extensive three-month hiring initiative across major metropolitan areas, Immigration and Customs Enforcement officials announced today success.",
    category: 'Politics',
    isViral: true,
    publishedAt: '1 day ago',
    fetchedAt: '12h ago',
    viralityScore: 92,
    engagementScore: 5400
  }
];

export const MOCK_TIER_2: ContentItem[] = [
  {
    id: 't1',
    sourceId: '3',
    title: "NFL sideline reporter ripped for 'unprofessional' postgame question",
    url: 'https://thespun.com/nfl/reporter-backlash-viral',
    summary: "Social media erupted Sunday night after a postgame interview went off the rails. Viewers criticized the line of questioning directed at the losing quarterback.",
    category: 'Sports',
    isViral: false,
    publishedAt: '2 days ago',
    fetchedAt: '5h ago',
    viralityScore: 30,
    engagementScore: 800
  }
];

export const MOCK_SOCIAL: ContentItem[] = [
  {
    id: 's1',
    sourceId: '4',
    author: 'Marissa Lawrence',
    handle: '@marissalawrence',
    content: "The Jaguars quarterback wasn't the only one drawing attention this weekend. Marissa Lawrence shared photos from the suite level showing off coordinated game-day outfits that quickly trended on Instagram and TikTok.",
    imageUrl: 'https://picsum.photos/seed/nfl/600/400',
    url: 'https://instagram.com/p/12345',
    summary: "Family style coordination trends on social media.",
    category: 'Lifestyle',
    isViral: true,
    publishedAt: '6h ago',
    fetchedAt: '1h ago'
  },
  {
    id: 's2',
    sourceId: '1',
    author: 'Sports Highlights',
    handle: '@sportshighlights',
    content: "Incredible buzzer beater from last night's game. The crowd went absolutely wild! #Basketball #BuzzerBeater",
    imageUrl: 'https://picsum.photos/seed/sports/600/400',
    url: 'https://twitter.com/sports/status/6789',
    summary: "Highlight of the night viral clip.",
    category: 'Sports',
    isViral: false,
    publishedAt: '12h ago',
    fetchedAt: '2h ago'
  },
  {
    id: 's3',
    sourceId: '2',
    author: 'Tech News Daily',
    handle: '@technews',
    content: "The latest smartphone reveal just happened. Is it worth the $1200 price tag? Let us know what you think in the comments! 👇",
    imageUrl: 'https://picsum.photos/seed/tech/600/400',
    url: 'https://facebook.com/tech/posts/1',
    summary: "Tech review of new flagship phone.",
    category: 'Technology',
    isViral: true,
    publishedAt: '1 day ago',
    fetchedAt: '4h ago'
  }
];
