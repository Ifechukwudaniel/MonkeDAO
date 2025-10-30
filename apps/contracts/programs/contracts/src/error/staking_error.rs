use anchor_lang::prelude::*;

#[error_code]
pub enum StakingError {
    #[msg("Lock period must be at least 1 day")]
    LockPeriodTooShort,
    #[msg("Lock period cannot exceed 1825 days (5 years)")]
    LockPeriodTooLong,
    #[msg("NFT is still locked - cannot unstake yet")]
    StillLocked,
    #[msg("Stake is not active")]
    StakeNotActive,
    #[msg("Calculation overflow")]
    CalculationOverflow,
    #[msg("No NFT to stake")]
    NoNFTToStake,
    #[msg("Invalid DEAL token mint")]
    InvalidDealMint,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Insufficient DEAL tokens - must return all received tokens to unstake")]
    InsufficientDealTokens,
    #[msg("Insufficient DEAL tokens for emergency unstake - requires 150% penalty")]
    InsufficientDealTokensForPenalty,
}
