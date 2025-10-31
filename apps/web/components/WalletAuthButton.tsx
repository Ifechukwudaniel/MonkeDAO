'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import { useEffect, useRef, useState } from 'react';
import ConnectOrAccountButton from './ConnectButton';
import { SignMessageOverlay } from './SignMessageOverlay';

export default function WalletAuthButton() {
  const { isConnected, address } = useAppKitAccount();
  const [showSignOverlay, setShowSignOverlay] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const prevConnected = useRef(false);

  // Detect when a new wallet connects
  useEffect(() => {
    if (isConnected && !prevConnected.current && !hasSigned) {
      setShowSignOverlay(true);
    }
    prevConnected.current = isConnected;
  }, [isConnected, hasSigned]);

  const handleCloseOverlay = () => {
    setShowSignOverlay(false);
  };

  const handleSignSuccess = (signatureHex: string) => {
    console.log('✅ Signed successfully:', signatureHex);
    setHasSigned(true);
    setShowSignOverlay(false);

    // You can now call your backend endpoint here e.g.:
    // await createOrAuthUser(signatureHex, address);
  };

  return (
    <>
      <ConnectOrAccountButton />
      {showSignOverlay && (
        <SignMessageOverlay
          onClose={handleCloseOverlay}
          onSignSuccess={handleSignSuccess}
        />
      )}
    </>
  );
}
