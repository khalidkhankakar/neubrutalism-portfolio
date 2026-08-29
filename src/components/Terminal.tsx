'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApp, ThemeColor } from '@/context/AppContext';

interface LogLine {
  id: string;
  type: 'echo' | 'system' | 'output' | 'error';
  html: string;
}

export function Terminal() {
  const router = useRouter();
  const { downloadCV, toggleTheme, setTheme, scrollToSection, copyToClipboard } = useApp();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isTraining, setIsTraining] = useState(false);
  const [lines, setLines] = useState<LogLine[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const addLine = useCallback((html: string, type: 'echo' | 'system' | 'output' | 'error' = 'output') => {
    setLines((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, type, html }]);
  }, []);

  // Initial boot text
  useEffect(() => {
    const bootSequence = [
      { text: 'Last login: just now — from 127.0.0.1 (your browser)', delay: 260 },
      { text: 'khalidkakar.pro — interactive shell v3.2 [Next.js + TypeScript SSR]', delay: 690 },
      {
        text: 'type <span class="text-[var(--acc)]">help</span> to explore · press <span class="text-[var(--acc)]">/</span> anywhere to focus',
        delay: 1120,
      },
    ];

    const timeouts = bootSequence.map((item) =>
      setTimeout(() => {
        addLine(item.text, 'system');
      }, item.delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [addLine]);

  // Scroll to bottom on output change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  // Global hotkey '/' to focus terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        const termElement = document.getElementById('terminal');
        termElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const escapeHtml = (str: string) =>
    str.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c] || c));

  const runHireFlow = useCallback(() => {
    const steps = [
      'checking credentials… <span class="text-[var(--green)]">ok</span>',
      'drafting offer letter… <span class="text-[var(--green)]">ok</span>',
      'allocating compute budget… <span class="text-[var(--green)]">ok</span>',
      '→ khalidkhankakar2468@gmail.com <span class="text-[#666666]">(copied to clipboard)</span>',
    ];
    steps.forEach((s, idx) => {
      setTimeout(() => {
        addLine(s, 'output');
      }, 250 + idx * 350);
    });
    setTimeout(() => {
      copyToClipboard('khalidkhankakar2468@gmail.com', "Email copied — looking forward to connecting!");
    }, 250 + steps.length * 350);
  }, [addLine, copyToClipboard]);

  const printContact = useCallback(() => {
    addLine(`  <span class="text-[var(--acc)] inline-block w-24">email</span><span class="text-[#ececec]">khalidkhankakar2468@gmail.com</span>`);
    addLine(`  <span class="text-[var(--acc)] inline-block w-24">phone</span><span class="text-[#ececec]">+92 370-8218757</span>`);
    addLine(`  <span class="text-[var(--acc)] inline-block w-24">github</span><span class="text-[#ececec]">github.com/khalidkhankakar</span>`);
    addLine(`  <span class="text-[var(--acc)] inline-block w-24">linkedin</span><span class="text-[#ececec]">linkedin.com/in/khalid-khan-kakar1/</span>`);
    addLine(`  <span class="text-[var(--acc)] inline-block w-24">location</span><span class="text-[#ececec]">Islamabad, Pakistan · Remote</span>`);
    addLine(`  <span class="text-[var(--acc)] inline-block w-24">portfolio</span><span class="text-[#ececec]">khalidkakar.pro</span>`);
  }, [addLine]);

  const executeCommand = useCallback(
    (rawCmd: string) => {
      const trimmed = rawCmd.trim();
      addLine(`<span class="text-[#9c9c9c]">visitor@khalidkhan:~$</span> <span class="text-[#ececec] font-bold">${escapeHtml(trimmed)}</span>`, 'echo');

      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);

      const parts = trimmed.split(/\s+/);
      const cmdName = parts[0].toLowerCase();
      const args = parts.slice(1);
      const argStr = args.join(' ').toLowerCase();

      if (cmdName === 'sudo') {
        if (argStr === 'hire me' || argStr === 'hire khalid') {
          addLine('<span class="text-[var(--green)]">permission granted. excellent decision.</span>', 'output');
          runHireFlow();
        } else {
          addLine('visitor is not in the sudoers file. this incident will be reported to Khalid.', 'system');
        }
        return;
      }

      if (cmdName === 'help') {
        addLine('<span class="text-[#ececec] font-semibold">available commands:</span>', 'output');
        const list = [
          ['help', 'list commands'],
          ['whoami', 'who is Khalid Khan'],
          ['projects', 'selected work — jumps to the section'],
          ['stack', 'machine learning & full stack technologies'],
          ['experience', 'professional work history'],
          ['goodies', 'interactive ML playground & engineering sandbox'],
          ['contact', 'email, phone, & social links'],
          ['neofetch', 'system info, portfolio edition'],
          ['train', 'simulate live model training loop'],
          ['theme [name]', 'amber | green | cyan | violet | crimson | orange | mono'],
          ['cv', 'download CV as khalid-khan-cv.txt'],
          ['clear', 'clear terminal history'],
        ];
        list.forEach(([c, desc]) => {
          addLine(`  <span class="text-[var(--acc)] font-mono inline-block w-32">${c}</span><span class="text-[#666666]">— ${desc}</span>`, 'output');
        });
        addLine('…and a few undocumented ones. <span class="text-[#666666]">`ls` is a start.</span>', 'system');
        return;
      }

      if (cmdName === 'whoami') {
        addLine('<span class="text-[#ececec] font-semibold">Khalid Khan — AI Software Engineer | ML Engineer | Full Stack Developer.</span>', 'output');
        addLine('I turn Machine Learning models into production-ready software applications:');
        addLine('Data → ML Model → API → AI System → Frontend → Production.');
        addLine('Currently: <span class="text-[var(--acc)]">ML Engineering Intern @ FlyRank.ai (Remote)</span>.');
        addLine('Status: <span class="text-[var(--green)] font-semibold">Open to AI / ML & Full Stack engineering roles</span>.');
        return;
      }

      if (cmdName === 'projects' || cmdName === 'work') {
        addLine('  <span class="text-[var(--acc)] font-mono">01 PULSEAI    </span>AI healthcare disease prediction + FastAPI + LLMs  <span class="text-[#666666]">2026</span>');
        addLine('  <span class="text-[var(--acc)] font-mono">02 SHIFTTAB   </span>terminal-native AI coding agent (OpenTUI)         <span class="text-[#666666]">2026 (OSS)</span>');
        addLine('  <span class="text-[var(--acc)] font-mono">03 VISIONBOARD</span>real-time collaborative canvas (Liveblocks)       <span class="text-[#666666]">2024-2026</span>');
        addLine('  <span class="text-[var(--acc)] font-mono">04 DEVOVERFLOW</span>modern developer Q&A knowledge platform            <span class="text-[#666666]">2025</span>');
        addLine('  <span class="text-[var(--acc)] font-mono">05 DEVPOST    </span>project showcase & collaboration hub             <span class="text-[#666666]">2025</span>');
        scrollToSection('work');
        return;
      }

      if (cmdName === 'stack') {
        addLine(`  <span class="text-[var(--acc)] inline-block w-24">ml & ai</span>Python · PyTorch · Scikit-learn · XGBoost · Pandas · NumPy · ONNX`);
        addLine(`  <span class="text-[var(--acc)] inline-block w-24">agents</span>AI Agents · AI SDK · OpenTUI · Tool Execution · MCP · Qwen/Gemini`);
        addLine(`  <span class="text-[var(--acc)] inline-block w-24">full stack</span>TypeScript · Next.js · React.js · FastAPI · Node.js · Hono · Tailwind`);
        addLine(`  <span class="text-[var(--acc)] inline-block w-24">db & auth</span>PostgreSQL · Neon DB · Drizzle ORM · MongoDB · Better Auth · Clerk`);
        return;
      }

      if (cmdName === 'experience' || cmdName === 'xp') {
        addLine('  <span class="text-[#666666]">2026–now  </span><span class="text-[#ececec]">ML Engineering Intern · FlyRank.ai (Remote)</span>');
        addLine('  <span class="text-[#666666]">2025      </span><span class="text-[#ececec]">Web Development Intern · Mountain View Tech Park (Onsite)</span>');
        return;
      }

      if (cmdName === 'contact') {
        printContact();
        return;
      }

      if (cmdName === 'neofetch') {
        const art = ['     ▲     ', '    ▲▲▲    ', '   ▲▲ ▲▲   ', '  ▲▲   ▲▲  ', ' ▲▲▲▲▲▲▲▲▲ '];
        const info = [
          ['', 'visitor@khalidkhan'],
          ['', '──────────────────'],
          ['role    ', 'AI Software & ML Engineer'],
          ['models  ', '4 in prod (SVM 90%, XGBoost 85%)'],
          ['agents  ', 'ShiftTab Terminal Copilot'],
          ['stack   ', 'PyTorch · FastAPI · Next.js · TypeScript'],
          ['status  ', 'open to work / hire'],
        ];
        for (let i = 0; i < info.length; i++) {
          const a = (art[i] || ' '.repeat(11)) + '   ';
          const [label, val] = info[i];
          const infoHtml = label
            ? `<span class="text-[#666666]">${label}</span><span class="text-[#ececec] font-medium">${val}</span>`
            : i === 0
            ? `<span class="text-[#ececec] font-bold">${val}</span>`
            : `<span class="text-[#666666]">${val}</span>`;
          addLine(`<span class="text-[var(--acc)] font-mono">${a}</span>${infoHtml}`);
        }
        return;
      }

      if (cmdName === 'train') {
        if (isTraining) {
          addLine('training already in progress — patience is a hyperparameter.', 'system');
          return;
        }
        setIsTraining(true);
        const total = 12;
        let e = 1;
        const bar = (p: number) => '▓'.repeat(Math.round(p * 18)).padEnd(18, '░');

        const nextEpoch = () => {
          if (e > total) {
            addLine('<span class="text-[var(--green)]">done — val_loss 0.0421 · AUROC 0.971 · saved to /models/final.pt</span>');
            addLine('(not a real model. the ones in the work section are.)', 'system');
            setIsTraining(false);
            return;
          }
          const loss = (2.4 * Math.exp(-e / 3.2) + 0.05 + Math.random() * 0.08).toFixed(4);
          const val = (+loss + 0.03 + Math.random() * 0.05).toFixed(4);
          addLine(`epoch ${String(e).padStart(2, '0')}/${total}  loss ${loss}  val ${val}  [${bar(e / total)}]`);
          e++;
          setTimeout(nextEpoch, 130 + Math.random() * 180);
        };
        nextEpoch();
        return;
      }

      if (cmdName === 'theme') {
        const validThemes = ['amber', 'green', 'cyan', 'violet', 'crimson', 'orange', 'mono'];
        const chosen = args[0]?.toLowerCase();
        if (chosen && validThemes.includes(chosen)) {
          setTheme(chosen as ThemeColor);
          addLine(`accent set to <span class="text-[var(--acc)]">${chosen.toUpperCase()} phosphor</span>.`);
        } else if (chosen) {
          addLine(`unknown theme: ${escapeHtml(chosen)}. options: <span class="text-[var(--acc)]">${validThemes.join(' | ')}</span>`, 'error');
        } else {
          toggleTheme();
          addLine('cycled to next phosphor accent palette.');
        }
        return;
      }

      if (cmdName === 'goodies' || cmdName === 'toys' || cmdName === 'tools') {
        addLine('navigating to <span class="text-[var(--acc)]">/goodies</span> — interactive ML engineering sandbox…');
        router.push('/goodies');
        return;
      }

      if (cmdName === 'blogs' || cmdName === 'articles' || cmdName === 'essays') {
        addLine('navigating to <span class="text-[var(--acc)]">/blogs</span> — technical essays & postmortems…');
        router.push('/blogs');
        return;
      }

      if (cmdName === 'cv') {
        addLine('downloading <span class="text-[var(--acc)]">khalid-khan-cv.txt</span> … <span class="text-[var(--green)]">done</span>');
        downloadCV();
        return;
      }

      if (cmdName === 'clear') {
        setLines([]);
        return;
      }

      if (cmdName === 'ls') {
        addLine('work.md  stack.md  experience.md  writing.md  contact.md  <span class="text-[#666666]">.secrets</span>');
        return;
      }

      if (cmdName === 'coffee') {
        addLine(`<span class="text-[#666666]">      ( (
       ) )</span>
<span class="text-[#ececec]">    ┌─────────┐
    │         │─┐
    │         │ │
    │         │─┘
    └─────────┘</span>
<span class="text-[#666666]">      err 418: I'm a teapot. brewing anyway…</span>`);
        return;
      }

      if (cmdName === 'hire') {
        runHireFlow();
        return;
      }

      if (cmdName === 'cat') {
        const file = args[0];
        if (!file) {
          addLine('usage: cat &lt;file&gt; — try <span class="text-[var(--acc)]">ls</span>', 'system');
        } else if (file === 'contact.md') {
          printContact();
        } else if (file === '.secrets') {
          addLine('permission denied. coffee required → try <span class="text-[var(--acc)]">coffee</span>', 'system');
        } else if (file === 'work.md') {
          addLine("that's a directory — try <span class=\"text-[var(--acc)]\">cd work</span>", 'system');
        } else if (file === 'stack.md') {
          addLine("that's a directory — try <span class=\"text-[var(--acc)]\">cd stack</span>", 'system');
        } else {
          addLine(`cat: ${escapeHtml(file)}: no such file`, 'system');
        }
        return;
      }

      if (cmdName === 'cd') {
        const map: Record<string, string> = {
          work: 'work',
          stack: 'stack',
          experience: 'xp',
          xp: 'xp',
          writing: 'writing',
          contact: 'contact',
          '~': 'top',
          home: 'top',
        };
        const target = map[args[0]];
        if (target) {
          scrollToSection(target);
          addLine(`→ jumping to #${target}…`, 'system');
        } else {
          addLine(`cd: ${escapeHtml(args[0] || '')}: no such directory`, 'system');
        }
        return;
      }

      addLine(`bash: ${escapeHtml(cmdName)}: command not found — try <span class="text-[var(--acc)]">help</span>`, 'error');
    },
    [addLine, downloadCV, isTraining, printContact, router, runHireFlow, scrollToSection, setTheme, toggleTheme]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = inputVal;
      setInputVal('');
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      } else {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const handleContainerClick = () => {
    if (!window.getSelection()?.toString()) {
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <div
      id="terminal"
      onClick={handleContainerClick}
      className="bg-[#0a0a0a] flex flex-col min-w-0 border border-[#1d1d1d] select-text shadow-xl"
    >
      {/* Titlebar */}
      <div className="flex items-center gap-3 px-3.5 py-2 border-b border-[#1d1d1d] bg-[#0e0e0e] font-mono text-[11px] text-[#666666]">
        <span className="text-[var(--acc)] border border-[var(--acc)] px-1.5 py-0.2 text-[9px] tracking-[0.14em] uppercase font-bold">
          BASH
        </span>
        <span className="tracking-[0.06em] truncate">visitor@khalidkhan.pro — interactive shell</span>
        <span className="ml-auto text-[10px] tracking-[0.1em] text-[#666666]">80×24</span>
      </div>

      {/* Terminal Body */}
      <div
        ref={bodyRef}
        className="relative flex-1 h-[352px] overflow-y-auto p-4 font-mono text-[13px] leading-[1.75] bg-[#0a0a0a] text-[#9c9c9c]"
      >
        {/* CRT Scanline Effect */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.02)_0_1px,transparent_1px_3px)]"
        />

        {/* Output lines */}
        <div className="space-y-1 relative z-10">
          {lines.map((line) => (
            <div
              key={line.id}
              className="break-words whitespace-pre-wrap animate-in fade-in duration-200"
              dangerouslySetInnerHTML={{ __html: line.html }}
            />
          ))}
        </div>

        {/* Input prompt line */}
        <div className="flex items-baseline gap-2 mt-1 relative z-10">
          <span className="text-[#9c9c9c] shrink-0 font-mono text-[13px]">visitor@khalidkhan:~$</span>
          <input
            ref={inputRef}
            id="termInput"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="terminal input"
            className="flex-1 min-w-[40px] bg-transparent border-none outline-none text-[#ececec] font-mono text-[13px] caret-[var(--acc)] focus:ring-0 p-0"
          />
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2 px-3.5 py-2.5 border-t border-[#1d1d1d] font-mono text-[11px] text-[#666666] bg-[#0e0e0e]">
        <span>try:</span>
        {['help', 'whoami', 'projects', 'neofetch', 'train', 'coffee'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmd);
              inputRef.current?.focus({ preventScroll: true });
            }}
            className="border border-[#2c2c2c] text-[#9c9c9c] font-mono text-[10.5px] px-2 py-0.5 hover:border-[var(--acc)] hover:text-[var(--acc)] transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
