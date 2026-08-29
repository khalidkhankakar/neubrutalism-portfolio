'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { Search, Tag, ArrowRight, BookOpen, Clock, Calendar, User } from 'lucide-react';

interface BlogsListClientProps {
  initialBlogs: Article[];
  bio: {
    name: string;
    role: string;
  };
}

export function BlogsListClient({ initialBlogs, bio }: BlogsListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  // Normalize and extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    
    initialBlogs.forEach((blog) => {
      if (!blog.tags) return;
      
      if (Array.isArray(blog.tags)) {
        blog.tags.forEach((t: string) => {
          if (t && typeof t === 'string') {
            tagSet.add(t.trim().toUpperCase());
          }
        });
      } else if (typeof blog.tags === 'string') {
        blog.tags.split('·').forEach((t: string) => {
          const trimmed = t.trim();
          if (trimmed) {
            tagSet.add(trimmed.toUpperCase());
          }
        });
      }
    });
    
    return ['ALL', ...Array.from(tagSet).sort()];
  }, [initialBlogs]);

  // Filter blogs based on search and selected tag
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      // Normalize blog tags
      const blogTags: string[] = [];
      
      if (blog.tags) {
        if (Array.isArray(blog.tags)) {
          blog.tags.forEach((t: string) => {
            if (t && typeof t === 'string') {
              blogTags.push(t.trim().toUpperCase());
            }
          });
        } else if (typeof blog.tags === 'string') {
          blog.tags.split('·').forEach((t: string) => {
            const trimmed = t.trim();
            if (trimmed) {
              blogTags.push(trimmed.toUpperCase());
            }
          });
        }
      }

      // Check tag filter
      const matchesTag = selectedTag === 'ALL' || blogTags.includes(selectedTag);

      // Check search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (blog.title && blog.title.toLowerCase().includes(query)) ||
        (blog.summary && blog.summary.toLowerCase().includes(query)) ||
        (blog.description && blog.description.toLowerCase().includes(query)) ||
        blogTags.some((t: string) => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [initialBlogs, selectedTag, searchQuery]);

  return (
    <div className="py-8 space-y-8">
      {/* Controls Bar: Search + Tag Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666666]" />
            <input
              type="text"
              placeholder="Search essays by keyword, topic, or system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#222222] focus:border-[var(--acc)] focus:outline-none pl-10 pr-4 py-2.5 text-xs font-mono text-[#ececec] placeholder-[#666666] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#666666] hover:text-[var(--acc)] transition-colors"
                aria-label="Clear search"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Results count info */}
          <div className="font-mono text-xs text-[#666666] flex items-center gap-2 self-end md:self-auto whitespace-nowrap">
            <span>SHOWING {filteredBlogs.length} OF {initialBlogs.length} ESSAYS</span>
          </div>
        </div>

        {/* Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#666666] pr-2 shrink-0">
            <Tag className="w-3 h-3 text-[var(--acc)]" />
            <span>TOPIC:</span>
          </div>
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-[11px] font-mono whitespace-nowrap transition-all border rounded-none ${
                  isSelected
                    ? 'bg-[var(--acc)] text-black font-bold border-[var(--acc)]'
                    : 'bg-[#121212] text-[#9c9c9c] border-[#222222] hover:border-[#444444] hover:text-[#ececec]'
                }`}
                aria-pressed={isSelected}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blogs Listing Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="border border-[#222222] bg-[#0e0e0e] p-12 text-center space-y-4">
          <p className="font-mono text-sm text-[var(--acc)]">NO_MATCHING_ESSAYS_FOUND</p>
          <p className="text-xs text-[#666666] max-w-md mx-auto">
            No articles match your search query &quot;{searchQuery}&quot; and tag &quot;{selectedTag}&quot;. Try resetting the filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('ALL');
            }}
            className="px-4 py-2 font-mono text-xs font-bold bg-[#181818] border border-[#2c2c2c] text-[#ececec] hover:border-[var(--acc)] hover:text-[var(--acc)] transition-colors"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBlogs.map((blog, idx) => {
            const blogSlug = blog.slug || blog.id;
            const blogTags: string[] = [];

            if (blog.tags) {
              if (Array.isArray(blog.tags)) {
                blog.tags.forEach((t: string) => {
                  if (t && typeof t === 'string') {
                    blogTags.push(t.trim());
                  }
                });
              } else if (typeof blog.tags === 'string') {
                blog.tags.split('·').forEach((t: string) => {
                  const trimmed = t.trim();
                  if (trimmed) {
                    blogTags.push(trimmed);
                  }
                });
              }
            }

            return (
              <article
                key={blog.id}
                className="group border border-[#1d1d1d] hover:border-[var(--acc)] bg-[#0e0e0e] transition-all duration-300 relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 p-5 sm:p-7">
                  {/* Cover Image Thumbnail */}
                  {blog.coverImage && (
                    <div className="relative aspect-[16/10] lg:aspect-auto h-48 lg:h-full overflow-hidden border border-[#222222] bg-[#141414]">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title || 'Article cover'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 1024px) 100vw, 340px"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2.5 left-2.5 font-mono text-[9px] font-bold px-2 py-0.5 bg-black/85 border border-[#2c2c2c] text-[var(--acc)]">
                        REPORT_#{String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                  )}

                  {/* Blog Content Info */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Meta Header */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#666666]">
                        {blog.date && (
                          <>
                            <span className="flex items-center gap-1 text-[var(--acc)]">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{blog.date}</span>
                            </span>
                            <span>·</span>
                          </>
                        )}
                        {blog.readTime && (
                          <>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{blog.readTime}</span>
                            </span>
                            <span>·</span>
                          </>
                        )}
                        <span className="flex items-center gap-1 text-[#888888]">
                          <User className="w-3.5 h-3.5" />
                          <span>{blog.author?.name || bio.name}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-white group-hover:text-[var(--acc)] transition-colors leading-snug">
                        <Link href={`/blogs/${blogSlug}`} className="focus:outline-none hover:underline">
                          {blog.title || 'Untitled'}
                        </Link>
                      </h2>

                      {/* Description */}
                      <p className="text-[#9c9c9c] text-sm sm:text-[0.92rem] leading-relaxed line-clamp-3">
                        {blog.description || blog.summary || 'No description available'}
                      </p>
                    </div>

                    {/* Footer: Tags + CTA */}
                    <div className="pt-3 border-t border-[#1d1d1d] flex flex-wrap items-center justify-between gap-4">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {blogTags.length > 0 ? (
                          blogTags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="font-mono text-[10px] tracking-wider px-2 py-0.5 bg-[#141414] border border-[#262626] text-[#888888] group-hover:text-[#b0b0b0]"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="font-mono text-[10px] text-[#444444]">No tags</span>
                        )}
                      </div>

                      {/* Read Button */}
                      <Link
                        href={`/blogs/${blogSlug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-black bg-[var(--acc)] hover:bg-white px-3.5 py-1.5 transition-colors shrink-0"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>READ ESSAY</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}