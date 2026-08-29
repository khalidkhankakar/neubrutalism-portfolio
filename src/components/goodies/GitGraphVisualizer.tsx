'use client';

import React, { useState } from 'react';
import { GitBranch, GitCommit, GitPullRequest, GitMerge, FileCode2, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface CommitMilestone {
  hash: string;
  branch: string;
  author: string;
  date: string;
  message: string;
  milestoneTitle: string;
  category: string;
  tag?: string;
  impact: string;
  diff: string;
  x: number;
  y: number; // 0 for main, 1 for feature/ai-agent, 2 for feature/triton-kernel
}

const COMMITS: CommitMilestone[] = [
  {
    hash: 'a1e940f',
    branch: 'main',
    author: 'Khalid Kakar <khalidkhankakar24@gmail.com>',
    date: '2021-03-14',
    message: 'init: Foundation ML infrastructure & distributed dataloader',
    milestoneTitle: 'Early ML Infrastructure & Real-Time Data Pipeline',
    category: 'INFRA',
    tag: 'v0.1.0',
    impact: 'Architected initial Ray Data batching pipeline processing 10k items/sec with zero memory leaks.',
    diff: `@@ -0,0 +1,8 @@
+import ray
+@ray.remote
+def stream_batch_loader(shard_idx: int):
+    dataset = ray.data.read_parquet(f"s3://ml-lake/shard_{shard_idx}.parquet")
+    return dataset.map_batches(preprocess_tensor, batch_format="numpy")`,
    x: 0,
    y: 0,
  },
  {
    hash: '3d7b92c',
    branch: 'main',
    author: 'Khalid Kakar <khalidkhankakar24@gmail.com>',
    date: '2022-06-20',
    message: 'feat(pulse-ai): Ship real-time cardiac arrhythmia detection',
    milestoneTitle: 'Pulse AI Production Rollout (0.94 F1 Score)',
    category: 'PROD LAUNCH',
    tag: 'v1.0.0',
    impact: 'Deployed 1D-CNN + Transformer hybrid to 14 hospital clusters with 18ms latency SLA.',
    diff: `@@ -24,7 +24,9 @@
-    prediction = heuristic_baseline(raw_ecg)
+    with torch.inference_mode():
+        feats = self.conv_backbone(raw_ecg)
+        prediction = self.transformer_head(feats)
+    return {"f1": 0.942, "class": prediction.argmax().item()}`,
    x: 1,
    y: 0,
  },
  {
    hash: '8f2a1b4',
    branch: 'feature/triton-kernel',
    author: 'Khalid Kakar <khalidkhankakar24@gmail.com>',
    date: '2023-01-15',
    message: 'perf(kernel): Implement custom FlashAttention-2 Triton kernel',
    milestoneTitle: 'FlashAttention-2 Kernel Memory Fusion (42% Speedup)',
    category: 'GPU KERNEL',
    impact: 'Replaced standard PyTorch attention with fused block SRAM tile kernel, dropping peak VRAM 60%.',
    diff: `@@ -1,6 +1,8 @@
 @triton.jit
-def attention_forward(q, k, v):
-    return naive_matmul(q, k.T)
+def _fused_flash_attn_kernel(Q, K, V, Out, BLOCK_M: tl.constexpr = 64):
+    q_tile = tl.load(Q + offs_m)
+    # Online softmax row-max reduction in SRAM fast cache
+    m_i = tl.maximum(m_prev, row_max)`,
    x: 2,
    y: 2,
  },
  {
    hash: '5c91e0a',
    branch: 'feature/triton-kernel',
    author: 'Khalid Kakar <khalidkhankakar24@gmail.com>',
    date: '2023-04-10',
    message: 'test: Achieve 215 TFLOPs on NVIDIA H100 SXM5 benchmark',
    milestoneTitle: 'Kernel Benchmark Validation (215 TFLOPs)',
    category: 'BENCHMARK',
    impact: 'Validated sustained memory bandwidth efficiency at 88% of theoretical roofline limit.',
    diff: `@@ -12,4 +12,6 @@
-assert latency_ms < 1.0
+assert latency_ms < 0.38, f"Kernel failed SLA: {latency_ms}ms"
+print(f"H100 Tensor Core Utilization: {achieved_tflops:.1f} TFLOPs")`,
    x: 3,
    y: 2,
  },
  {
    hash: 'b482c19',
    branch: 'main',
    author: 'Khalid Kakar <khalidkhankakar24@gmail.com>',
    date: '2023-05-01',
    message: 'merge: Merge branch feature/triton-kernel into main',
    milestoneTitle: 'Merged Triton Kernel into Production Engine',
    category: 'MERGE',
    tag: 'v2.0.0',
    impact: 'Cut cluster cloud compute bill by $18,400/month by packing 2.8x more concurrent requests per GPU.',
    diff: `@@ -10,3 +10,4 @@
+from triton_kernels.flash_attn import flash_attn_func
-output = torch.bmm(Q, K.transpose(1, 2))
+output = flash_attn_func(Q, K, V, causal=True)`,
    x: 4,
    y: 0,
  },
  {
    hash: '9e41b7d',
    branch: 'feature/ai-agent',
    author: 'Khalid Kakar <khalidkhankakar24@gmail.com>',
    date: '2023-11-18',
    message: 'feat(agent): Autonomous tool-calling engine with schema validation',
    milestoneTitle: 'ShiftTab AI Multi-Turn Copilot Core',
    category: 'AI AGENTS',
    impact: 'Built JSON-schema function executor with automated retry guards and zero hallucinatory hallucinated tool calls.',
    diff: `@@ -31,5 +31,8 @@
-    return openai_raw_call(prompt)
+    agent = FunctionCallingAgent(tools=[SQLTool, TerminalTool])
+    plan = agent.generate_plan(user_query)
+    return agent.execute_with_safety_guard(plan)`,
    x: 5,
    y: 1,
  },
  {
    hash: '7d30f5c',
    branch: 'main',
    author: 'Khalid Kakar <khalidkhankakar24@gmail.com>',
    date: '2024-04-02',
    message: 'feat(serving): Deploy 3.1B/day Triton autoscaling on GKE',
    milestoneTitle: 'Scale AI Serving Pipeline (3.1 Billion Daily Inferences)',
    category: 'SCALE',
    tag: 'v2.4.0',
    impact: 'Achieved 40ms P99 SLA under bursty 5.8B peak load with 99.98% serving uptime.',
    diff: `@@ -1,4 +1,7 @@
 apiVersion: serving.triton/v1
-replicas: 8
+spec:
+  minReplicas: 32
+  maxReplicas: 128
+  targetP99Latency: 40ms`,
    x: 6,
    y: 0,
  },
];

export function GitGraphVisualizer() {
  const { copyToClipboard } = useApp();
  const [selectedHash, setSelectedHash] = useState<string>('7d30f5c');
  const [activeBranch, setActiveBranch] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedCommit = COMMITS.find((c) => c.hash === selectedHash) || COMMITS[COMMITS.length - 1];

  const filteredCommits = COMMITS.filter((c) => {
    if (activeBranch === 'all') return true;
    return c.branch === activeBranch;
  });

  const handleCopyHash = async () => {
    await copyToClipboard(selectedCommit.hash, `Copied commit ${selectedCommit.hash}!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#1d1d1d] bg-[#0e0e0e] p-6 lg:p-8 ticks">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1d1d1d]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[var(--acc)]/40 bg-[var(--acc)]/10 flex items-center justify-center text-[var(--acc)]">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-[#ececec] uppercase tracking-[0.1em] flex items-center gap-2">
              Visual Git Commit Graph & Milestones
              <span className="text-[10px] text-[var(--acc)] bg-[var(--acc)]/10 px-1.5 py-0.5 border border-[var(--acc)]/20">
                INTERACTIVE DAG
              </span>
            </h3>
            <p className="text-xs text-[#9c9c9c] font-mono mt-0.5">
              Click commit nodes below to explore development milestones, benchmarks, and unified code diffs.
            </p>
          </div>
        </div>

        {/* Branch filter chips */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          {['all', 'main', 'feature/ai-agent', 'feature/triton-kernel'].map((b) => (
            <button
              key={b}
              onClick={() => setActiveBranch(b)}
              className={`px-2.5 py-1 border transition-colors ${
                activeBranch === b
                  ? 'border-[var(--acc)] bg-[var(--acc)]/10 text-white font-bold'
                  : 'border-[#1d1d1d] bg-[#121212] text-[#9c9c9c] hover:border-[#2c2c2c]'
              }`}
            >
              {b === 'all' ? 'ALL BRANCHES' : b}
            </button>
          ))}
        </div>
      </div>

      {/* Visual ASCII & DAG Graph Canvas */}
      <div className="mt-6 border border-[#1d1d1d] bg-[#080808] p-5 font-mono text-xs overflow-x-auto">
        <div className="text-[10px] text-[#666666] uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>GRAPH TIMELINE (CLICK ANY COMMIT NODE ● TO REVEAL MILESTONE):</span>
          <span className="text-[var(--acc)]">ACTIVE HEAD: 7d30f5c (v2.4.0)</span>
        </div>

        {/* ASCII Git Graph Schematic */}
        <div className="p-3 bg-[#0e0e0e] border border-[#181818] text-[#9c9c9c] text-xs leading-relaxed select-none mb-4">
          <pre className="font-mono">
{`●────●────●─────────────────●──────● (main)
     │                   └── feature/ai-agent [9e41b7d]
     │
     └────●────● (feature/triton-kernel [8f2a1b4])`}
          </pre>
        </div>

        {/* Interactive Commit Node Timeline */}
        <div className="min-w-[620px] py-3">
          <div className="space-y-2">
            {filteredCommits.map((c) => {
              const isSelected = selectedHash === c.hash;
              return (
                <div
                  key={c.hash}
                  onClick={() => setSelectedHash(c.hash)}
                  className={`flex items-center gap-3 p-2.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--acc)] bg-[var(--acc)]/10 text-white shadow-sm'
                      : 'border-[#181818] bg-[#101010] text-[#9c9c9c] hover:border-[#2c2c2c] hover:text-[#ececec]'
                  }`}
                >
                  {/* Branch node visual indicator */}
                  <div className="flex items-center gap-1.5 font-bold shrink-0">
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                        isSelected
                          ? 'bg-[var(--acc)] text-black ring-2 ring-white/50'
                          : 'bg-[#222222] text-[#9c9c9c]'
                      }`}
                    >
                      ●
                    </span>
                    <span className="text-[var(--acc)] font-mono">{c.hash}</span>
                  </div>

                  {/* Branch badge */}
                  <span className="px-1.5 py-0.5 bg-[#181818] text-[#9c9c9c] text-[10px] border border-[#222222] shrink-0">
                    {c.branch}
                  </span>

                  {c.tag && (
                    <span className="px-1.5 py-0.5 bg-[var(--green)]/15 text-[var(--green)] text-[10px] border border-[var(--green)]/30 font-bold shrink-0">
                      {c.tag}
                    </span>
                  )}

                  {/* Message */}
                  <span className="flex-1 truncate font-mono text-xs text-[#ececec]">
                    {c.message}
                  </span>

                  {/* Date */}
                  <span className="text-[11px] text-[#666666] shrink-0">{c.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Milestone Inspection Box */}
      <div className="mt-6 border border-[var(--acc)]/40 bg-[#121212] p-5 font-mono text-xs">
        {/* Milestone header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#222222]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[var(--acc)] text-black font-bold text-[10px]">
              [{selectedCommit.category}]
            </span>
            <h4 className="text-sm font-bold text-white uppercase tracking-tight">
              {selectedCommit.milestoneTitle}
            </h4>
          </div>

          <button
            onClick={handleCopyHash}
            className="flex items-center gap-1 text-[11px] text-[#9c9c9c] hover:text-white border border-[#222222] px-2.5 py-1 bg-[#181818] transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-[var(--green)]" /> : <Copy className="w-3 h-3" />}
            <span>COPY COMMIT HASH</span>
          </button>
        </div>

        {/* Metadata columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-b border-[#222222] text-[11px]">
          <div>
            <span className="text-[#666666] block">COMMIT & BRANCH</span>
            <span className="text-[var(--acc)] font-bold">{selectedCommit.hash}</span>{' '}
            <span className="text-[#9c9c9c]">({selectedCommit.branch})</span>
          </div>
          <div>
            <span className="text-[#666666] block">AUTHOR</span>
            <span className="text-white">{selectedCommit.author}</span>
          </div>
          <div>
            <span className="text-[#666666] block">DATE SHIPPED</span>
            <span className="text-white">{selectedCommit.date}</span>
          </div>
        </div>

        {/* Milestone Impact description */}
        <div className="py-3">
          <span className="text-[10px] text-[var(--acc)] uppercase font-bold tracking-wider block mb-1">
            PRODUCTION IMPACT & ARCHITECTURAL OUTCOME:
          </span>
          <p className="text-white leading-relaxed text-xs sm:text-sm bg-[#0a0a0a] p-3 border border-[#1d1d1d]">
            {selectedCommit.impact}
          </p>
        </div>

        {/* Code Diff preview */}
        <div className="pt-2">
          <span className="text-[10px] text-[#666666] uppercase font-bold tracking-wider block mb-1.5 flex items-center gap-1.5">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>UNIFIED GIT DIFF (PATCH):</span>
          </span>
          <pre className="p-3 bg-[#080808] border border-[#181818] text-[11px] sm:text-xs overflow-x-auto font-mono text-[#9c9c9c] leading-snug">
            {selectedCommit.diff.split('\n').map((line, i) => {
              let lineClass = 'text-[#666666]';
              if (line.startsWith('+')) lineClass = 'text-[var(--green)] bg-[var(--green)]/10 font-bold';
              else if (line.startsWith('-')) lineClass = 'text-red-400 bg-red-500/10 font-bold';
              else if (line.startsWith('@')) lineClass = 'text-[var(--acc)]';
              return (
                <div key={i} className={lineClass}>
                  {line}
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );
}
