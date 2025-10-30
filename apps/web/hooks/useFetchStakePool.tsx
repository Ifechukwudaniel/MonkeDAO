import { StakePool } from '@streamflow/staking';
import { useEffect, useState } from 'react';
import { getStake } from 'services/streamflow';
/**
 * Returns details of a stake pool
 *
 * @export
 * @param {string} address - pool address to fetch stake pool data for.
 * @returns {{ stakepool: StakePool | undefined; fetchStakePool: () => void; loading: boolean; error: Error | undefined; }}
 */

export function useFetchStakePool(address: string): {
  stakepool: StakePool | undefined;
  fetchStakePool: () => void;
  loading: boolean;
  error: Error | undefined;
} {
  const [stakepool, setStakePool] = useState<StakePool | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  const fetchStakePool = async () => {
    if (!address) return;

    try {
      setLoading(true);
      const stakePoolData = await getStake(address);
      console.log(stakePoolData, 'stake pool');
      setStakePool(stakePoolData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStakePool();
    return () => {
      setStakePool(undefined);
      setLoading(true);
      setError(undefined);
    };
  }, [address]);

  return { stakepool, fetchStakePool, loading, error };
}
