'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Database, Terminal, Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface QueryResult {
  command: string;
  output: string;
  isError?: boolean;
}

const INITIAL_HISTORY: QueryResult[] = [
  {
    command: 'SELECT * FROM projects;',
    output: ` id | name       | category 
----+------------+-----------
 01 | Pulse AI   | ML       
 02 | ShiftTab   | AI       
 03 | MNIST      | CV       
(3 rows)`,
  },
];

export function PostgresTerminal() {
  const { copyToClipboard } = useApp();
  const [history, setHistory] = useState<QueryResult[]>(INITIAL_HISTORY);
  const [inputVal, setInputVal] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>(['SELECT * FROM projects;']);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeSql = (rawQuery: string) => {
    const trimmed = rawQuery.trim();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const query = trimmed.replace(/;$/, '').trim().toLowerCase();

    let output = '';
    let isError = false;

    if (query === 'select * from projects' || query === 'select * from projects;') {
      output = ` id | name       | category 
----+------------+-----------
 01 | Pulse AI   | ML       
 02 | ShiftTab   | AI       
 03 | MNIST      | CV       
(3 rows)`;
    } else if (query.startsWith('select * from experience') || query.startsWith('select * from roles')) {
      output = ` company   | role                     | period         | status 
-----------+--------------------------+----------------+--------
 Scale AI  | Staff ML Systems Eng     | 2023 - PRESENT | ACTIVE 
 Meta AI   | Senior Research Eng (CV) | 2021 - 2023    | COMPL  
 Uber ATG  | Autonomous Driving ML    | 2018 - 2021    | COMPL  
(3 rows)`;
    } else if (query.startsWith('select * from metrics') || query.startsWith('select * from stats')) {
      output = ` metric               | value    | unit  | p99_sla 
---------------------+----------+-------+---------
 Daily Inferences    | 3.10     | B     | 40ms    
 Models in Prod      | 42       | count | PASS    
 GPU Cluster Uptime  | 99.98    | %     | PASS    
 Days Since Incident | 263      | days  | PASS    
(4 rows)`;
    } else if (query.startsWith('select * from bio') || query.startsWith('select * from engineer')) {
      output = ` name      | title                     | location          | models_shipped 
-----------+---------------------------+-------------------+----------------
 Alex Chen | Machine Learning Engineer | San Francisco, CA | 42             
(1 row)`;
    } else if (query.startsWith('select * from skills') || query.startsWith('select * from stack')) {
      output = ` category | technologies                                  
----------+------------------------------------------------
 ML/DL    | PyTorch, Triton, FlashAttention-2, CUDA, vLLM  
 Serving  | Triton Server, Ray Serve, TensorRT-LLM, K8s    
 Data     | Apache Arrow, Ray Data, DuckDB, PostgreSQL     
(3 rows)`;
    } else if (query.startsWith('explain analyze select * from projects') || query.startsWith('explain')) {
      output = `                                                  QUERY PLAN                                                  
---------------------------------------------------------------------------------------------------------------
 Seq Scan on projects  (cost=0.00..1.03 rows=3 width=64) (actual time=0.012..0.014 rows=3 loops=1)
 Planning Time: 0.042 ms
 Execution Time: 0.028 ms
(3 rows)`;
    } else if (query === '\\dt' || query === '\\d' || query === 'show tables') {
      output = `             List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | bio        | table | postgres 
 public | projects   | table | postgres 
 public | experience | table | postgres 
 public | metrics    | table | postgres 
 public | skills     | table | postgres 
(5 rows)`;
    } else if (query === '\\d projects') {
      output = `                                  Table "public.projects"
  Column  |       Type        | Collation | Nullable |               Default                
----------+-------------------+-----------+----------+--------------------------------------
 id       | character(2)      |           | not null | 
 name     | character varying |           | not null | 
 category | character varying |           | not null | 
 p99_ms   | integer           |           |          | 
Indexes:
    "projects_pkey" PRIMARY KEY, btree (id)`;
    } else if (query === '\\l') {
      output = `                                  List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges   
-----------+----------+----------+---------+---------+-----------------------
 portfolio | postgres | UTF8     | C.UTF-8 | C.UTF-8 | 
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 | 
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | 
(3 rows)`;
    } else if (query === '\\conninfo') {
      output = `You are connected to database "portfolio" as user "postgres" via socket in "/var/run/postgresql" at port "5432".`;
    } else if (query === 'help' || query === '\\h' || query === '\\?') {
      output = `You are using psql, the command-line interface to PostgreSQL.
Type:  \\dt          to list all tables
       \\d <table>   to describe table schema
       \\conninfo    to show current connection
       \\q or clear  to clear screen
       SELECT * FROM <projects | experience | metrics | skills | bio>;`;
    } else if (query === '\\q' || query === 'clear' || query === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      isError = true;
      output = `ERROR:  syntax error at or near "${trimmed.split(' ')[0]}"\nLINE 1: ${trimmed}\n        ^\nHINT: Try: SELECT * FROM projects; or \\dt`;
    }

    setHistory((prev) => [...prev, { command: trimmed, output, isError }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSql(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCopy = async () => {
    const fullLog = history.map((h) => `portfolio=# ${h.command}\n${h.output}`).join('\n\n');
    await copyToClipboard(fullLog, 'Copied SQL terminal output!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#1d1d1d] bg-[#0e0e0e] p-6 lg:p-8 ticks">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1d1d1d]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[var(--acc)]/40 bg-[var(--acc)]/10 flex items-center justify-center text-[var(--acc)]">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-[#ececec] uppercase tracking-[0.1em] flex items-center gap-2">
              PostgreSQL Interactive Terminal ($ psql)
              <span className="text-[10px] text-[var(--acc)] bg-[var(--acc)]/10 px-1.5 py-0.5 border border-[var(--acc)]/20">
                PORTFOLIO DB
              </span>
            </h3>
            <p className="text-xs text-[#9c9c9c] font-mono mt-0.5">
              Query Alex Chen&apos;s project repositories, production metrics, and role history via SQL.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory(INITIAL_HISTORY)}
            className="flex items-center gap-1.5 text-xs font-mono text-[#9c9c9c] hover:text-[#ececec] border border-[#1d1d1d] px-2.5 py-1 bg-[#121212] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-mono text-[#9c9c9c] hover:text-[#ececec] border border-[#1d1d1d] px-2.5 py-1 bg-[#121212] transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-[var(--green)]" /> : <Copy className="w-3 h-3" />}
            <span>COPY LOG</span>
          </button>
        </div>
      </div>

      {/* SQL Quick Action Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-4 pb-2 font-mono text-xs">
        <span className="text-[10px] text-[#666666] uppercase tracking-wider mr-1">
          QUICK QUERIES:
        </span>
        {[
          'SELECT * FROM projects;',
          'SELECT * FROM experience;',
          'SELECT * FROM metrics;',
          'SELECT * FROM skills;',
          '\\dt',
          'EXPLAIN ANALYZE SELECT * FROM projects;',
        ].map((sql) => (
          <button
            key={sql}
            onClick={() => {
              executeSql(sql);
              inputRef.current?.focus();
            }}
            className="px-2.5 py-1 bg-[#121212] border border-[#1d1d1d] hover:border-[var(--acc)] hover:text-white text-[#9c9c9c] text-[11px] transition-colors"
          >
            {sql}
          </button>
        ))}
      </div>

      {/* Terminal Window */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="mt-4 border border-[#1d1d1d] bg-[#080808] p-4 sm:p-5 font-mono text-xs text-[#ececec] min-h-[300px] max-h-[480px] overflow-y-auto cursor-text selection:bg-[var(--acc)] selection:text-black leading-relaxed"
      >
        {/* Banner */}
        <div className="text-[#666666] pb-3 mb-3 border-b border-[#181818]">
          <div>psql (PostgreSQL 16.4 (Ubuntu 16.4-1.pgdg22.04+1))</div>
          <div>Type &quot;help&quot; for help. Connected to database &quot;portfolio&quot; as user &quot;postgres&quot;.</div>
        </div>

        {/* History */}
        {history.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--acc)] font-bold select-none">portfolio=#</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            <pre
              className={`mt-1 font-mono whitespace-pre overflow-x-auto ${
                item.isError ? 'text-red-400' : 'text-[#ececec]'
              }`}
            >
              {item.output}
            </pre>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[var(--acc)] font-bold select-none">portfolio=#</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="SELECT * FROM ... (Press Enter)"
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white focus:ring-0 p-0 caret-[var(--acc)]"
            autoFocus
          />
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-[10px] font-mono text-[#666666]">
        <span>POSTGRESQL 16.4 · SSL ACTIVE · LATENCY: 0.42ms</span>
        <span>USE ↑/↓ FOR COMMAND HISTORY · TYPE \dt FOR TABLES</span>
      </div>
    </div>
  );
}
