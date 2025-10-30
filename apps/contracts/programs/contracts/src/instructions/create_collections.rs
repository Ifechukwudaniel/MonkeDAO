use anchor_lang::prelude::*;


#[derive(Accounts)]
#[instruction(collection_name: String)]
pub struct CreateCollection<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 54 + 14 + 204 + 8 + 1,
        seeds = [b"factory", authority.key().as_ref(), collection_name.as_bytes()],
        bump
    )]
    pub factory: Account<'info, NFTFactory>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>
}


#[account]
pub struct NFTFactory {
    pub authority: Pubkey,          // 32
    pub collection_name: String,    // 4 + 50
    pub collection_symbol: String,  // 4 + 10 (NEW)
    pub base_uri: String,           // 4 + 200 (NEW)
    pub nft_count: u64,             // 8
    pub bump: u8,                   // 1
}

#[account]
pub struct NftMetadata {
    pub mint: Pubkey,           // 32
    pub name: String,           // 4 + 50
    pub symbol: String,         // 4 + 10
    pub uri: String,            // 4 + 200 (points to full metadata)
    pub minted_at: i64,         // 8
    pub owner: Pubkey,          // 32
    pub factory: Pubkey,        // 32
    pub token_id: u64,          // 8
    pub redeemed: bool,         // 1 (NEW)
    pub redeemed_at: Option<i64>, // 1 + 8 = 9 (NEW - optional timestamp)
    pub bump: u8,               // 1
}

impl NftMetadata {
    pub const SIZE: usize = 8 + 32 + 54 + 14 + 204 + 8 + 32 + 32 + 8 + 1 + 9 + 1;
}

pub fn create_collections(ctx: Context<CreateCollection>, collection_name: String, collection_symbol: String, base_uri: String) -> Result<()> {
    let factory = &mut ctx.accounts.factory;
    factory.authority = ctx.accounts.authority.key();
    factory.collection_name = collection_name;
    factory.collection_symbol = collection_symbol;
    factory.base_uri = base_uri;
    factory.nft_count = 0;
    factory.bump = ctx.bumps.factory;
    Ok(())
}