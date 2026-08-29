'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Check, Copy, Terminal } from 'lucide-react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import { useApp } from '@/context/AppContext';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('jsx', xml);
hljs.registerLanguage('css', css);

interface BlogMarkdownRendererProps {
  content: string;
}

const decodeHtmlEntities = (value: string): string => {
  if (typeof document === 'undefined') {
    return value
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
};

export function BlogMarkdownRenderer({ content }: BlogMarkdownRendererProps) {
  const { copyToClipboard: copyContext } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const normalizeCodeText = (value: React.ReactNode): string => {
    if (Array.isArray(value)) {
      return value.map((item) => normalizeCodeText(item)).join('');
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return decodeHtmlEntities(String(value));
    }

    if (value == null || typeof value === 'boolean') {
      return '';
    }

    if (React.isValidElement(value)) {
      return normalizeCodeText((value.props as { children?: React.ReactNode }).children);
    }

    if (typeof value === 'object') {
      return '';
    }

    return String(value);
  };

  const renderHighlightedCode = (code: string, language: string) => {
    const safeLanguage = language.toLowerCase();
    const validLanguage = hljs.getLanguage(safeLanguage) ? safeLanguage : null;

    if (!validLanguage) {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    try {
      return hljs.highlight(code, { language: validLanguage }).value;
    } catch {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await copyContext(text, 'Code snippet copied to clipboard');
    setCopiedCode(id);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="blog-markdown-content text-[#cccccc] leading-[1.8] text-base sm:text-[17px] space-y-6">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase mt-12 mb-6 pb-3 border-b border-[#222222] flex items-center gap-2.5">
              <span className="font-mono text-xs text-[var(--acc)] font-normal">#</span>
              <span>{children}</span>
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight uppercase mt-10 mb-4 pb-2 border-b border-[#1f1f1f] flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--acc)] font-normal">##</span>
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-sans font-semibold text-lg sm:text-xl text-[#ececec] uppercase mt-8 mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--acc)]">###</span>
              <span>{children}</span>
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-4 text-[#bfbfbf] leading-[1.8] text-base sm:text-[17px]">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-[#ececec] italic font-serif">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-5 space-y-2.5 pl-6 list-none">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-5 space-y-2.5 pl-6 list-decimal marker:text-[var(--acc)] marker:font-mono">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="relative text-[#b3b3b3] pl-2 before:content-['▸'] before:absolute before:-left-4 before:text-[var(--acc)] before:font-mono">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-[var(--acc)] bg-[#111111] px-5 py-3 text-[#d6d6d6] italic font-serif">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = normalizeCodeText(children).replace(/\n$/, '');
            const isInline = !match && !codeString.includes('\n');

            if (isInline) {
              return (
                <code
                  className="font-mono text-[13px] text-[var(--acc)] bg-[#161616] border border-[#2a2a2a] px-1.5 py-0.5 mx-0.5 rounded-none font-medium"
                  {...props}
                >
                  {codeString}
                </code>
              );
            }

            const language = match ? match[1] : 'code';
            const codeId = `${language}-${codeString.slice(0, 15)}`;
            const isCopied = copiedCode === codeId;
            const highlightedHtml = renderHighlightedCode(codeString, language);

            return (
              <div className="my-6 border border-[#222222] bg-[#0c0c0c] overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-[#222222] text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-[#888888]">
                    <Terminal className="w-3.5 h-3.5 text-[var(--acc)]" />
                    <span className="uppercase text-[var(--acc)] font-bold">{language}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(codeString, codeId)}
                    className="flex items-center gap-1.5 text-[#888888] hover:text-[var(--acc)] transition-colors cursor-pointer px-2 py-0.5 border border-transparent hover:border-[#333333]"
                    title="Copy code to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-[var(--green)]" />
                        <span className="text-[var(--green)]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#e0e0e0] scrollbar-thin">
                  <pre className="!bg-transparent !p-0 !m-0 overflow-x-auto">
                    <code
                      className="hljs block whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                    />
                  </pre>
                </div>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto border border-[#222222]">
              <table className="w-full text-left text-xs font-mono">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#161616] text-[var(--acc)] border-b border-[#222222] uppercase tracking-wider">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-[#1c1c1c] bg-[#0e0e0e]">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-[#141414] transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold text-xs text-[#ffffff] border-r border-[#222222] last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-[#b3b3b3] border-r border-[#222222] last:border-r-0">
              {children}
            </td>
          ),
          hr: () => (
            <div className="my-10 border-t border-[#222222] relative flex justify-center">
              <span className="bg-[#0a0a0a] px-3 -mt-2.5 text-[10px] font-mono text-[#555555] tracking-widest uppercase">
                § § §
              </span>
            </div>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
