import * as anchor from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";

describe("deal_token", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Contracts; // your program name

  const authority = provider.wallet;

  it("Initialize Deal Token", async () => {
    // Derive PDAs
    const [configPda, configBump] = await PublicKey.findProgramAddress(
      [Buffer.from("deal_config")],
      program.programId
    );

    const [mintPda, mintBump] = await PublicKey.findProgramAddress(
      [Buffer.from("deal_mint")],
      program.programId
    );

    // Standard Metaplex metadata PDA
    const [metadataPda] = await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
        mintPda.toBuffer(),
      ],
      new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
    );

    // Create fee wallet ATA (must exist before call)
    const feeWalletAta = getAssociatedTokenAddressSync(mintPda, authority.publicKey);

    const tx = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        authority.publicKey,
        feeWalletAta,
        authority.publicKey,
        mintPda
      )
    );

    await provider.sendAndConfirm(tx);

    // Now call the initialize_deal_token instruction
    await program.methods
      .initializeDealToken() // matches the name in lib.rs
      .accounts({
        authority: authority.publicKey,
        config: configPda,
        mint: mintPda,
        metadata: metadataPda,
        feeWallet: feeWalletAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        metadataProgram: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    console.log("✅ Deal Token initialized successfully!");
  });
});
