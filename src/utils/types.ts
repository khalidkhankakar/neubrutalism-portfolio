import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  color: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  icon: React.ReactNode;
  color: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface Blog {
  _id: string;
  id: string;
  slug: string;
  title: string;
  content: string;
  image: string;
  description: string;
  tags: { _id: string; name: string }[];
  views?: number;
  upvotes?: number;
  createdAt: string;
  updatedAt: string;
}