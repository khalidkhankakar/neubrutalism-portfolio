'use client';

import React, { useState, useMemo } from 'react';
import { Layers, Copy, Check, Sparkles, Hash, FileText, Cpu, RefreshCw, Terminal } from 'lucide-react';
import { useApp } from '@/context/AppContext';

type TokenizerType = 'gpt4' | 'llama3' | 'bert' | 'bytes' | 'words';

interface TokenItem {
  id: number;
  text: string;
  start: number;
  end: number;
  bytes: number[];
  colorIndex: number;
}

const PRESETS = [
  {
    name: 'Standard Prompt',
    text: 'Explain how FlashAttention-2 reduces HBM memory access during online softmax calculation.',
  },
  {
    name: 'Python Code',
    text: 'def forward(self, q, k, v):\n    return flash_attn_func(q, k, v, causal=True)',
  },
  {
    name: 'JSON Payload',
    text: '{"model": "llama-3-70b", "temperature": 0.2, "stream": true, "max_tokens": 512}',
  },
  {
    name: 'Multilingual',
    text: '機械学習エンジニア (Machine Learning Engineer) — 42 models shipped.',
  },
];

// Deterministic mock tokenization algorithms for visual demonstration
function simulateTokenize(input: string, mode: TokenizerType): TokenItem[] {
  if (!input) return [];

  const tokens: TokenItem[] = [];
  let offset = 0;

  // Simple string to uint32 hash for token ID simulation
  const hashString = (str: string, seed = 0): number => {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h % 98000) + 100;
  };

  if (mode === 'bytes') {
    // Character / Byte level
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      const charCode = ch.charCodeAt(0);
      tokens.push({
        id: charCode,
        text: ch,
        start: offset,
        end: offset + 1,
        bytes: [charCode],
        colorIndex: i % 8,
      });
      offset += 1;
    }
    return tokens;
  }

  if (mode === 'words') {
    // Regex whitespace / word boundary
    const matches = input.match(/\w+|\s+|[^\w\s]+/g) || [input];
    matches.forEach((chunk, i) => {
      tokens.push({
        id: hashString(chunk, 101),
        text: chunk,
        start: offset,
        end: offset + chunk.length,
        bytes: Array.from(new TextEncoder().encode(chunk)),
        colorIndex: i % 8,
      });
      offset += chunk.length;
    });
    return tokens;
  }

  if (mode === 'bert') {
    // WordPiece simulation (prefixes with ##)
    const words = input.split(/(\s+|[.,!?;:()[\]{}"])/);
    let colorCount = 0;

    words.forEach((word) => {
      if (!word) return;
      if (/^\s+$/.test(word) || /^[.,!?;:()[\]{}"]$/.test(word)) {
        tokens.push({
          id: hashString(word, 202),
          text: word,
          start: offset,
          end: offset + word.length,
          bytes: Array.from(new TextEncoder().encode(word)),
          colorIndex: colorCount++ % 8,
        });
        offset += word.length;
        return;
      }

      // Break long words into subwords
      if (word.length > 5 && !/^\d+$/.test(word)) {
        const p1 = word.slice(0, Math.ceil(word.length / 2));
        const p2 = '##' + word.slice(Math.ceil(word.length / 2));

        tokens.push({
          id: hashString(p1, 303),
          text: p1,
          start: offset,
          end: offset + p1.length,
          bytes: Array.from(new TextEncoder().encode(p1)),
          colorIndex: colorCount++ % 8,
        });
        offset += p1.length;

        tokens.push({
          id: hashString(p2, 404),
          text: p2,
          start: offset,
          end: offset + word.length - p1.length,
          bytes: Array.from(new TextEncoder().encode(p2)),
          colorIndex: colorCount++ % 8,
        });
        offset += word.length - p1.length;
      } else {
        tokens.push({
          id: hashString(word, 505),
          text: word,
          start: offset,
          end: offset + word.length,
          bytes: Array.from(new TextEncoder().encode(word)),
          colorIndex: colorCount++ % 8,
        });
        offset += word.length;
      }
    });
    return tokens;
  }

  // GPT-4 (cl100k_base) and Llama 3 (128k) BPE Subword tokenizer simulation
  // Pattern roughly matching GPT-4 tokenizer regex: letters, contractions, numbers, punctuation, spaces
  const regex = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
  const rawMatches = input.match(regex) || [input];
  let colorCount = 0;

  rawMatches.forEach((m) => {
    // Further subword split for rare/long compounds
    if (m.length > 7 && !m.startsWith(' ')) {
      const splitAt = Math.floor(m.length / 2);
      const piece1 = m.slice(0, splitAt);
      const piece2 = m.slice(splitAt);

      tokens.push({
        id: hashString(piece1, mode === 'llama3' ? 128000 : 100000),
        text: piece1,
        start: offset,
        end: offset + piece1.length,
        bytes: Array.from(new TextEncoder().encode(piece1)),
        colorIndex: colorCount++ % 8,
      });
      offset += piece1.length;

      tokens.push({
        id: hashString(piece2, mode === 'llama3' ? 128000 : 100000),
        text: piece2,
        start: offset,
        end: offset + piece2.length,
        bytes: Array.from(new TextEncoder().encode(piece2)),
        colorIndex: colorCount++ % 8,
      });
      offset += piece2.length;
    } else {
      tokens.push({
        id: hashString(m, mode === 'llama3' ? 128000 : 100000),
        text: m,
        start: offset,
        end: offset + m.length,
        bytes: Array.from(new TextEncoder().encode(m)),
        colorIndex: colorCount++ % 8,
      });
      offset += m.length;
    }
  });

  return tokens;
}

// Token background tint classes
const TOKEN_COLORS = [
  'bg-amber-500/15 border-amber-500/30 text-amber-200 hover:bg-amber-500/25',
  'bg-emerald-500/15 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/25',
  'bg-cyan-500/15 border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/25',
  'bg-purple-500/15 border-purple-500/30 text-purple-200 hover:bg-purple-500/25',
  'bg-rose-500/15 border-rose-500/30 text-rose-200 hover:bg-rose-500/25',
  'bg-blue-500/15 border-blue-500/30 text-blue-200 hover:bg-blue-500/25',
  'bg-orange-500/15 border-orange-500/30 text-orange-200 hover:bg-orange-500/25',
  'bg-lime-500/15 border-lime-500/30 text-lime-200 hover:bg-lime-500/25',
];

export function TokenVisualizer() {
  const { copyToClipboard } = useApp();
  const [inputText, setInputText] = useState<string>(PRESETS[0].text);
  const [tokenizer, setTokenizer] = useState<TokenizerType>('gpt4');
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const tokens = useMemo(() => simulateTokenize(inputText, tokenizer), [inputText, tokenizer]);

  const charCount = inputText.length;
  const tokenCount = tokens.length;
  const charPerToken = tokenCount > 0 ? (charCount / tokenCount).toFixed(2) : '0';
  const byteCount = new TextEncoder().encode(inputText).length;

  const selectedToken = selectedTokenIdx !== null && tokens[selectedTokenIdx] ? tokens[selectedTokenIdx] : null;

  const handleCopyIds = async () => {
    const ids = tokens.map((t) => t.id);
    await copyToClipboard(JSON.stringify(ids), 'Copied Token IDs to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#1d1d1d] bg-[#0e0e0e] p-6 lg:p-8 ticks">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1d1d1d]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[var(--acc)]/40 bg-[var(--acc)]/10 flex items-center justify-center text-[var(--acc)]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-[#ececec] uppercase tracking-[0.1em] flex items-center gap-2">
              Multi-Model Tokenizer & Subword Visualizer
              <span className="text-[10px] text-[var(--acc)] bg-[var(--acc)]/10 px-1.5 py-0.5 border border-[var(--acc)]/20">
                LIVE PARSER
              </span>
            </h3>
            <p className="text-xs text-[#9c9c9c] font-mono mt-0.5">
              Inspect how LLMs split text, code, and unicode into subword token IDs across different architectures.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyIds}
            className="flex items-center gap-1.5 text-xs font-mono text-[#9c9c9c] hover:text-[#ececec] border border-[#1d1d1d] px-3 py-1.5 bg-[#121212] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--green)]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED IDS' : 'EXPORT TOKEN IDS'}</span>
          </button>
        </div>
      </div>

      {/* Model Selection & Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-6">
        {/* Tokenizer engine selector */}
        <div className="lg:col-span-6 flex flex-col gap-2">
          <label className="text-[11px] font-mono text-[#9c9c9c] uppercase tracking-wider">
            1. Tokenizer Model Architecture:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-xs">
            {[
              { id: 'gpt4', label: 'GPT-4o (cl100k)', desc: '100k vocab' },
              { id: 'llama3', label: 'Llama-3 (tiktoken)', desc: '128k vocab' },
              { id: 'bert', label: 'BERT (WordPiece)', desc: '30k vocab' },
              { id: 'words', label: 'Whitespace Split', desc: 'Rule-based' },
              { id: 'bytes', label: 'Raw Byte / Char', desc: 'UTF-8 bytes' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setTokenizer(m.id as TokenizerType);
                  setSelectedTokenIdx(null);
                }}
                className={`p-2 text-left border transition-all ${
                  tokenizer === m.id
                    ? 'border-[var(--acc)] bg-[var(--acc)]/10 text-white font-bold'
                    : 'border-[#1d1d1d] bg-[#121212] text-[#9c9c9c] hover:border-[#2c2c2c]'
                }`}
              >
                <div className="truncate">{m.label}</div>
                <div className="text-[10px] text-[#666666] font-normal">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preset quick buttons */}
        <div className="lg:col-span-6 flex flex-col gap-2">
          <label className="text-[11px] font-mono text-[#9c9c9c] uppercase tracking-wider">
            2. Sample Prompt Payloads:
          </label>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setInputText(p.text);
                  setSelectedTokenIdx(null);
                }}
                className="p-2 text-left border border-[#1d1d1d] bg-[#121212] text-[#9c9c9c] hover:text-white hover:border-[#2c2c2c] transition-colors"
              >
                <div className="font-bold text-[#ececec]">{p.name}</div>
                <div className="text-[10px] text-[#666666] truncate">{p.text}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input textarea */}
      <div className="mt-4 pt-4 border-t border-[#1d1d1d]">
        <label className="block text-[11px] font-mono text-[#9c9c9c] uppercase tracking-wider mb-2">
          Input Prompt / Code / Corpus:
        </label>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setSelectedTokenIdx(null);
          }}
          placeholder="Type or paste any text, prompt, code snippet, or unicode..."
          className="w-full p-3 bg-[#080808] border border-[#1d1d1d] text-xs sm:text-sm font-mono text-white focus:border-[var(--acc)] focus:outline-none leading-relaxed resize-y"
        />
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 font-mono text-xs">
        <div className="border border-[#1d1d1d] bg-[#121212] p-3">
          <div className="text-[10px] text-[#666666] uppercase">TOKEN COUNT</div>
          <div className="text-xl font-bold text-[var(--acc)] mt-0.5">{tokenCount}</div>
        </div>
        <div className="border border-[#1d1d1d] bg-[#121212] p-3">
          <div className="text-[10px] text-[#666666] uppercase">CHAR COUNT</div>
          <div className="text-xl font-bold text-white mt-0.5">{charCount}</div>
        </div>
        <div className="border border-[#1d1d1d] bg-[#121212] p-3">
          <div className="text-[10px] text-[#666666] uppercase">CHARS / TOKEN</div>
          <div className="text-xl font-bold text-[var(--green)] mt-0.5">{charPerToken}</div>
        </div>
        <div className="border border-[#1d1d1d] bg-[#121212] p-3">
          <div className="text-[10px] text-[#666666] uppercase">UTF-8 BYTES</div>
          <div className="text-xl font-bold text-[#ececec] mt-0.5">{byteCount} B</div>
        </div>
      </div>

      {/* Visual Token Chips Area */}
      <div className="mt-6 pt-6 border-t border-[#1d1d1d]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-[#9c9c9c] uppercase tracking-wider">
            Tokenized Representation (Click any token to inspect metadata):
          </span>
          <span className="text-[10px] font-mono text-[#666666]">
            [TOTAL: {tokenCount} TOKENS]
          </span>
        </div>

        <div className="p-4 bg-[#080808] border border-[#1d1d1d] min-h-[120px] font-mono text-xs sm:text-sm leading-loose break-words select-text">
          {tokens.length === 0 ? (
            <span className="text-[#666666] italic">Enter text above to inspect tokens...</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {tokens.map((tok, idx) => {
                const isSelected = selectedTokenIdx === idx;
                const colorClass = TOKEN_COLORS[tok.colorIndex];
                const displayStr = tok.text
                  .replace(/ /g, '␣')
                  .replace(/\n/g, '↵\n')
                  .replace(/\t/g, '⇥');

                return (
                  <button
                    key={`${tok.start}-${idx}`}
                    onClick={() => setSelectedTokenIdx(idx)}
                    title={`Token #${idx + 1} | ID: ${tok.id} | Chars: ${tok.text.length}`}
                    className={`inline-flex items-center px-1.5 py-0.5 rounded-none border text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[var(--acc)] bg-[var(--acc)] text-black font-bold border-white scale-105'
                        : colorClass
                    }`}
                  >
                    <span className="whitespace-pre">{displayStr}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Token Inspector Drawer / Footer */}
      {selectedToken && (
        <div className="mt-4 p-4 bg-[#121212] border border-[var(--acc)]/40 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[var(--acc)] font-bold uppercase tracking-wider">
                INSPECTED TOKEN #{selectedTokenIdx! + 1}:
              </span>
              <span className="bg-[#1d1d1d] px-2 py-0.5 text-white font-bold">
                &ldquo;{selectedToken.text.replace(/ /g, '␣').replace(/\n/g, '\\n')}&rdquo;
              </span>
            </div>
            <button
              onClick={() => setSelectedTokenIdx(null)}
              className="text-[#666666] hover:text-white text-[11px]"
            >
              [DISMISS]
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-[11px]">
            <div>
              <span className="text-[#666666] block">TOKEN ID</span>
              <span className="text-[var(--acc)] font-bold text-sm">#{selectedToken.id}</span>
            </div>
            <div>
              <span className="text-[#666666] block">CHARACTER SPAN</span>
              <span className="text-white font-bold">
                [{selectedToken.start}..{selectedToken.end}] ({selectedToken.text.length} chars)
              </span>
            </div>
            <div>
              <span className="text-[#666666] block">UTF-8 BYTES</span>
              <span className="text-[#9c9c9c] font-mono">
                {selectedToken.bytes.map((b) => `0x${b.toString(16).toUpperCase()}`).join(' ')}
              </span>
            </div>
            <div>
              <span className="text-[#666666] block">SPECIAL / CONTROL</span>
              <span className="text-[var(--green)]">
                {/^\s+$/.test(selectedToken.text) ? 'WHITESPACE' : 'REGULAR SUBWORD'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
