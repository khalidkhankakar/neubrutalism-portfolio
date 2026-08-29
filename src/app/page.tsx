import React from 'react';
import { getPortfolioData } from '@/lib/data';
import { getAllBlogs as getDbBlogs } from '@/actions/blog.actions';
import { formatDate } from '@/utils/date';
import { Article, Blog, BlogTag } from '@/lib/types';
import { HeaderNav } from '@/components/HeaderNav';
import { Hero } from '@/components/Hero';
import { TechTicker } from '@/components/TechTicker';
import { StatsStrip } from '@/components/StatsStrip';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { SelectedWorkSection } from '@/components/SelectedWorkSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { QuotesSection } from '@/components/QuotesSection';
import { WritingSection } from '@/components/WritingSection';
import { GoodiesTeaser } from '@/components/GoodiesTeaser';
import { ContactFooter } from '@/components/ContactFooter';

export const revalidate = 60; // ISR / Cache revalidation

export default async function HomePage() {
  // Server-side data fetching for optimal SEO & render performance
  const data = await getPortfolioData();

  let liveArticles: Article[] = [];
  try {
    const dbResult = await getDbBlogs();
    if (dbResult?.success && Array.isArray(dbResult.data) && dbResult.data.length > 0) {
      liveArticles = dbResult.data.map((blog: Blog, idx: number) => {
        const tagNames: string[] = [];
        if (Array.isArray(blog.tags)) {
          blog.tags.forEach((t) => {
            if (typeof t === 'string') tagNames.push(t);
            else if (t && typeof t === 'object' && 'name' in t) tagNames.push((t as BlogTag).name);
          });
        }

        return {
          id: blog._id || `blog-${idx}`,
          slug: blog.slug,
          title: blog.title,
          description: blog.description,
          summary: blog.description,
          date: formatDate(blog.createdAt),
          readTime: blog.readTime || '5 min read',
          tags: tagNames.length > 0 ? tagNames : ['ENGINEERING', 'SYSTEMS'],
          coverImage: blog.image || null,
          author: {
            name: data.bio.name,
            role: 'AI Software Engineer | ML Engineer',
            avatar: '/pics/khalid-kakar-1.jpeg',
            bio: data.bio.subheadline,
            github: data.bio.github,
            twitter: data.bio.twitter,
            linkedin: data.bio.linkedin,
          },
        };
      });
    }
  } catch {
    liveArticles = [];
  }

  // Use live database articles if available, otherwise fallback to portfolio articles
  const articlesToRender = liveArticles.length > 0 ? liveArticles : data.articles;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ececec] selection:bg-[var(--acc)] selection:text-black">
      <HeaderNav />
      <main id="mainContent">
        <Hero bio={data.bio} />
        <TechTicker keywords={data.tickerKeywords} />
        <StatsStrip stats={data.stats} />
        <CapabilitiesSection capabilities={data.capabilities} />
        <SelectedWorkSection projects={data.projects} />
        <TechStackSection categories={data.stackCategories} />
        <ExperienceSection experience={data.experience} />
        <QuotesSection quotes={data.quotes} />
        <WritingSection articles={articlesToRender} />
        <GoodiesTeaser />
      </main>
      <ContactFooter bio={data.bio} />
    </div>
  );
}
