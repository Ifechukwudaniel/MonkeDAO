use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use anchor_spl::associated_token::AssociatedToken;
use mpl_token_metadata::{
    instructions::{
        CreateMetadataAccountV3Cpi, CreateMetadataAccountV3CpiAccounts, CreateMetadataAccountV3InstructionArgs,
        CreateMasterEditionV3Cpi, CreateMasterEditionV3CpiAccounts, CreateMasterEditionV3InstructionArgs,
    },
    types::DataV2,
};

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(
        mut,
        seeds = [b"factory", authority.key().as_ref(), factory.collection_name.as_bytes()],
        bump = factory.bump,
        has_one = authority
    )]
    pub factory: Account<'info, NFTFactory>,

    #[account(
        init,
        payer = authority,
        mint::decimals = 0,
        mint::authority = authority,
        mint::freeze_authority = authority,
    )]
    pub mint: Account<'info, Mint>,

    // On-chain metadata storage
    #[account(
        init,
        payer = authority,
        space = NftMetadata::SIZE,
        seeds = [b"nft_metadata", mint.key().as_ref()],
        bump
    )]
    pub nft_metadata_account: Account<'info, NftMetadata>,

    #[account(
        init,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = recipient,
    )]
    pub token_account: Account<'info, TokenAccount>,

    /// CHECK: Validated by Metaplex
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,

    /// CHECK: Validated by Metaplex
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: Can be any account
    pub recipient: UncheckedAccount<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    
    /// CHECK: Metaplex token metadata program
    pub token_metadata_program: UncheckedAccount<'info>,
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



pub fn mint_deal_nft(ctx: Context<MintNFT>, token_id_suffix: String) -> Result<()> {
    let factory = &mut ctx.accounts.factory;
    let nft_metadata = &mut ctx.accounts.nft_metadata_account;

    let name = format!("{} #{}", factory.collection_name, factory.nft_count);
    let symbol = factory.collection_symbol.clone();
    let uri = format!("{}/{}.json", factory.base_uri, token_id_suffix);

    token::mint_to(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
        ),
        1,
    )?;

    nft_metadata.mint = ctx.accounts.mint.key();
    nft_metadata.name = name.clone();
    nft_metadata.symbol = symbol.clone();
    nft_metadata.uri = uri.clone();
    nft_metadata.minted_at = Clock::get()?.unix_timestamp;
    nft_metadata.owner = ctx.accounts.recipient.key();
    nft_metadata.factory = factory.key();
    nft_metadata.token_id = factory.nft_count;
    nft_metadata.redeemed = false;
    nft_metadata.redeemed_at = None;
    nft_metadata.bump = ctx.bumps.nft_metadata_account;

    CreateMetadataAccountV3Cpi::new(
        &ctx.accounts.token_metadata_program.to_account_info(),
        CreateMetadataAccountV3CpiAccounts {
            metadata: &ctx.accounts.metadata.to_account_info(),
            mint: &ctx.accounts.mint.to_account_info(),
            mint_authority: &ctx.accounts.authority.to_account_info(),
            payer: &ctx.accounts.authority.to_account_info(),
            update_authority: (&ctx.accounts.authority.to_account_info(), true),
            system_program: &ctx.accounts.system_program.to_account_info(),
            rent: Some(&ctx.accounts.rent.to_account_info()),
        },
        CreateMetadataAccountV3InstructionArgs {
            data: DataV2 {
                name: name.clone(),
                symbol: symbol.clone(),
                uri: uri.clone(),
                seller_fee_basis_points: 0,
                creators: None,
                collection: None,
                uses: None,
            },
            is_mutable: true,
            collection_details: None,
        },
    ).invoke()?;

    CreateMasterEditionV3Cpi::new(
        &ctx.accounts.token_metadata_program.to_account_info(),
        CreateMasterEditionV3CpiAccounts {
            edition: &ctx.accounts.master_edition.to_account_info(),
            mint: &ctx.accounts.mint.to_account_info(),
            update_authority: &ctx.accounts.authority.to_account_info(),
            mint_authority: &ctx.accounts.authority.to_account_info(),
            payer: &ctx.accounts.authority.to_account_info(),
            metadata: &ctx.accounts.metadata.to_account_info(),
            token_program: &ctx.accounts.token_program.to_account_info(),
            system_program: &ctx.accounts.system_program.to_account_info(),
            rent: Some(&ctx.accounts.rent.to_account_info()),
        },
        CreateMasterEditionV3InstructionArgs {
            max_supply: Some(0),
        },
    ).invoke()?;

    factory.nft_count += 1;

    Ok(())
}
