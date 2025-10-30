use anchor_lang::prelude::*;

pub mod instructions;
pub mod error;

use instructions::*;


declare_id!("9mPHcXYZkfYU9BBuFbT8driwX2ddL42pAs6JXXTseQwK");

#[program]
pub mod contracts {
    use super::*;
    pub fn create_collection(ctx: Context<CreateCollection>, collection_name: String, collection_symbol: String, base_uri: String) -> Result<()> {
        instructions::create_collections::create_collections(ctx, collection_name, collection_symbol, base_uri)   
    }

    pub fn mint_nft(ctx: Context<MintNFT>, name: String) -> Result<()> {
        instructions::mint_collections::mint_deal_nft(ctx, name)
    }

    pub fn initialize_deal_token(ctx: Context<InitializeTokenMint>) -> Result<()> {
        instructions::deal_token::initialize_mint(ctx)
    }

}

#[derive(Accounts)]
pub struct Initialize {}
