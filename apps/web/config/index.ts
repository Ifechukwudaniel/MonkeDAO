import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import type { AppKitNetwork } from '@reown/appkit/networks';
import { solana, solanaDevnet, solanaTestnet } from '@reown/appkit/networks';

export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [solana, solanaTestnet, solanaDevnet] as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

export const solanaWeb3JsAdapter = new SolanaAdapter();
