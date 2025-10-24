'use client';

import { createAppKit } from '@reown/appkit/react';
import { type ReactNode } from 'react';
import { networks, projectId, solanaWeb3JsAdapter } from '../config';

// 🎨 constants
// =====================================
const metadata = {
  name: 'next-reown-appkit',
  description: 'next-reown-appkit',
  url: 'https://github.com/0xonerb/next-reown-appkit-ssr',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// ⚙️ AppKit instance
// =====================================
export const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'dark',
  features: {
    analytics: true,
  },
  themeVariables: {
    '--w3m-accent': '#ffffff20',
  },
});

// AppProvider
// =====================================
function AppProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default AppProvider;
