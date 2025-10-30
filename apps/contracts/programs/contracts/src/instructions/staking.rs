use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Burn, Mint, MintTo, Token, TokenAccount, Transfer};

use crate::{error::StakingError, instructions::mint_collections::NftMetadata, state::StakingPool};

#[derive(Accounts)]
pub struct InitializeStakingPool<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + StakingPool::SIZE,
        seeds = [b"staking_pool", authority.key().as_ref()],
        bump
    )]
    pub staking_pool: Account<'info, StakingPool>,

    /// The DEAL token mint
    #[account(mut)]
    pub deal_token_mint: Account<'info, Mint>,

    /// DEAL config account (has minting authority)
    #[account(seeds = [b"deal_config"], bump = deal_config.bump)]
    pub deal_config: Account<'info, DealConfig>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StakeNFT<'info> {
    #[account(
        mut,
        seeds = [b"staking_pool", staking_pool.authority.as_ref()],
        bump = staking_pool.bump,
    )]
    pub staking_pool: Account<'info, StakingPool>,

    #[account(
        init,
        payer = user,
        space = 8 + StakeAccount::SIZE,
        seeds = [b"stake", user.key().as_ref(), nft_mint.key().as_ref()],
        bump
    )]
    pub stake_account: Account<'info, StakeAccount>,

    pub nft_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = nft_mint,
        associated_token::authority = user,
        constraint = user_nft_account.amount == 1 @ StakingError::NoNFTToStake
    )]
    pub user_nft_account: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = nft_mint,
        associated_token::authority = staking_pool,
    )]
    pub vault_nft_account: Account<'info, TokenAccount>,

    /// DEAL token mint
    #[account(
        mut,
        address = staking_pool.deal_token_mint
    )]
    pub deal_token_mint: Account<'info, Mint>,

    /// DEAL config with mint authority
    #[account(
        seeds = [b"deal_config"],
        bump = deal_config.bump,
        constraint = deal_config.mint == deal_token_mint.key() @ StakingError::InvalidDealMint
    )]
    pub deal_config: Account<'info, DealConfig>,

    /// User's DEAL token account
    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = deal_token_mint,
        associated_token::authority = user,
    )]
    pub user_deal_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[derive(Accounts)]
pub struct UnstakeNFT<'info> {
    #[account(
        mut,
        seeds = [b"staking_pool", staking_pool.authority.as_ref()],
        bump = staking_pool.bump,
    )]
    pub staking_pool: Account<'info, StakingPool>,

    #[account(
        mut,
        seeds = [b"stake", user.key().as_ref(), stake_account.nft_mint.as_ref()],
        bump = stake_account.bump,
        has_one = user,
    )]
    pub stake_account: Account<'info, StakeAccount>,

    #[account(
        mut,
        associated_token::mint = stake_account.nft_mint,
        associated_token::authority = staking_pool,
    )]
    pub vault_nft_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = stake_account.nft_mint,
        associated_token::authority = user,
    )]
    pub user_nft_account: Account<'info, TokenAccount>,

    /// DEAL token mint for burning
    #[account(
        mut,
        address = staking_pool.deal_token_mint
    )]
    pub deal_token_mint: Account<'info, Mint>,

    /// User's DEAL token account (must have enough to burn)
    #[account(
        mut,
        associated_token::mint = deal_token_mint,
        associated_token::authority = user,
    )]
    pub user_deal_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct EmergencyUnstake<'info> {
    #[account(
        mut,
        seeds = [b"staking_pool", staking_pool.authority.as_ref()],
        bump = staking_pool.bump,
    )]
    pub staking_pool: Account<'info, StakingPool>,

    #[account(
        mut,
        seeds = [b"stake", user.key().as_ref(), stake_account.nft_mint.as_ref()],
        bump = stake_account.bump,
        has_one = user,
    )]
    pub stake_account: Account<'info, StakeAccount>,

    #[account(
        mut,
        associated_token::mint = stake_account.nft_mint,
        associated_token::authority = staking_pool,
    )]
    pub vault_nft_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = stake_account.nft_mint,
        associated_token::authority = user,
    )]
    pub user_nft_account: Account<'info, TokenAccount>,

    /// DEAL token mint for burning
    #[account(
        mut,
        address = staking_pool.deal_token_mint
    )]
    pub deal_token_mint: Account<'info, Mint>,

    /// User's DEAL token account (must have 150% for penalty)
    #[account(
        mut,
        associated_token::mint = deal_token_mint,
        associated_token::authority = user,
    )]
    pub user_deal_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct LinkStreamFlow<'info> {
    #[account(
        mut,
        seeds = [b"stake", user.key().as_ref(), stake_account.nft_mint.as_ref()],
        bump = stake_account.bump,
    )]
    pub stake_account: Account<'info, StakeAccount>,

    pub user: Signer<'info>,
}

