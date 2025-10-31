#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;

pub mod error;
pub mod instructions;

use instructions::*;

declare_id!("9mPHcXYZkfYU9BBuFbT8driwX2ddL42pAs6JXXTseQwK");

#[program]
pub mod contracts {
    use super::*;
    pub fn create_collection(
        ctx: Context<CreateCollection>,
        collection_name: String,
        collection_symbol: String,
        base_uri: String,
    ) -> Result<()> {
        instructions::create_collections::create_collections(
            ctx,
            collection_name,
            collection_symbol,
            base_uri,
        )
    }

    pub fn mint_nft(ctx: Context<MintNFT>, name: String) -> Result<()> {
        instructions::mint_collections::mint_deal_nft(ctx, name)
    }

    pub fn initialize_token_mint(ctx: Context<InitializeTokenMint>) -> Result<()> {
        instructions::deal_token::initialize_mint(ctx)
    }

    pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
        instructions::deal_token::mint_tokens(ctx, amount)
    }

    pub fn burn(ctx: Context<BurnTokens>, amount: u64) -> Result<()> {
        instructions::deal_token::burn(ctx, amount)
    }

    pub fn transfer(ctx: Context<TransferTokens>, amount: u64, fee_bps: u16) -> Result<()> {
        instructions::deal_token::transfer(ctx, amount, fee_bps)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
