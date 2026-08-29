import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Toast } from '@/components/Toast';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KHALID KAKAR — Machine Learning Engineer',
  description:
    'Khalid Kakar is a Senior Machine Learning Engineer in Islamabad specializing in production ML systems, real-time graph neural network fraud detection, LLM distillation, high-throughput Triton serving, and ML observability.',
  keywords: [
    'Khalid Kakar',
    'Machine Learning Engineer',
    'PyTorch',
    'Triton Inference Server',
    'Kubernetes',
    'Model Distillation',
    'MLOps',
    'Islamabad',
    'Graph Neural Networks',
  ],
  authors: [{ name: 'Khalid Kakar', url: 'https://khalidkakar.pro' }],
  creator: 'Khalid Kakar',
  openGraph: {
    title: 'KHALID KAKAR — Machine Learning Engineer',
    description: 'The engineer who really ships models. 1 year, 3 models shipped, 3.1B daily inferences in production.',
    url: 'https://khalidkakar.pro',
    siteName: 'Khalid Kakar Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KHALID KAKAR — Machine Learning Engineer',
    description: 'Production ML Systems, Graph Neural Networks, Model Distillation & Triton Serving.',
    creator: '@khalidkakar',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect x='7' y='7' width='10' height='10' transform='rotate(45 12 12)' fill='%23ffb224'/></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Khalid Kakar',
    jobTitle: 'Senior Machine Learning Engineer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad',
      addressCountry: 'Pakistan',
    },
    url: 'https://khalidkakar.pro',
    sameAs: [
      'https://github.com/khalidkhankakar',
      'https://linkedin.com/in/khalid-khan-kakar1/',
      'https://x.com/khalidkakar',
      'https://scholar.google.com',
    ],
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'PyTorch',
      'Kubernetes',
      'Triton Inference Server',
      'Model Distillation',
      'Fraud Detection',
      'Graph Neural Networks',
    ],
  };

  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
      data-theme="amber"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0a0a0a] text-[#ececec]" suppressHydrationWarning>
        <AppProvider>
          {children}
          <Toast />
          <Analytics />
        </AppProvider>
      </body>
    </html>
  );
}