#[account]
pub struct StakingPool {
    pub authority: Pubkey,        // 32
    pub deal_token_mint: Pubkey,  // 32
    pub deal_config: Pubkey,      // 32
    pub base_tokens_per_day: u64, // 8 (with 6 decimals)
    pub total_nfts_staked: u64,   // 8
    pub total_deal_minted: u64,   // 8
    pub bump: u8,                 // 1
}

impl StakingPool {
    pub const SIZE: usize = 32 + 32 + 32 + 8 + 8 + 8 + 1;
}

#[account]
pub struct StakeAccount {
    pub user: Pubkey,                  // 32
    pub nft_mint: Pubkey,              // 32
    pub staked_at: i64,                // 8
    pub unlock_time: i64,              // 8
    pub lock_duration_days: u64,       // 8
    pub reward_multiplier: u64,        // 8 (100 = 1.0x)
    pub deal_tokens_received: u64,     // 8 (total DEAL minted)
    pub streamflow_vesting_id: Pubkey, // 32 (optional StreamFlow integration)
    pub is_active: bool,               // 1
    pub bump: u8,                      // 1
}

impl StakeAccount {
    pub const SIZE: usize = 32 + 32 + 8 + 8 + 8 + 8 + 8 + 32 + 1 + 1;
}

/// DEAL Token Config (matches your token contract)
#[account]
pub struct DealConfig {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub fee_wallet: Pubkey,
    pub bump: u8,
}
/// Initialize the staking pool with DEAL token rewards
pub fn initialize_staking_pool(
    ctx: Context<InitializeStakingPool>,
    base_tokens_per_day: u64, // Base DEAL tokens per day (with 6 decimals)
) -> Result<()> {
    let pool = &mut ctx.accounts.staking_pool;
    pool.authority = ctx.accounts.authority.key();
    pool.deal_token_mint = ctx.accounts.deal_token_mint.key();
    pool.deal_config = ctx.accounts.deal_config.key();
    pool.base_tokens_per_day = base_tokens_per_day;
    pool.total_nfts_staked = 0;
    pool.total_deal_minted = 0;
    pool.bump = ctx.bumps.staking_pool;

    msg!(
        "✅ Staking Pool initialized with {} DEAL/day base rate",
        base_tokens_per_day
    );
    Ok(())
}

/// Stake NFT and receive immediate DEAL token rewards based on lock duration
pub fn stake_nft_for_deal(ctx: Context<StakeNFT>, lock_duration_days: u64) -> Result<()> {
    require!(lock_duration_days >= 1, StakingError::LockPeriodTooShort);
    require!(lock_duration_days <= 1825, StakingError::LockPeriodTooLong); // Max 5 years

    let pool = &mut ctx.accounts.staking_pool;
    let stake_account = &mut ctx.accounts.stake_account;
    let clock = Clock::get()?;

    // Transfer NFT from user to program vault
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.user_nft_account.to_account_info(),
                to: ctx.accounts.vault_nft_account.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        ),
        1,
    )?;

    // Calculate reward multiplier and total DEAL tokens to mint
    let multiplier = calculate_multiplier(lock_duration_days);
    let total_deal_tokens =
        calculate_total_deal_reward(pool.base_tokens_per_day, lock_duration_days, multiplier)?;

    // Mint DEAL tokens immediately to user
    let config_key = pool.deal_config.key();
    let deal_config_seeds = &[b"deal_config".as_ref(), &[ctx.accounts.deal_config.bump]];
    let config_signer = &[&deal_config_seeds[..]];

    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.deal_token_mint.to_account_info(),
                to: ctx.accounts.user_deal_account.to_account_info(),
                authority: ctx.accounts.deal_config.to_account_info(),
            },
            config_signer,
        ),
        total_deal_tokens,
    )?;

    // Initialize stake account
    stake_account.user = ctx.accounts.user.key();
    stake_account.nft_mint = ctx.accounts.nft_mint.key();
    stake_account.staked_at = clock.unix_timestamp;
    stake_account.unlock_time = clock.unix_timestamp + (lock_duration_days as i64 * 86400);
    stake_account.lock_duration_days = lock_duration_days;
    stake_account.reward_multiplier = multiplier;
    stake_account.deal_tokens_received = total_deal_tokens;
    stake_account.streamflow_vesting_id = Pubkey::default(); // Can be set later
    stake_account.is_active = true;
    stake_account.bump = ctx.bumps.stake_account;

    pool.total_nfts_staked += 1;
    pool.total_deal_minted += total_deal_tokens;

    msg!(
        "🎉 NFT staked for {} days with {}x multiplier",
        lock_duration_days,
        multiplier
    );
    msg!("💰 Received {} DEAL tokens immediately!", total_deal_tokens);
    Ok(())
}

