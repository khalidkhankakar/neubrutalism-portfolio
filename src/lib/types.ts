import type { ReactNode } from 'react';

export interface Capability {
  id: string;
  idx: string;
  iconName: 'Server' | 'Database' | 'Gauge' | 'Layers' | 'FlaskConical' | 'GitBranch';
  title: string;
  description: string;
  footer: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  idx: string;
  name: string;
  tagline: string;
  tags: string;
  year: string;
  isOss?: boolean;
  summary: string;
  architecture?: string;
  metrics: Metric[];
  role: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface StackItem {
  name: string;
  meta: string;
}

export interface StackCategory {
  title: string;
  count: string;
  items: StackItem[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies?: string[];
  type?: 'Remote' | 'Onsite' | 'Hybrid';
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  title: string;
  isBig?: boolean;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Article {
  id: string;
  slug?: string;
  date: string;
  title: string;
  readTime: string;
  summary: string;
  description?: string;
  tags: string | string[];
  coverImage?: string | null;
  author?: BlogAuthor | null;
  content?: string;
  views?: number;
  upvotes?: number;
}

export interface StatItem {
  tag: string;
  count: number;
  decimals?: number;
  suffix?: string;
  label: string;
  subtitle: string;
}

export interface PortfolioData {
  bio: {
    name: string;
    role: string;
    positioning: string;
    location: string;
    headline: string;
    subheadline: string;
    philosophy: string;
    experienceYears: number;
    modelsShipped: number;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    twitter: string;
    scholar?: string;
    portfolioUrl: string;
  };
  stats: StatItem[];
  capabilities: Capability[];
  projects: Project[];
  stackCategories: StackCategory[];
  experience: ExperienceItem[];
  quotes: Quote[];
  articles: Article[];
  tickerKeywords: string[];
}

export interface BlogTag {
  _id: string;
  name: string;
}

export interface Blog {
  _id: string;
  id?: string;
  slug: string;
  title: string;
  content: string;
  image?: string;
  description: string;
  tags?: BlogTag[] | string[];
  views?: number;
  upvotes?: number;
  author?: string;
  readTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: ReactNode;
  color?: string;
}