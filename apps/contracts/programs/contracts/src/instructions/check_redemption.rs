use anchor_lang::prelude::*;
use crate::instructions::mint_collections::NftMetadata;


#[derive(Accounts)]
pub struct CheckRedemption<'info> {
    #[account(
        seeds = [b"nft_metadata", nft_metadata_account.mint.as_ref()],
        bump = nft_metadata_account.bump,
    )]
    pub nft_metadata_account: Account<'info, NftMetadata>,
}


pub fn check_redemption(ctx: Context<CheckRedemption>) -> Result<()> {
    let metadata = &ctx.accounts.nft_metadata_account;
    
    msg!("NFT Token ID: {}", metadata.token_id);
    msg!("Redeemed: {}", metadata.redeemed);
        
    if let Some(redeemed_at) = metadata.redeemed_at {
        msg!("Redeemed at: {}", redeemed_at);
    } else {
        msg!("Not yet redeemed");
    }
        
    Ok(())
}