/// Unstake NFT after lock period ends - MUST return all DEAL tokens
pub fn unstake_nft(ctx: Context<UnstakeNFT>) -> Result<()> {
    let stake_account = &mut ctx.accounts.stake_account;
    let pool = &mut ctx.accounts.staking_pool;
    let clock = Clock::get()?;

    require!(stake_account.is_active, StakingError::StakeNotActive);
    require!(
        clock.unix_timestamp >= stake_account.unlock_time,
        StakingError::StillLocked
    );

    // CRITICAL: User must return ALL DEAL tokens received
    let required_deal_amount = stake_account.deal_tokens_received;
    require!(
        ctx.accounts.user_deal_account.amount >= required_deal_amount,
        StakingError::InsufficientDealTokens
    );

    // Burn the DEAL tokens (return them to the system)
    token::burn(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Burn {
                mint: ctx.accounts.deal_token_mint.to_account_info(),
                from: ctx.accounts.user_deal_account.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        ),
        required_deal_amount,
    )?;

    // PDA seeds for signing
    let authority_key = pool.authority.key();
    let seeds = &[b"staking_pool", authority_key.as_ref(), &[pool.bump]];
    let signer = &[&seeds[..]];

    // Transfer NFT back to user
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.vault_nft_account.to_account_info(),
                to: ctx.accounts.user_nft_account.to_account_info(),
                authority: ctx.accounts.staking_pool.to_account_info(),
            },
            signer,
        ),
        1,
    )?;

    stake_account.is_active = false;
    pool.total_nfts_staked -= 1;

    msg!("✅ NFT unstaked successfully!");
    msg!(
        "🔥 Burned {} DEAL tokens to retrieve NFT",
        required_deal_amount
    );
    Ok(())
}

/// Link StreamFlow vesting contract to stake (optional integration)
pub fn link_streamflow_vesting(
    ctx: Context<LinkStreamFlow>,
    vesting_contract_id: Pubkey,
) -> Result<()> {
    let stake_account = &mut ctx.accounts.stake_account;

    require!(stake_account.is_active, StakingError::StakeNotActive);
    require!(
        stake_account.user == ctx.accounts.user.key(),
        StakingError::Unauthorized
    );

    stake_account.streamflow_vesting_id = vesting_contract_id;

    msg!("🔗 StreamFlow vesting linked: {}", vesting_contract_id);
    Ok(())
}

/// Emergency unstake with penalty - must return 150% of DEAL tokens received
pub fn emergency_unstake(ctx: Context<EmergencyUnstake>) -> Result<()> {
    let stake_account = &mut ctx.accounts.stake_account;
    let pool = &mut ctx.accounts.staking_pool;

    require!(stake_account.is_active, StakingError::StakeNotActive);

    // PENALTY: Must return 150% of DEAL tokens for early withdrawal
    let penalty_amount = stake_account
        .deal_tokens_received
        .checked_mul(150)
        .and_then(|v| v.checked_div(100))
        .ok_or(StakingError::CalculationOverflow)?;

    require!(
        ctx.accounts.user_deal_account.amount >= penalty_amount,
        StakingError::InsufficientDealTokensForPenalty
    );

    // Burn the DEAL tokens with penalty
    token::burn(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Burn {
                mint: ctx.accounts.deal_token_mint.to_account_info(),
                from: ctx.accounts.user_deal_account.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        ),
        penalty_amount,
    )?;

    let authority_key = pool.authority.key();
    let seeds = &[b"staking_pool", authority_key.as_ref(), &[pool.bump]];
    let signer = &[&seeds[..]];

    // Transfer NFT back to user
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.vault_nft_account.to_account_info(),
                to: ctx.accounts.user_nft_account.to_account_info(),
                authority: ctx.accounts.staking_pool.to_account_info(),
            },
            signer,
        ),
        1,
    )?;

    stake_account.is_active = false;
    pool.total_nfts_staked -= 1;

    msg!("⚠️ Emergency unstake executed (early withdrawal)");
    msg!("🔥 Burned {} DEAL tokens (150% penalty)", penalty_amount);
    Ok(())
}

/// Calculate reward multiplier based on lock duration
fn calculate_multiplier(lock_duration_days: u64) -> u64 {
    match lock_duration_days {
        1..=7 => 100,     // 1.0x for 1-7 days
        8..=30 => 150,    // 1.5x for 8-30 days
        31..=90 => 200,   // 2.0x for 31-90 days
        91..=180 => 300,  // 3.0x for 91-180 days
        181..=365 => 500, // 5.0x for 181-365 days
        366..=730 => 800, // 8.0x for 1-2 years
        _ => 1000,        // 10.0x for 2+ years
    }
}

/// Calculate total DEAL tokens to receive upfront
fn calculate_total_deal_reward(
    base_tokens_per_day: u64,
    lock_duration_days: u64,
    multiplier: u64,
) -> Result<u64> {
    // Total DEAL = (base_per_day * days * multiplier) / 100
    let total_tokens = (base_tokens_per_day as u128)
        .checked_mul(lock_duration_days as u128)
        .and_then(|r| r.checked_mul(multiplier as u128))
        .and_then(|r| r.checked_div(100))
        .ok_or(StakingError::CalculationOverflow)?;

    Ok(total_tokens as u64)
}
