import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { UserIcon } from 'lucide-react';

interface ConnectOrAccountButtonProps {
  className?: string;
}

/**
 * ConnectOrAccountButton
 *
 * Renders a "Connect Wallet" button when the wallet is not connected.
 * When connected, renders a user‐icon button showing the truncated public key.
 * Clicking either opens the AppKit modal (to connect or account view).
 *
 * @param props.className optional wrapper className
 * @returns JSX.Element
 */
export default function ConnectOrAccountButton({
  className = '',
}: ConnectOrAccountButtonProps): React.ReactElement {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  // Helper to truncate the address
  const truncateAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  };

  const handleClick = () => {
    if (isConnected) {
      open({ view: 'Account' });
    } else {
      open({ view: 'Connect' });
    }
  };

  if (isConnected && address) {
    return (
      <button
        onClick={handleClick}
        className={`${className} flex items-center space-x-2 text-xs text-white py-2.5 bg-[#4A8F5D] rounded-md px-5 hover:bg-[#3e7a4e] transition-colors font-semibold uppercase cursor-pointer`}
      >
        <span className="w-4 h-4 rounded-full  text-white flex items-center justify-center">
          <UserIcon />
        </span>
        <span>{truncateAddress(address)}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${className} text-xs text-white py-2.5 bg-[#4A8F5D] rounded-md px-5 hover:bg-[#3e7a4e] transition-colors font-semibold uppercase cursor-pointer`}
    >
      Connect Wallet
    </button>
  );
}
