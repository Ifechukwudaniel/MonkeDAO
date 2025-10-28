use anchor_lang::prelude::*;

declare_id!("9mPHcXYZkfYU9BBuFbT8driwX2ddL42pAs6JXXTseQwK");

#[program]
pub mod contracts {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
