use anchor_lang::prelude::*;
#[error_code]
pub enum CollectionError {
    #[msg("Math operation overflow")]
    MathOverflow,
    
    #[msg("Unauthorized access")]
    Unauthorized,
    
    #[msg("NFT has already been redeemed")]
    AlreadyRedeemed,
    
    #[msg("Invalid mint address")]
    InvalidMint,
    
    #[msg("NFT not owned by signer")]
    NftNotOwned,
}
