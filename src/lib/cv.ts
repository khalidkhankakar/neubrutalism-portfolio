export function generateCVText(): string {
  return [
    '======================================================',
    '  KHALID KHAN — AI SOFTWARE ENGINEER | ML ENGINEER | FULL STACK',
    '======================================================',
    ' Islamabad, Pakistan (Remote) · khalidkhankakar2468@gmail.com · +92 370-8218757',
    ' khalidkakar.pro · github.com/khalidkhankakar · linkedin.com/in/khalid-khan-kakar1/',
    '',
    ' SUMMARY',
    "  AI Software Engineer & Full Stack Developer combining Python, PyTorch,",
    "  Scikit-learn and FastAPI with React, Next.js, TypeScript and modern backend",
    "  technologies to build intelligent, production-ready applications.",
    "  Philosophy: Data → ML Model → API → AI System → Frontend → Production",
    '',
    ' EXPERIENCE',
    '  June 2026 – Present   ML Engineering Intern · FlyRank.ai (Remote)',
    '                        Production ML workflows, feature engineering, data preprocessing,',
    '                        automated validation pipelines, FastAPI REST APIs for ML inference.',
    '  June 2025 – Sept 2025 Web Development Intern · Mountain View Tech Park (Onsite)',
    '                        Built responsive web apps using React.js & TypeScript, developed',
    '                        reusable Tailwind UI components, integrated high-efficiency REST APIs.',
    '',
    ' SELECTED PROJECTS',
    '  PulseAI      AI Healthcare disease prediction (Heart SVM ~90%, Diabetes XGBoost ~85%,',
    '               Stroke ~82%, Liver ~80%) + LLM Medical Assistant (Qwen, Gemini, GPT OSS)',
    '               Stack: Next.js, React, TypeScript, FastAPI, Scikit-learn, Better Auth, Drizzle',
    '',
    '  ShiftTab     Terminal-Native AI Coding Agent with streaming LLMs, OpenTUI interface,',
    '               slash commands (/model, /new, /delete, /copy, /clear), and filesystem tools.',
    '               Stack: React, TypeScript, Hono, AI SDK, OpenTUI, Bun',
    '',
    '  VisionBoard  Real-Time Collaborative Whiteboard with multi-user live synchronization,',
    '               canvas drawing tools, organizations, invitations, and PostgreSQL Neon storage.',
    '               Stack: React, Next.js, TypeScript, Liveblocks, Drizzle ORM, Clerk, Neon DB',
    '',
    '  DevOverflow  Developer Q&A platform with markdown authoring, voting, and tag systems.',
    '               Stack: Next.js, React, TypeScript, Node.js, MongoDB, Mongoose, Tailwind CSS',
    '',
    ' SKILLS',
    '  ML & AI:     Python, PyTorch, Scikit-learn, XGBoost, Transformers, CNNs, RNNs, Pandas, NumPy, ONNX',
    '  LLMs/Agents: AI Agents, AI SDK, OpenTUI, Tool Execution, MCP, Multi-Model, RAG, Prompt Engineering',
    '  Full Stack:  TypeScript, JavaScript, Next.js, React.js, FastAPI, Node.js, Hono, REST APIs, Tailwind',
    '  DB & Auth:   PostgreSQL, Neon DB, MongoDB, MySQL, Drizzle ORM, Better Auth, Clerk, NextAuth, JWT',
    '  Infra:       Docker, Git, GitHub Actions, Vercel, Bun, Linux/Bash',
    '',
  ].join('\n');
}

export function downloadCVFile(): void {
  if (typeof window === 'undefined') return;
  const cv = generateCVText();
  const blob = new Blob([cv], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'khalid-khan-cv.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 800);
}
