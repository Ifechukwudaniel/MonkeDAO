import { Provider } from '@reown/appkit-adapter-solana/react';
import { useAppKitProvider } from '@reown/appkit/react';
import { PublicKey } from '@solana/web3.js';
import { StakeEntry } from '@streamflow/staking';
import { useEffect, useState } from 'react';
import { getAllStakeEntries } from 'services/streamflow';

export function useFetchStakeEntries(stakePool: PublicKey): {
  stakeEntries: StakeEntry | undefined;
  fetchStakeEntries: () => void;
  loading: boolean;
  error: Error | undefined;
} {
  const [stakeEntries, setStakeEntries] = useState<StakeEntry | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  const fetchStakeEntries = () => {
    if (!walletProvider) {
      setError(new Error('Wallet not connected or public key not found'));
      return;
    }

    const address = walletProvider?.publicKey;

    setLoading(true);

    if (!address) {
      setError(new Error('Wallet address not found'));
      setLoading(false);
      return;
    }

    getAllStakeEntries(address, stakePool)
      .then((stakeEntries) => setStakeEntries(stakeEntries))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStakeEntries();
    return () => {
      setStakeEntries(undefined);
      setLoading(true);
      setError(undefined);
    };
  }, [walletProvider]);

  return { stakeEntries, fetchStakeEntries, loading, error };
}
