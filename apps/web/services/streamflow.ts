import { PublicKey } from '@solana/web3.js';
import {
  IInteractSolanaExt,
  RewardPool,
  SolanaStakingClient,
  StakeArgs,
  StakeEntry,
  StakePool,
} from '@streamflow/staking';
import { ICluster, ITransactionResult } from '@streamflow/stream';

/**
 * create a new instance of the SolanaStakingClient
 */
const solanaClient = new SolanaStakingClient({
  clusterUrl: `https://devnet.helius-rpc.com/?api-key=d6b842be-5729-49db-a0b0-4a19822b3533`, //helius free api key so i dont give a fuck
  cluster: ICluster.Devnet,
});

/**
 * Stake
 *
 * @async
 * @param {ICreateStreamData} streamParams
 * @param {ICreateSolanaExt} solanaParams
 * @param {(stream: ICreateResult) => void} onSuccess
 * @param {(error: unknown) => void} onError
 * @returns {Promise<ICreateResult | undefined>}
 */
export const stake = async (
  stakeParams: StakeArgs,
  solanaParams: IInteractSolanaExt,
  onSuccess: (stream: ITransactionResult) => void,
  onError: (error: unknown) => void,
): Promise<ITransactionResult | undefined> => {
  try {
    const stake = await solanaClient.stake(stakeParams, solanaParams);
    if (stake) {
      console.log('stream');
      onSuccess(stake);
    }
    return stake;
  } catch (error) {
    onError(error);
  }
};

/**
 * Get stake pool
 *
 * @async
 * @param {string} address
 * @returns {Promise<[string, Stream][] | undefined>}
 */
export const getStake = async (
  address: string,
): Promise<StakePool | undefined> => {
  try {
    const stake = await solanaClient.getStakePool(address);
    return stake;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get stake pool
 *
 * @async
 * @param {string} address
 * @returns {Promise<[string, Stream][] | undefined>}
 */
export const getAllStakePools = async (): Promise<StakePool | undefined> => {
  try {
    const stake = await solanaClient.searchStakePools();
    return stake;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get stake entries
 *
 * @async
 * @param {string} address
 * @returns {Promise<[string, Stream][] | undefined>}
 */
export const getAllStakeEntries = async (
  address: PublicKey,
  stakePool: PublicKey,
): Promise<[StakeEntry] | undefined> => {
  try {
    const stake = await solanaClient.searchStakeEntries({
      payer: address,
      stakePool,
    });
    return stake;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get a specific reward pool
 *
 * @async
 * @param {string} address
 * @returns {Promise<RewardPool | undefined>}
 */
export const getRewardPool = async (
  address: PublicKey,
): Promise<RewardPool | undefined> => {
  try {
    const rewardPool = await solanaClient.searchRewardPools({
      stakePool: address,
    });
    return rewardPool;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Search for reward pools using criteria
 *
 * @async
 * @param {Partial<Pick<RewardPool, "stakePool" | "mint">>} criteria
 * @returns {Promise<RewardPool[] | undefined>}
 */
export const searchRewardPools = async (
  criteria: Partial<Pick<RewardPool, 'stakePool' | 'mint'>> = {},
): Promise<RewardPool[] | undefined> => {
  try {
    const pools = await solanaClient.searchRewardPools(criteria);
    return pools;
  } catch (error) {
    console.error(error);
  }
};
