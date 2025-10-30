use anchor_lang::prelude::*;
use anchor_spl::{
    token::{self, Mint, Token, TokenAccount, MintTo, Burn, Transfer},
    metadata::{create_metadata_accounts_v3, CreateMetadataAccountsV3,},
};
use mpl_token_metadata::types::DataV2;
use crate::error::DealError;

#[derive(Accounts)]
pub struct InitializeTokenMint<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        seeds = [b"deal_config"],
        bump,
        space = 8 + 32 + 32 + 32 + 1
    )]
    pub config: Account<'info, Config>,

    #[account(
        init,
        payer = authority,
        mint::decimals = 6,
        mint::authority = config,
        mint::freeze_authority = config,
        seeds = [b"deal_mint"],
        bump
    )]
    pub mint: Account<'info, Mint>,

    /// CHECK: Created via CPI
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,

    #[account(mut)]
    pub fee_wallet: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    #[account(address = mpl_token_metadata::ID)]
    pub metadata_program: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct MintTokens<'info> {
    #[account(seeds = [b"deal_config"], bump = config.bump)]
    pub config: Account<'info, Config>,

    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub recipient: Signer<'info>,

    #[account(mut)]
    pub recipient_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct BurnTokens<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub user_ata: Account<'info, TokenAccount>,

    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct TransferTokens<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,

    #[account(mut)]
    pub sender_ata: Account<'info, TokenAccount>,

    #[account(mut)]
    pub recipient: Signer<'info>,

    #[account(mut)]
    pub recipient_ata: Account<'info, TokenAccount>,

    #[account(mut)]
    pub fee_wallet_ata: Account<'info, TokenAccount>,

    #[account(seeds = [b"deal_config"], bump = config.bump)]
    pub config: Account<'info, Config>,

    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Config {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub fee_wallet: Pubkey,
    pub bump: u8,
}

pub fn initialize_mint(ctx: Context<InitializeTokenMint>) -> Result<()> {
    let config = &mut ctx.accounts.config;
    config.authority = ctx.accounts.authority.key();
    config.mint = ctx.accounts.mint.key();
    config.fee_wallet = ctx.accounts.fee_wallet.key();
    config.bump = ctx.bumps.config;

    // PDA signer seeds
    let seeds: &[&[u8]] = &[b"deal_config", &[config.bump]];
    let signer_seeds: &[&[&[u8]]] = &[&seeds];

    // Create metadata for the mint
    create_metadata_accounts_v3(
        CpiContext::new_with_signer(
            ctx.accounts.metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                mint_authority: ctx.accounts.config.to_account_info(),
                update_authority: ctx.accounts.config.to_account_info(),
                payer: ctx.accounts.authority.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
            signer_seeds,
        ),
        DataV2 {
            name: "Deal Token".to_string(),
            symbol: "DEAL".to_string(),
            uri: "https://example.com/deal-token.json".to_string(),
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None
        },
        true,
        true,
        None,
    )?;

    msg!("✅ Deal Token initialized successfully!");
    Ok(())
}

pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
    let config_seeds : &[&[u8]] = &[b"deal_config", &[ctx.accounts.config.bump]];
    let signer_seeds = &[&config_seeds[..]];

    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.recipient_ata.to_account_info(),
            authority: ctx.accounts.config.to_account_info(),
        },
        signer_seeds,
    );

    token::mint_to(cpi_ctx, amount)?;
    msg!("✅ Minted {} DEAL to {}", amount, ctx.accounts.recipient.key());
    Ok(())
}

/// Burn tokens from a user ATA
pub fn burn(ctx: Context<BurnTokens>, amount: u64) -> Result<()> {
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.user_ata.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        },
    );

    token::burn(cpi_ctx, amount)?;
    msg!("🔥 Burned {} DEAL from {}", amount, ctx.accounts.user.key());
    Ok(())
}

pub fn transfer(ctx: Context<TransferTokens>, amount: u64, fee_bps: u16) -> Result<()> {
    require!(fee_bps <= 10_000, DealError::InvalidFeeBps);

    let fee = amount
        .checked_mul(fee_bps as u64)
        .ok_or(DealError::MathOverflow)?
        .checked_div(10_000)
        .ok_or(DealError::MathOverflow)?;
    let net = amount.checked_sub(fee).ok_or(DealError::MathOverflow)?;

    // Transfer net to recipient
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.sender_ata.to_account_info(),
                to: ctx.accounts.recipient_ata.to_account_info(),
                authority: ctx.accounts.sender.to_account_info(),
            },
        ),
        net,
    )?;

    // Transfer fee to fee wallet
    if fee > 0 {
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.sender_ata.to_account_info(),
                    to: ctx.accounts.fee_wallet_ata.to_account_info(),
                    authority: ctx.accounts.sender.to_account_info(),
                },
            ),
            fee,
        )?;
    }

    msg!(
        "💸 Sent {} DEAL (fee: {}) from {} to {}",
        net,
        fee,
        ctx.accounts.sender.key(),
        ctx.accounts.recipient.key()
    );
    Ok(())
}