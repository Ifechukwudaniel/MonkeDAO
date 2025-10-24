import { useAppKit } from '@reown/appkit/react';

export default function ConnectButton() {
  const { open } = useAppKit();

  return (
    <>
      <button
        onClick={() => open()}
        className="text-xs text-white py-2.5  bg-[#4A8F5D] rounded-md px-5 hover:bg-[#3e7a4e] transition-colors font-semibold uppercase cursor-pointer"
      >
        Connect Wallet
      </button>
    </>
  );
}
