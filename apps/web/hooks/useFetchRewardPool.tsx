import { ProgramAccount } from '@coral-xyz/anchor';
import { RewardPool } from '@streamflow/staking';
import { useEffect, useState } from 'react';
import { searchRewardPools } from 'services/streamflow';

/**
 * Returns details of a reward pool
 *
 * @export
 * @param {Partial<Pick<RewardPool, "stakePool" | "mint">>} criteria - filter criteria for fetching reward pools.
 * @returns {{ rewardPools: ProgramAccount<RewardPool>[] | undefined; fetchRewardPools: () => void; loading: boolean; error: Error | undefined; }}
 */
export function useFetchRewardPools(
  criteria: Partial<Pick<RewardPool, 'stakePool' | 'mint'>> = {},
): {
  rewardPools: ProgramAccount<RewardPool>[] | undefined;
  fetchRewardPools: () => void;
  loading: boolean;
  error: Error | undefined;
} {
  const [rewardPools, setRewardPools] =
    useState<ProgramAccount<RewardPool>[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  const fetchRewardPools = async () => {
    try {
      setLoading(true);
      const pools = await searchRewardPools(criteria);
      console.log(pools, 'reward pools');
      setRewardPools(pools);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardPools();
    return () => {
      setRewardPools(undefined);
      setLoading(true);
      setError(undefined);
    };
  }, [JSON.stringify(criteria)]); // re-fetch when criteria changes

  return { rewardPools, fetchRewardPools, loading, error };
}
