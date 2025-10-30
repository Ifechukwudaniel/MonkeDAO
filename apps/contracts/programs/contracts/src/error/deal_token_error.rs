use anchor_lang::prelude::*;

#[error_code]
pub enum DealError {
    #[msg("Fee cannot exceed 100% (10000 basis points)")]
    InvalidFeeBps,
    #[msg("Math overflow occurred")]
    MathOverflow,
}
