import { useAppKit } from '@reown/appkit/react';

export default function ConnectButton() {
  const { open } = useAppKit();

  return (
    <>
      <button
        onClick={() => open()}
        className="text-sm text-black bg-white rounded-full "
      >
        Connect Wallet
      </button>
    </>
  );
}
