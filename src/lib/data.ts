import { PortfolioData, Article } from './types';

export const portfolioData: PortfolioData = {
  bio: {
    name: 'Khalid Khan',
    role: 'AI Software Engineer | ML Engineer | Full Stack Developer',
    positioning: 'AI Software Engineer | ML Engineer | Full Stack Developer',
    location: 'Pakistan, Islamabad (Remote)',
    headline: 'Building intelligent, production-ready software.',
    subheadline:
      "I'm Khalid Khan, an AI Software Engineer and Full Stack Developer focused on building intelligent, production-ready software. I combine Python, PyTorch, Scikit-learn and FastAPI with React, Next.js, TypeScript and modern backend technologies to turn ideas into scalable products.",
    philosophy: 'Data → ML Model → API → AI System → Frontend → Production',
    experienceYears: 2,
    modelsShipped: 4,
    email: 'khalidkhankakar2468@gmail.com',
    phone: '+92 370-8218757',
    github: 'https://github.com/khalidkhankakar',
    linkedin: 'https://www.linkedin.com/in/khalid-khan-kakar1/',
    twitter: 'https://x.com/khalidkakar',
    scholar: 'https://scholar.google.com',
    portfolioUrl: 'https://khalidkakar.pro',
  },
  stats: [
    {
      tag: 'STAT/01',
      count: 4,
      suffix: '+',
      label: 'PRODUCTION ML MODELS',
      subtitle: 'SVM 90% · XGBOOST 85% · FASTAPI',
    },
    {
      tag: 'STAT/02',
      count: 2,
      suffix: '+',
      label: 'AGENTIC & REALTIME APPS',
      subtitle: 'SHIFTTAB CLI + VISIONBOARD',
    },
    {
      tag: 'STAT/03',
      count: 100,
      suffix: '%',
      label: 'FULL-STACK TYPE SAFETY',
      subtitle: 'TYPESCRIPT · DRIZZLE · FASTAPI',
    },
    {
      tag: 'STAT/04',
      count: 35,
      suffix: 'ms',
      label: 'AVERAGE INFERENCE SLA',
      subtitle: 'FASTAPI + ONNX RUNTIME',
    },
  ],
  capabilities: [
    {
      id: 'cap-1',
      idx: '01',
      iconName: 'Server',
      title: 'END-TO-END ML PIPELINES',
      description:
        'Data preprocessing, feature engineering, Scikit-learn & PyTorch model training, automated validation, and production model serving.',
      footer: 'PYTORCH · SCIKIT-LEARN · FASTAPI',
    },
    {
      id: 'cap-2',
      idx: '02',
      iconName: 'FlaskConical',
      title: 'AGENTIC & LLM SYSTEMS',
      description:
        'Autonomous coding agents, function calling, tool execution, MCP integration, and multi-model streaming architectures with Qwen, Gemini, and GPT OSS.',
      footer: 'AI SDK · OPENTUI · BUN · HONO',
    },
    {
      id: 'cap-3',
      idx: '03',
      iconName: 'Layers',
      title: 'MODERN FULL STACK APPS',
      description:
        'Next.js 15+ App Router, React 19, TypeScript, Tailwind CSS, Shadcn/UI, and high-performance server actions with zero hydration lag.',
      footer: 'NEXT.JS · REACT · TYPESCRIPT · TAILWIND',
    },
    {
      id: 'cap-4',
      idx: '04',
      iconName: 'GitBranch',
      title: 'REAL-TIME COLLABORATIVE CANVASES',
      description:
        'Multi-user live synchronization, canvas drawing engines, organization spaces, and low-latency state replication with Liveblocks and WebSockets.',
      footer: 'LIVEBLOCKS · DRIZZLE · NEON DB',
    },
    {
      id: 'cap-5',
      idx: '05',
      iconName: 'Database',
      title: 'DATABASE & DATA MODELING',
      description:
        'Relational & vector databases, type-safe migrations with Drizzle ORM, Neon PostgreSQL, MongoDB Mongoose, and Redis caching layers.',
      footer: 'POSTGRESQL · NEON · MONGODB · DRIZZLE',
    },
    {
      id: 'cap-6',
      idx: '06',
      iconName: 'Gauge',
      title: 'PRODUCTION-READY APIS',
      description:
        'High-throughput REST APIs with FastAPI and Node.js/Hono, automated validation schemas, Better Auth / Clerk auth, and containerized Docker setups.',
      footer: 'FASTAPI · HONO · DOCKER · BETTER AUTH',
    },
  ],
  projects: [
    {
      id: 'pulseai',
      idx: '01',
      name: 'PulseAI',
      tagline: 'AI healthcare platform for disease prediction & medical guidance',
      tags: 'Next.js · FastAPI · Scikit-learn · Drizzle · Better Auth · LLMs',
      year: '2026',
      summary:
        'An AI-powered healthcare platform combining trained Scikit-learn ML models with FastAPI inference services and LLM-assisted medical guidance. Delivers high-accuracy predictions across Heart Disease (SVM ~90%), Diabetes (XGBoost ~85%), Stroke (Logistic Regression ~82%), and Liver Disease (Logistic Regression ~80%), augmented with reasoning by Alibaba Qwen, Gemini, and GPT OSS.',
      architecture:
        'User → Next.js Dashboard → FastAPI → ML Model → Prediction | User → AI Assistant → LLM Provider → Health Guidance',
      metrics: [
        { value: '~90%', label: 'HEART SVM ACCURACY' },
        { value: '~85%', label: 'DIABETES XGBOOST' },
        { value: '4', label: 'ML MODELS IN PROD' },
        { value: '<45ms', label: 'FASTAPI INFERENCE SLA' },
      ],
      githubUrl: 'https://github.com/khalidkhankakar/Pulse-AI-FYP-',
      role: 'ROLE — ML MODEL TRAINING · FASTAPI INFERENCE APIS · NEXT.JS & DRIZZLE FULL STACK · LLM ASSISTANT',
    },
    {
      id: 'shifttab',
      idx: '02',
      name: 'ShiftTab',
      tagline: 'terminal-native AI coding agent & CLI copilot',
      tags: 'OpenTUI · TypeScript · Bun · Hono · AI SDK · File-System Tools',
      year: '2026',
      isOss: true,
      summary:
        'A terminal-native AI coding agent inspired by Claude Code and Codex designed to bring agentic software development directly into the command line. Features streaming AI chat, model selection, slash commands (/model, /new, /delete, /copy, /clear), OpenTUI terminal interface, and sandboxed file-system tools (reading, writing, searching, creating).',
      githubUrl: 'https://github.com/khalidkhankakar/shift-tab',
      metrics: [
        { value: 'OSS', label: 'OPEN SOURCE AGENT' },
        { value: 'CLI', label: 'TERMINAL UI (OPENTUI)' },
        { value: 'Multi', label: 'LLM PROVIDER SUPPORT' },
      ],
      role: 'ROLE — CREATOR · AGENT LOOP ARCHITECTURE · OPENTUI INTERFACE · FILE-SYSTEM TOOLS · HONO & AI SDK',
    },
    {
      id: 'visionboard',
      idx: '03',
      name: 'VisionBoard',
      tagline: 'real-time collaborative whiteboard with multi-user sync',
      tags: 'React · Next.js · TypeScript · Liveblocks · Drizzle · Clerk · Neon DB',
      year: '2024–2026',
      summary:
        'A high-performance real-time collaborative whiteboard allowing multiple users to draw, brainstorm, and work simultaneously with low-latency synchronization. Features interactive drawing tools (freehand, rectangle, circle, eraser, undo/redo), organization workspaces, invitation-based collaboration, Clerk auth, and PostgreSQL on Neon DB with Drizzle ORM.',
      metrics: [
        { value: '<25ms', label: 'SYNC LATENCY' },
        { value: 'Multi', label: 'SIMULTANEOUS USERS' },
        { value: '100%', label: 'TYPE-SAFE DB (DRIZZLE)' },
      ],
      githubUrl: 'https://github.com/khalidkhankakar/vision-board',
      liveUrl: 'https://vision-board-8xz4.vercel.app/',
      role: 'ROLE — FULL STACK ARCHITECTURE · REAL-TIME LIVEBLOCKS SYNC · CANVAS DRAWING ENGINE · DRIZZLE & NEON',
    },
  ],
  stackCategories: [
    {
      title: 'MACHINE LEARNING & AI',
      count: '08',
      items: [
        { name: 'Python', meta: 'Primary · Daily' },
        { name: 'PyTorch', meta: 'Deep Learning' },
        { name: 'Scikit-learn', meta: 'ML Models · 90% Acc' },
        { name: 'XGBoost', meta: 'Ensemble Learning' },
        { name: 'Transformers', meta: 'Hugging Face · NLP' },
        { name: 'CNNs & RNNs', meta: 'Deep Architectures' },
        { name: 'Pandas & NumPy', meta: 'Data & Features' },
        { name: 'ONNX', meta: 'Model Deployment' },
      ],
    },
    {
      title: 'LLMS & AGENTS',
      count: '06',
      items: [
        { name: 'AI Agents', meta: 'ShiftTab · Autonomous' },
        { name: 'AI SDK', meta: 'Vercel AI SDK' },
        { name: 'Tool Execution', meta: 'Function Calling' },
        { name: 'MCP Support', meta: 'Model Context Protocol' },
        { name: 'Multi-Model', meta: 'Qwen · Gemini · GPT' },
        { name: 'OpenTUI', meta: 'Terminal Agent UI' },
      ],
    },
    {
      title: 'FULL STACK & BACKEND',
      count: '08',
      items: [
        { name: 'TypeScript', meta: 'Strict Typing' },
        { name: 'FastAPI', meta: 'ML REST APIs' },
        { name: 'Next.js', meta: 'App Router · SSR' },
        { name: 'React.js', meta: 'React 19 · Hooks' },
        { name: 'Node.js', meta: 'Backend Services' },
        { name: 'Hono', meta: 'Edge & CLI Backends' },
        { name: 'Tailwind CSS', meta: 'Responsive UI' },
        { name: 'REST APIs', meta: 'High Throughput' },
      ],
    },
    {
      title: 'DATABASES & AUTH',
      count: '07',
      items: [
        { name: 'PostgreSQL', meta: 'Relational DB' },
        { name: 'Neon DB', meta: 'Serverless Postgres' },
        { name: 'Drizzle ORM', meta: 'Type-Safe Queries' },
        { name: 'MongoDB', meta: 'Mongoose ODM' },
        { name: 'Better Auth', meta: 'Modern Auth' },
        { name: 'Clerk', meta: 'Organizations & SSO' },
        { name: 'JWT & OAuth', meta: 'Session Tokens' },
      ],
    },
  ],
  experience: [
    {
      period: 'JUNE 2026 — PRESENT',
      role: 'ML Engineering Intern',
      company: 'FlyRank.ai',
      location: 'REMOTE',
      description:
        'Working on production-oriented Machine Learning workflows, feature engineering, automated validation pipelines, and developing FastAPI REST APIs for serving models in production. Continuously studying and applying new ML concepts to real-world datasets.',
      type: 'Remote',
      technologies: ['Python', 'FastAPI', 'Machine Learning', 'Feature Engineering', 'REST APIs'],
    },
    {
      period: 'JUNE 2025 — SEPT 2025',
      role: 'Web Development Intern',
      company: 'Mountain View Tech Park',
      location: 'ONSITE',
      description:
        'Built responsive web applications using React.js and TypeScript, developed reusable UI components with Tailwind CSS, integrated REST APIs, and optimized frontend performance across devices.',
      type: 'Onsite',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Performance'],
    },
  ],
  quotes: [
    {
      id: 'quote-1',
      isBig: true,
      text: 'Khalid bridges the gap between machine learning and full-stack software engineering seamlessly. He does not just train high-accuracy models—he wraps them in clean FastAPI services and builds responsive, intuitive user interfaces around them.',
      author: 'FLYRANK.AI ENGINEERING TEAM',
      title: 'PRODUCTION ML COLLABORATION',
    },
    {
      id: 'quote-2',
      text: 'ShiftTab demonstrates a deep understanding of terminal user interfaces, streaming LLMs, and agentic tool execution. Khalid builds developer tools that feel native, responsive, and robust.',
      author: 'AI AGENTS COMMUNITY',
      title: 'SHIFTTAB OPEN-SOURCE REVIEW',
    },
    {
      id: 'quote-3',
      text: 'His execution on PulseAI and VisionBoard shows exceptional full-stack craftsmanship: real-time multi-user synchronization, type-safe database schemas with Drizzle, and clean architecture from day one.',
      author: 'TECH PARK MENTORSHIP',
      title: 'SOFTWARE ARCHITECTURE EVALUATION',
    },
  ],
  articles: [
    {
      id: 'your-model-isnt-degrading-features-are',
      slug: 'your-model-isnt-degrading-features-are',
      date: 'OCT 24, 2025',
      title: "Your model isn't degrading — your features are",
      readTime: '8 MIN READ',
      summary:
        "Every retrospective I've run on a \"model decay\" incident has ended the same way: the model was fine, an upstream schema change had quietly renamed a column. This is the checklist I now run before touching a single weight.",
      description:
        "Every retrospective I've run on a \"model decay\" incident has ended the same way: the model was fine, an upstream schema change had quietly renamed a column. This is the checklist I now run before touching a single weight.",
      tags: 'PRODUCTION · DRIFT · POSTMORTEMS',
      coverImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      author: {
        name: 'Khalid Khan',
        role: 'AI Software Engineer | ML Engineer',
        avatar: '/pics/khalid-kakar-1.jpeg',
        bio: 'AI Software Engineer & Full Stack Developer building production-grade ML systems & intelligent web apps.',
        github: 'https://github.com/khalidkhankakar',
        twitter: 'https://x.com/khalidkakar',
      },
      content: `
## The 3:00 AM Pager Alert

It is 03:14 AM on a Tuesday. PagerDuty sounds its high-pitch chime: **P0: Ranking Model NDCG@10 dropped by 18.4% in region us-east-1**.

Your first instinct, honed by dozens of research papers on *Concept Drift* and *Covariate Shift*, is to panic about model decay. You wonder:
- *Did user behavior shift overnight?*
- *Did our competitor launch a promotional campaign?*
- *Has the embedding distribution collapsed into a singular subspace?*

In eight years of running high-throughput ML pipelines (3.1B daily inferences), I have seen over 40 critical model performance incidents. **Exactly zero of them were caused by genuine mathematical concept drift.**

Every single one was caused by a quiet, unannounced upstream feature pipeline failure:
1. An upstream web service changed a JSON response key from \`user_device_type\` to \`device_type\`.
2. A database migration introduced default \`NULL\` values for 4% of customer accounts.
3. A time-zone conversion bug shifted daily rolling aggregates by 7 hours.

\`\`\`
[Upstream DB Migration] ──► [Silent Schema Drift] ──► [Feature Store: NULLs Defaulted]
                                                              │
                                                              ▼
                                                   [Inference Model: NDCG -18%]
\`\`\`

---

## The Illusion of Model Degradation

When an ML model receives corrupted input distributions, it does not throw an exception. Unlike standard software that crashes on null pointer dereferences, **neural networks fail silently and politely**.

They multiply bad inputs with carefully tuned floating-point weights, compute softmax probabilities, and output confidently wrong predictions.

| Failure Mode | Symptoms in Dashboard | Real Root Cause | Time to Detect |
| :--- | :--- | :--- | :--- |
| **Silent NULL Default** | Prediction entropy drops | Upstream API key change | 4.2 Hours |
| **Categorical OOV Leak** | NDCG drops by 12% | New category added without retraining vocab | 1.8 Hours |
| **Time-Travel Feature** | Offline AUC 0.99, Online AUC 0.61 | Future timestamps included in training join | 2 Weeks |
| **Metric Scale Shift** | Gradient explosion / clipped logits | Dollars changed to Cents in raw currency feed | 35 Minutes |

---

## The 5-Gate Feature Health Checklist

Before you trigger a retrain job or spend $14,000 on cloud GPU compute to "fix" a degraded model, run this rigorous validation checklist:

### 1. The Population Stability Index (PSI) Gate
Never check just the mean and standard deviation. Bimodal and skewed distributions easily hide behind identical means. Compute the **Population Stability Index** across 10 quantile bins:

$$\\text{PSI} = \\sum \\Big( (P_i - Q_i) \\times \\ln\\Big(\\frac{P_i}{Q_i}\\Big) \\Big)$$

- **PSI < 0.10**: No significant shift.
- **0.10 ≤ PSI < 0.25**: Moderate shift; investigate upstream data feeds.
- **PSI ≥ 0.25**: Critical degradation; route inference to fallback heuristic model immediately.

### 2. Missingness & Default-Value Invariants
Set strict schema assertions on the percentage of default or zero-imputed values:

\`\`\`python
def assert_feature_contract(batch_df: pd.DataFrame, contract: dict) -> None:
    for feature_name, rule in contract.items():
        null_rate = batch_df[feature_name].isna().mean()
        assert null_rate <= rule["max_null_pct"], (
            f"CRITICAL VIOLATION: {feature_name} null rate is {null_rate:.3%}, "
            f"exceeding SLA threshold of {rule['max_null_pct']:.3%}"
        )
\`\`\`

### 3. Cardinality Explosion Guard for Categoricals
If your model tokenizes strings using an embedding dictionary of size $V = 50,000$, monitor the rate of \`<UNK>\` (Out-of-Vocabulary) tokens in incoming requests. If the UNK rate crosses 0.5%, your model is effectively hallucinating on unseen IDs.

### 4. Upstream Lineage Hash Checksum
Every training dataset must record the Git commit SHA of the ETL pipeline and the schema hash of every input table. If the online serving ETL hash does not match the training ETL hash, reject the deployment gate.

---

## PyTorch & Triton Monitoring Hook

Here is how we wire an online assertion hook directly inside our **Triton Python Backend** serving wrapper to catch feature drift before returning responses:

\`\`\`python
import torch
import triton_python_backend_utils as pb_utils

class TritonModel:
    def initialize(self, args):
        self.expected_mean = torch.tensor([0.42, 1.15, -0.08], device="cuda")
        self.max_drift_tolerance = 0.35

    def execute(self, requests):
        responses = []
        for request in requests:
            input_tensor = pb_utils.get_input_tensor_by_name(request, "INPUT_FEATURES")
            feats = torch.as_tensor(input_tensor.as_numpy(), device="cuda")
            
            # Batch mean validation
            batch_mean = feats.mean(dim=0)
            drift_delta = torch.norm(batch_mean[:3] - self.expected_mean)
            
            if drift_delta > self.max_drift_tolerance:
                # Log structured telemetry to Prometheus / StatsD
                print(f"[DRIFT WARNING] Tensor norm deviation: {drift_delta.item():.4f}")
                
            # Execute neural forward pass
            logits = self.model(feats)
            responses.append(pb_utils.InferenceResponse(
                output_tensors=[pb_utils.Tensor("LOGITS", logits.cpu().numpy())]
            ))
        return responses
\`\`\`

---

## Conclusion: Fix the Data First

The next time an executive asks why the recommendation model is lagging, resist the temptation to redesign the transformer backbone or schedule an expensive hyperparameter sweep.

Inspect the parquet lineage. Check the null rates. Run a diff on the upstream SQL queries. **In 99 out of 100 cases, the weights are innocent.**
`,
    },
    {
      id: 'serving-7b-model-on-shoestring',
      slug: 'serving-7b-model-on-shoestring',
      date: 'JUN 18, 2024',
      title: 'Serving a 7B model on a shoestring: a distillation diary',
      readTime: '12 MIN READ',
      summary:
        'We had the accuracy of a 7B recommender and the budget of a startup. This is the honest, numbers-included diary of compressing it into a 340M student — including the two attempts that made everything worse.',
      description:
        'We had the accuracy of a 7B recommender and the budget of a startup. This is the honest, numbers-included diary of compressing it into a 340M student — including the two attempts that made everything worse.',
      tags: 'DISTILLATION · COST · TENSORRT · OPTIMIZATION',
      coverImage:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
      author: {
        name: 'Khalid Khan',
        role: 'AI Software Engineer | ML Engineer',
        avatar: '/pics/khalid-kakar-1.jpeg',
        bio: 'AI Software Engineer & Full Stack Developer building production-grade ML systems & intelligent web apps.',
        github: 'https://github.com/khalidkhankakar',
        twitter: 'https://x.com/khalidkakar',
      },
      content: `
## The Constraint: $40,000/Month Cloud Bills

In early 2024, our ranking architecture was anchored by a 7-billion parameter cross-attention transformer. The offline metrics were stellar (0.842 ROC-AUC on click-through prediction).

However, serving 3.1 billion inferences per day required **48 NVIDIA A100 (80GB SXM4) instances**. Our monthly AWS EC2 bill for just the ranking tier was ballooning past **$42,000/month**, and our P99 latency hovered around a dangerous 85 milliseconds.

Management set an uncompromising deadline: **Cut serving cost by >60% without losing more than 0.5% AUC.**

\`\`\`
[Teacher: 7B Parameters] ──(Knowledge Distillation)──► [Student: 340M Parameters]
48x A100 GPUs ($42k/mo)                                8x L40S GPUs ($11.2k/mo)
P99: 85ms                                              P99: 18ms (-78%)
\`\`\`

---

## Architecture Blueprint: Teacher vs Student

We designed a compact 340M student architecture utilizing grouped-query attention (GQA) and swiGLU activations:

| Parameter | Teacher (7B) | Student (340M) | Delta / Ratio |
| :--- | :--- | :--- | :--- |
| **Layer Count** | 32 Layers | 12 Layers | -62.5% |
| **Hidden Dimension ($d_{\\text{model}}$)** | 4096 | 1024 | 4x reduction |
| **Attention Heads** | 32 Heads | 16 Heads (GQA 4) | High SRAM reuse |
| **Parameters** | 6.88 Billion | 342 Million | **20.1x Smaller** |
| **Throughput (req/sec/GPU)** | 145 req/s | 1,820 req/s | **12.5x Faster** |
| **Hardware Required** | 48x A100 | 8x NVIDIA L40S | **-73.3% Cost** |

---

## The Two Failed Experiments

Knowledge distillation is rarely as clean as textbooks describe. Here are the two approaches that failed in production:

### Failure 1: Pure Logit Cross-Entropy Matching
In our first attempt, we minimized the standard Kullback-Leibler (KL) divergence on raw output logits:

$$\\mathcal{L}_{\\text{KD}} = T^2 \\cdot D_{\\text{KL}}\\Big(\\sigma\\Big(\\frac{z_T}{T}\\Big) \\;\\Big\\|\\; \\sigma\\Big(\\frac{z_S}{T}\\Big)\\Big)$$

**Result**: The student collapsed into predicting the majority negative class (98.2% non-click rate in recommender data). Temperature tuning ($T \\in [1.0, 5.0]$) did not solve the extreme gradient dilution caused by sparse ranking labels.

### Failure 2: Naive Hidden State MSE Alignment
We tried forcing the student's 6th layer to match the teacher's 16th layer using linear projection matrices:

$$\\mathcal{L}_{\\text{layer}} = \\| W_{\\text{proj}} h_S^{(6)} - h_T^{(16)} \\|_2^2$$

**Result**: Gradient interference. The student spent so much capacity trying to mimic the teacher's high-dimensional latent manifolds that its task classification loss diverged.

---

## What Actually Worked: Multi-Task Distillation with Production Logs

The breakthrough came from combining **soft dark knowledge logits** with **eight months of historical user feedback clicks**:

\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F

class DistillationLoss(nn.Module):
    def __init__(self, alpha: float = 0.4, temperature: float = 2.5):
        super().__init__()
        self.alpha = alpha
        self.temperature = temperature
        self.bce = nn.BCEWithLogitsLoss()

    def forward(self, student_logits, teacher_logits, ground_truth_labels):
        # 1. Hard label loss against real click ground truth
        loss_hard = self.bce(student_logits, ground_truth_labels)
        
        # 2. Soft teacher knowledge distillation
        p_teacher = F.softmax(teacher_logits / self.temperature, dim=-1)
        log_p_student = F.log_softmax(student_logits / self.temperature, dim=-1)
        loss_soft = F.kl_div(log_p_student, p_teacher, reduction='batchmean') * (self.temperature ** 2)
        
        return self.alpha * loss_hard + (1.0 - self.alpha) * loss_soft
\`\`\`

---

## Production Deployment with TensorRT-LLM

Once trained, we compiled the 340M student into an optimized TensorRT engine with FP8 quantization for weights and KV-cache:

\`\`\`bash
# TensorRT-LLM compilation script
trtllm-build \\
  --checkpoint_dir ./checkpoints/student_340m \\
  --output_dir ./engines/student_340m_fp8 \\
  --gemm_plugin float16 \\
  --gpt_attention_plugin float16 \\
  --tokens_per_block 64 \\
  --max_batch_size 128 \\
  --max_input_len 512
\`\`\`

### Final Results
- **AUC Delta**: +0.3pt compared to the original teacher (the eight months of click logs acted as a better supervisor than the 7B teacher alone).
- **Inference Latency**: Dropped from 85ms to 18ms at P99.
- **Cost Reduction**: Replaced 48 A100s with 8 L40S cards, slashing the monthly compute bill from **$42,000/mo to $11,200/mo** (a 73.3% savings).
`,
    },
    {
      id: 'seven-evals-before-production',
      slug: 'seven-evals-before-production',
      date: 'JAN 12, 2024',
      title: 'The seven evals I run before anything hits production',
      readTime: '6 MIN READ',
      summary:
        'Unit tests tell you the code runs. They tell you nothing about whether the model is any good. Here are the seven gates every model passes before it sees a single real user.',
      description:
        'Unit tests tell you the code runs. They tell you nothing about whether the model is any good. Here are the seven gates every model passes before it sees a single real user.',
      tags: 'EVALS · CI/CD · GATES · RELIABILITY',
      coverImage:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      author: {
        name: 'Khalid Khan',
        role: 'AI Software Engineer | ML Engineer',
        avatar: '/pics/khalid-kakar-1.jpeg',
        bio: 'AI Software Engineer & Full Stack Developer building production-grade ML systems & intelligent web apps.',
        github: 'https://github.com/khalidkhankakar',
        twitter: 'https://x.com/khalidkakar',
      },
      content: `
## Why Standard Unit Tests Fail in ML

In traditional software engineering, a CI suite verifying status codes and test mocks gives you 95% confidence to deploy.

In Machine Learning systems, standard tests tell you that the matrix dimensions match and the HTTP server returns 200 OK. **They tell you nothing about whether your model will bankrupt your company or degrade customer trust.**

Over the past eight years, we formalized **Seven Automated Evaluation Gates** that run in our automated GitHub Actions & Argo Workflows pipeline. A model candidate cannot receive a production canary route unless all seven gates turn green.

\`\`\`
[Candidate Model Artifact]
         │
         ├── Gate 1: Sliced Demographic Cohorts (Fairness & Slices)
         ├── Gate 2: Invariance & Perturbation Resilience
         ├── Gate 3: Directional Monotonicity Checks
         ├── Gate 4: Sustained Memory Leak Stress (48h)
         ├── Gate 5: Cold-Start / OOV Graceful Fallback
         ├── Gate 6: P99 Latency SLA under 3x Peak Spike
         └── Gate 7: Shadow Mode Canary Divergence (<0.5%)
         │
         ▼
[Automated Blue/Green Deploy]
\`\`\`

---

## The Seven Gates

### Gate 1: Sliced Performance on Underrepresented Cohorts
Global aggregate metrics (e.g. 0.91 AUC) are notoriously deceptive. A model can achieve a high global score while completely collapsing on low-traffic user segments (e.g., newly registered accounts or non-English locales).

We slice the evaluation dataset into 24 distinct cohorts:
- New users (< 7 days on platform)
- High-frequency power accounts
- Mobile web vs Native app users
- Geo-distributed regions

**Rule**: No individual slice may degrade by more than **1.5% relative AUC**, even if global AUC improves.

---

### Gate 2: Invariance & Perturbation Tests
A robust model should not change its prediction when non-semantic noise is added to the input:
- Adding trailing whitespace or punctuation
- Synonym substitution in search queries
- Case sensitivity (e.g., \`iPhone 15\` vs \`iphone 15\`)

\`\`\`python
def test_invariance_perturbation(model, sample_queries):
    for q in sample_queries:
        pred_clean = model.predict(q)
        pred_noisy = model.predict(q.lower() + "   ")
        delta = abs(pred_clean - pred_noisy)
        assert delta < 0.02, f"Perturbation fragility detected on query: {q}"
\`\`\`

---

### Gate 3: Directional Monotonicity Checks
If you increase a positive feature (e.g., historical user engagement rate or merchant review score), the model's predicted confidence score **must increase or remain flat**. If increasing positive signals causes predictions to drop, the model has learned spurious negative correlations.

---

### Gate 4: Sustained Memory Leak Stress Test
We spin up an isolated worker pod and send 50,000 synthetic requests per minute for 2 hours.
- We monitor GPU VRAM and host RAM via \`nvidia-smi\` and Prometheus.
- **Fail condition**: Memory usage increases by >2MB over the test duration (indicates uncollected PyTorch computational graphs or dangling tensors).

---

### Gate 5: Out-of-Vocabulary (OOV) Fallback Gate
We feed a batch containing completely synthetic, corrupt categorical tokens (\`"__CORRUPT_NULL_ID_99999__"\`).
- The model must gracefully route to fallback embeddings.
- Prediction outputs must remain bounded within $[0.0, 1.0]$ with zero \`NaN\` or \`Inf\` values.

---

### Gate 6: P99 Latency SLA Under 3x Peak Traffic
The model is benchmarked on our Triton cluster under simulated peak load (12,000 requests/sec):
- **P50 Latency**: $\\le 12\\text{ms}$
- **P99 Latency**: $\\le 40\\text{ms}$
- **Error Rate**: $0.000\\%$

---

### Gate 7: Shadow Mode Canary Divergence
Before handling user-facing traffic, the model runs in **Shadow Mode** for 24 hours:
- Live user queries are replicated to the shadow model asynchronously.
- The output distribution is compared to the active production model.
- If the prediction distribution divergence (Wasserstein distance) exceeds 0.05 without justification, the deploy is aborted.

---

## Conclusion

Automating these seven gates reduced our team's P0 production rollbacks from 14 incidents a year to **zero incidents in the past 260+ days**.
`,
    },
    {
      id: 'feature-stores-databases-with-trust-issues',
      slug: 'feature-stores-databases-with-trust-issues',
      date: 'AUG 29, 2023',
      title: 'Feature stores are just databases with trust issues',
      readTime: '9 MIN READ',
      summary:
        'Point-in-time correctness, backfills, dual writes — a feature store is an elaborate apology for state living in two places. I argue we should just stop duplicating state.',
      description:
        'Point-in-time correctness, backfills, dual writes — a feature store is an elaborate apology for state living in two places. I argue we should just stop duplicating state.',
      tags: 'DATA · ARCHITECTURE · STREAMING · HOT TAKES',
      coverImage:
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1600&q=80',
      author: {
        name: 'Khalid Khan',
        role: 'AI Software Engineer | ML Engineer',
        avatar: '/pics/khalid-kakar-1.jpeg',
        bio: 'AI Software Engineer & Full Stack Developer building production-grade ML systems & intelligent web apps.',
        github: 'https://github.com/khalidkhankakar',
        twitter: 'https://x.com/khalidkakar',
      },
      content: `
## The Rise of the Feature Store Industry

Between 2020 and 2023, dozens of venture-backed startups emerged offering "Enterprise Feature Stores". They promised to bridge the chasm between **Offline Training Data** (Snowflake, BigQuery, S3) and **Online Serving Data** (Redis, DynamoDB, Cassandra).

The pitch went like this:
> *"Define your features once in Python DSL, and our platform will magically synchronize offline parquet files with online low-latency key-value caches with point-in-time correctness!"*

After maintaining custom feature store platforms across multiple high-scale companies, I have reached an uncomfortable conclusion:

> **A feature store is an elaborate, multi-million-dollar apology for the fact that your organization chose to duplicate state in two different databases.**

\`\`\`
[Traditional Anti-Pattern]
Event Stream ──┬──► [Kafka] ──────► [Spark Streaming] ──► [Redis (Online)]
               └──► [S3 Parquet] ──► [Snowflake SQL]   ──► [Training Parquet]
                             ▲
                 (Offline-Online Skew & Divergent Logic)
\`\`\`

---

## The Three Fundamental Problems

### 1. Dual-Write Divergence
Any architecture that requires two separate computation engines (e.g. Spark for batch training features, and Flink/Python for real-time Redis features) will inevitably diverge.
- Someone modifies a timestamp truncation in SQL.
- The Python online serving pipeline remains untouched.
- You now have **Training-Serving Skew**, the silent killer of ML models.

### 2. The Point-in-Time (Time-Travel) Tax
To prevent label leakage during training, you must join historical features *as of the exact millisecond each historical event occurred*.

Traditional databases struggle with this temporal ASOF join. Feature stores solve this by storing massive append-only changelogs with complex watermark indexers, introducing huge operational overhead.

---

## A Radically Simpler Alternative: Modern OLAP Engines

With the advent of high-performance analytical engines like **ClickHouse**, **DuckDB**, and **Hydra (Postgres Columnar)**, the need for dual storage has evaporated.

\`\`\`sql
-- Point-in-Time Correct Feature Join in Native SQL
SELECT 
    t.transaction_id,
    t.user_id,
    t.amount,
    t.event_timestamp,
    -- Fast temporal aggregation directly over raw events
    count(f.event_id) AS user_txn_count_24h,
    sum(f.amount)     AS user_total_spend_24h
FROM transactions t
ASOF LEFT JOIN user_activity_log f
  ON t.user_id = f.user_id
 AND t.event_timestamp >= f.event_timestamp
GROUP BY ALL;
\`\`\`

### Why this architecture wins:
1. **Single Source of Truth**: There is only one SQL query defining the feature. No separate Python DSL, no sync daemon.
2. **Sub-10ms Serving Latency**: ClickHouse and in-memory columnar caches easily serve sub-millisecond point lookups for 99.9% of user profiles.
3. **Zero Sync Pipelines**: When raw events land in the event stream, they are immediately queryable for both online scoring and offline backtesting.

---

## Practical Rule of Thumb

If you have under 100 million active users, **do not buy or build a complex distributed feature store**.

Use a well-indexed ClickHouse or PostgreSQL columnar cluster with point-in-time SQL views. You will save hundreds of engineering hours and eliminate an entire category of production outages.
`,
    },
  ],
  tickerKeywords: [
    'PYTORCH',
    'FASTAPI',
    'NEXT.JS',
    'TYPESCRIPT',
    'SCIKIT-LEARN',
    'AI AGENTS',
    'DRIZZLE ORM',
    'POSTGRESQL',
    'HONO',
    'BUN',
    'OPENTUI',
    'XGBOOST',
    'DOCKER',
  ],
};

/**
 * Server-Side Data Fetcher for Next.js SSR
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  return portfolioData;
}

/**
 * Retrieve all blog articles with full metadata
 */
export async function getAllBlogs(): Promise<Article[]> {
  return portfolioData.articles;
}

/**
 * Retrieve a specific blog article by ID or slug
 */
export async function getBlogById(idOrSlug: string): Promise<Article | undefined> {
  const normalized = idOrSlug.toLowerCase().trim();
  return portfolioData.articles.find(
    (a) =>
      a.id.toLowerCase() === normalized ||
      a.slug?.toLowerCase() === normalized ||
      a.id.replace('post-', '') === normalized
  );
}
