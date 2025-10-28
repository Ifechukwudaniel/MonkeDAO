'use client';

import ConnectButton from '../ConnectButton';

export const AppHeader = () => {
  return (
    <header className="w-full border-b border-border-default">
      <div className="max-w-7xl mx-auto flex items-center justify-end px-4 md:px-8 py-2">
        {/* ✦ CONNECT WALLET ✦ */}
        <ConnectButton />
      </div>
    </header>
  );
};
