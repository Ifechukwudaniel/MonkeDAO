use crate::{error::CollectionError, NftMetadata};
use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;

#[derive(Accounts)]
pub struct RedeemNft<'info> {
    #[account(
        mut,
        seeds = [b"nft_metadata", nft_metadata_account.mint.as_ref()],
        bump = nft_metadata_account.bump,
    )]
    pub nft_metadata_account: Account<'info, NftMetadata>,

    #[account(
        constraint = token_account.mint == nft_metadata_account.mint @ CollectionError::InvalidMint,
        constraint = token_account.owner == owner.key() @ CollectionError::Unauthorized,
        constraint = token_account.amount == 1 @ CollectionError::NftNotOwned,
    )]
    pub token_account: Account<'info, TokenAccount>,

    pub owner: Signer<'info>,
}

/// Redeem an NFT (mark as redeemed)
pub fn redeem_nft(ctx: Context<RedeemNft>) -> Result<()> {
    let metadata = &mut ctx.accounts.nft_metadata_account;

    // Check if already redeemed
    require!(!metadata.redeemed, CollectionError::AlreadyRedeemed);

    // Mark as redeemed
    metadata.redeemed = true;
    metadata.redeemed_at = Some(Clock::get()?.unix_timestamp);

    msg!(
        "✅ NFT #{} redeemed by {}",
        metadata.token_id,
        ctx.accounts.owner.key()
    );
    msg!("Redeemed at: {}", metadata.redeemed_at.unwrap());

    Ok(())
}
