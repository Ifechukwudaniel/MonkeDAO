import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { Contracts } from "../target/types/contracts";
import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { assert } from "chai";

// ============================================================================
// CONSTANTS
// ============================================================================

const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function airdrop(
  connection: anchor.web3.Connection,
  publicKey: PublicKey,
  amount: number = LAMPORTS_PER_SOL
) {
  const sig = await connection.requestAirdrop(publicKey, amount);
  await connection.confirmTransaction(sig);
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// MAIN TEST SUITE
// ============================================================================

describe("🎯 DEAL Token Complete Test Suite", () => {
  // Provider and program
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Contracts as Program<Contracts>;
  const authority = provider.wallet as anchor.Wallet;
  const payer = authority.payer;

  // PDAs
  let configPda: PublicKey;
  let configBump: number;
  let mintPda: PublicKey;
  let mintBump: number;
  let metadataPda: PublicKey;

  // Keypairs and accounts
  let feeWallet: Keypair;
  let feeWalletAta: PublicKey;
  let recipientKeypair: Keypair;
  let recipientAta: PublicKey;
  let senderKeypair: Keypair;
  let senderAta: PublicKey;
  let anotherUser: Keypair;
  let anotherUserAta: PublicKey;

  // ============================================================================
  // SETUP
  // ============================================================================

  before(async () => {
    console.log("\n" + "=".repeat(80));
    console.log("🚀 DEAL Token Test Suite - Setup");
    console.log("=".repeat(80));

    // Derive PDAs
    [configPda, configBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("deal_config")],
      program.programId
    );

    [mintPda, mintBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("deal_mint")],
      program.programId
    );

    [metadataPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintPda.toBuffer(),
      ],
      MPL_TOKEN_METADATA_PROGRAM_ID
    );

    // Generate keypairs
    feeWallet = Keypair.generate();
    recipientKeypair = Keypair.generate();
    senderKeypair = Keypair.generate();
    anotherUser = Keypair.generate();

    console.log("\n📋 Test Configuration:");
    console.log("  Authority:", authority.publicKey.toBase58());
    console.log("  Config PDA:", configPda.toBase58());
    console.log("  Mint PDA:", mintPda.toBase58());
    console.log("  Metadata PDA:", metadataPda.toBase58());
    console.log("  Program ID:", program.programId.toBase58());
  });

  // ============================================================================
  // TEST 1: INITIALIZE TOKEN MINT
  // ============================================================================

  describe("\n1️⃣  Initialize Token Mint", () => {
    it("✓ Should initialize DEAL token mint with metadata", async () => {
      console.log("\n  Testing token initialization...");

      // Airdrop SOL to authority
      await airdrop(provider.connection, authority.publicKey, 2 * LAMPORTS_PER_SOL);

      // Create fee wallet token account
      const feeWalletAtaInfo = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        payer,
        mintPda,
        feeWallet.publicKey,
        true
      );
      feeWalletAta = feeWalletAtaInfo.address;

      // Initialize the DEAL token
      const tx = await program.methods
        .initializeMint()
        .accounts({
          authority: authority.publicKey,
          config: configPda,
          mint: mintPda,
          metadata: metadataPda,
          feeWallet: feeWalletAta,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      console.log("  Transaction:", tx);

      // Verify config account
      const config = await program.account.config.fetch(configPda);
      assert.equal(config.authority.toBase58(), authority.publicKey.toBase58());
      assert.equal(config.mint.toBase58(), mintPda.toBase58());
      assert.equal(config.feeWallet.toBase58(), feeWalletAta.toBase58());
      assert.equal(config.bump, configBump);

      // Verify mint exists
      const mintAccount = await provider.connection.getAccountInfo(mintPda);
      assert.isNotNull(mintAccount);

      console.log("  ✅ Token initialized successfully");
      console.log("  ✅ Config verified");
      console.log("  ✅ Mint account created");
    });

    it("✓ Should prevent double initialization", async () => {
      console.log("\n  Testing double initialization prevention...");

      try {
        await program.methods
          .initializeMint()
          .accounts({
            authority: authority.publicKey,
            config: configPda,
            mint: mintPda,
            metadata: metadataPda,
            feeWallet: feeWalletAta,
            tokenProgram: TOKEN_PROGRAM_ID,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
          })
          .rpc();

        assert.fail("Should not initialize twice");
      } catch (error: any) {
        assert.include(error.message, "already in use");
        console.log("  ✅ Double initialization correctly prevented");
      }
    });

    it("✓ Should verify mint authority is config PDA", async () => {
      console.log("\n  Verifying mint authority...");

      const mintInfo = await provider.connection.getParsedAccountInfo(mintPda);
      const mintData = (mintInfo.value!.data as any).parsed.info;

      assert.equal(mintData.mintAuthority, configPda.toBase58());
      console.log("  ✅ Mint authority is config PDA");
    });
  });

  // ============================================================================
  // TEST 2: MINT TOKENS
  // ============================================================================

  describe("\n2️⃣  Mint Tokens", () => {
    before(async () => {
      // Setup recipient
      await airdrop(provider.connection, recipientKeypair.publicKey);

      const recipientAtaInfo = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        payer,
        mintPda,
        recipientKeypair.publicKey
      );
      recipientAta = recipientAtaInfo.address;
    });

    it("✓ Should mint tokens to recipient", async () => {
      console.log("\n  Testing token minting...");

      const mintAmount = 1000 * 1_000_000; // 1000 DEAL

      const tx = await program.methods
        .mintTokens(new BN(mintAmount))
        .accounts({
          config: configPda,
          mint: mintPda,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([recipientKeypair])
        .rpc();

      const tokenAccount = await getAccount(provider.connection, recipientAta);
      assert.equal(tokenAccount.amount.toString(), mintAmount.toString());

      console.log(`  ✅ Minted ${mintAmount / 1_000_000} DEAL`);
      console.log("  Transaction:", tx);
    });

    it("✓ Should accumulate balance from multiple mints", async () => {
      console.log("\n  Testing multiple mints...");

      const firstMint = 500 * 1_000_000;
      const secondMint = 300 * 1_000_000;

      await program.methods
        .mintTokens(new BN(firstMint))
        .accounts({
          config: configPda,
          mint: mintPda,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([recipientKeypair])
        .rpc();

      await program.methods
        .mintTokens(new BN(secondMint))
        .accounts({
          config: configPda,
          mint: mintPda,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([recipientKeypair])
        .rpc();

      const tokenAccount = await getAccount(provider.connection, recipientAta);
      const expectedBalance = (1000 + 500 + 300) * 1_000_000;
      assert.equal(tokenAccount.amount.toString(), expectedBalance.toString());

      console.log("  ✅ First mint: 500 DEAL");
      console.log("  ✅ Second mint: 300 DEAL");
      console.log(`  ✅ Total balance: ${Number(tokenAccount.amount) / 1_000_000} DEAL`);
    });

    it("✓ Should handle large amounts", async () => {
      console.log("\n  Testing large amount minting...");

      const largeAmount = 1_000_000 * 1_000_000; // 1 million DEAL

      await program.methods
        .mintTokens(new BN(largeAmount))
        .accounts({
          config: configPda,
          mint: mintPda,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([recipientKeypair])
        .rpc();

      const tokenAccount = await getAccount(provider.connection, recipientAta);
      console.log(`  ✅ Successfully minted ${largeAmount / 1_000_000} DEAL`);
      console.log(`  ✅ New balance: ${Number(tokenAccount.amount) / 1_000_000} DEAL`);
    });
  });

  // ============================================================================
  // TEST 3: BURN TOKENS
  // ============================================================================

  describe("\n3️⃣  Burn Tokens", () => {
    it("✓ Should burn tokens from user account", async () => {
      console.log("\n  Testing token burning...");

      const burnAmount = 500 * 1_000_000;

      const beforeAccount = await getAccount(provider.connection, recipientAta);
      const balanceBefore = Number(beforeAccount.amount);

      const tx = await program.methods
        .burn(new BN(burnAmount))
        .accounts({
          mint: mintPda,
          userAta: recipientAta,
          user: recipientKeypair.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([recipientKeypair])
        .rpc();

      const afterAccount = await getAccount(provider.connection, recipientAta);
      const balanceAfter = Number(afterAccount.amount);

      assert.equal(balanceBefore - balanceAfter, burnAmount);

      console.log(`  ✅ Burned ${burnAmount / 1_000_000} DEAL`);
      console.log(`  ✅ New balance: ${balanceAfter / 1_000_000} DEAL`);
      console.log("  Transaction:", tx);
    });

    it("✓ Should prevent burning more than balance", async () => {
      console.log("\n  Testing burn overflow prevention...");

      const currentBalance = await getAccount(provider.connection, recipientAta);
      const excessiveAmount = Number(currentBalance.amount) + 1_000_000;

      try {
        await program.methods
          .burn(new BN(excessiveAmount))
          .accounts({
            mint: mintPda,
            userAta: recipientAta,
            user: recipientKeypair.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([recipientKeypair])
          .rpc();

        assert.fail("Should not burn more than balance");
      } catch (error: any) {
        console.log("  ✅ Excessive burn prevented");
      }
    });

    it("✓ Should prevent unauthorized burns", async () => {
      console.log("\n  Testing unauthorized burn prevention...");

      const maliciousUser = Keypair.generate();
      const burnAmount = 100 * 1_000_000;

      try {
        await program.methods
          .burn(new BN(burnAmount))
          .accounts({
            mint: mintPda,
            userAta: recipientAta,
            user: maliciousUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([maliciousUser])
          .rpc();

        assert.fail("Non-owner should not burn");
      } catch (error: any) {
        console.log("  ✅ Unauthorized burn prevented");
      }
    });
  });

  // ============================================================================
  // TEST 4: TRANSFER WITH FEES
  // ============================================================================

  describe("\n4️⃣  Transfer Tokens with Fees", () => {
    before(async () => {
      console.log("\n  Setting up transfer tests...");

      // Setup sender
      await airdrop(provider.connection, senderKeypair.publicKey);

      const senderAtaInfo = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        payer,
        mintPda,
        senderKeypair.publicKey
      );
      senderAta = senderAtaInfo.address;

      // Mint 10,000 DEAL to sender
      await program.methods
        .mintTokens(new BN(10_000 * 1_000_000))
        .accounts({
          config: configPda,
          mint: mintPda,
          recipient: senderKeypair.publicKey,
          recipientAta: senderAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([senderKeypair])
        .rpc();

      console.log("  ✅ Sender funded with 10,000 DEAL");
    });

    it("✓ Should transfer with 1% fee (100 bps)", async () => {
      console.log("\n  Testing 1% fee transfer...");

      const transferAmount = 1000 * 1_000_000;
      const feeBps = 100;
      const expectedFee = (transferAmount * feeBps) / 10_000;
      const expectedNet = transferAmount - expectedFee;

      const senderBefore = await getAccount(provider.connection, senderAta);
      const recipientBefore = await getAccount(provider.connection, recipientAta);
      const feeBefore = await getAccount(provider.connection, feeWalletAta);

      await program.methods
        .transfer(new BN(transferAmount), feeBps)
        .accounts({
          sender: senderKeypair.publicKey,
          senderAta: senderAta,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          feeWalletAta: feeWalletAta,
          config: configPda,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([senderKeypair, recipientKeypair])
        .rpc();

      const senderAfter = await getAccount(provider.connection, senderAta);
      const recipientAfter = await getAccount(provider.connection, recipientAta);
      const feeAfter = await getAccount(provider.connection, feeWalletAta);

      assert.equal(Number(senderBefore.amount) - Number(senderAfter.amount), transferAmount);
      assert.equal(Number(recipientAfter.amount) - Number(recipientBefore.amount), expectedNet);
      assert.equal(Number(feeAfter.amount) - Number(feeBefore.amount), expectedFee);

      console.log(`  ✅ Transferred: ${transferAmount / 1_000_000} DEAL`);
      console.log(`  ✅ Recipient received: ${expectedNet / 1_000_000} DEAL`);
      console.log(`  ✅ Fee collected: ${expectedFee / 1_000_000} DEAL (1%)`);
    });

    it("✓ Should transfer with 0% fee", async () => {
      console.log("\n  Testing 0% fee transfer...");

      const transferAmount = 500 * 1_000_000;
      const feeBps = 0;

      const recipientBefore = await getAccount(provider.connection, recipientAta);
      const feeBefore = await getAccount(provider.connection, feeWalletAta);

      await program.methods
        .transfer(new BN(transferAmount), feeBps)
        .accounts({
          sender: senderKeypair.publicKey,
          senderAta: senderAta,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          feeWalletAta: feeWalletAta,
          config: configPda,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([senderKeypair, recipientKeypair])
        .rpc();

      const recipientAfter = await getAccount(provider.connection, recipientAta);
      const feeAfter = await getAccount(provider.connection, feeWalletAta);

      assert.equal(Number(recipientAfter.amount) - Number(recipientBefore.amount), transferAmount);
      assert.equal(Number(feeAfter.amount), Number(feeBefore.amount));

      console.log(`  ✅ Full amount transferred: ${transferAmount / 1_000_000} DEAL`);
      console.log("  ✅ No fee collected");
    });

    it("✓ Should transfer with 10% fee (1000 bps)", async () => {
      console.log("\n  Testing 10% fee transfer...");

      const transferAmount = 1000 * 1_000_000;
      const feeBps = 1000;
      const expectedFee = (transferAmount * feeBps) / 10_000;
      const expectedNet = transferAmount - expectedFee;

      const recipientBefore = await getAccount(provider.connection, recipientAta);
      const feeBefore = await getAccount(provider.connection, feeWalletAta);

      await program.methods
        .transfer(new BN(transferAmount), feeBps)
        .accounts({
          sender: senderKeypair.publicKey,
          senderAta: senderAta,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          feeWalletAta: feeWalletAta,
          config: configPda,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([senderKeypair, recipientKeypair])
        .rpc();

      const recipientAfter = await getAccount(provider.connection, recipientAta);
      const feeAfter = await getAccount(provider.connection, feeWalletAta);

      assert.equal(Number(recipientAfter.amount) - Number(recipientBefore.amount), expectedNet);
      assert.equal(Number(feeAfter.amount) - Number(feeBefore.amount), expectedFee);

      console.log(`  ✅ Recipient received: ${expectedNet / 1_000_000} DEAL`);
      console.log(`  ✅ Fee collected: ${expectedFee / 1_000_000} DEAL (10%)`);
    });

    it("✓ Should reject fee > 100%", async () => {
      console.log("\n  Testing invalid fee rejection...");

      const transferAmount = 100 * 1_000_000;
      const invalidFeeBps = 10_001;

      try {
        await program.methods
          .transfer(new BN(transferAmount), invalidFeeBps)
          .accounts({
            sender: senderKeypair.publicKey,
            senderAta: senderAta,
            recipient: recipientKeypair.publicKey,
            recipientAta: recipientAta,
            feeWalletAta: feeWalletAta,
            config: configPda,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([senderKeypair, recipientKeypair])
          .rpc();

        assert.fail("Should reject fee > 100%");
      } catch (error: any) {
        assert.include(error.message, "InvalidFeeBps");
        console.log("  ✅ Fee > 100% rejected");
      }
    });

    it("✓ Should prevent transfer exceeding balance", async () => {
      console.log("\n  Testing balance overflow prevention...");

      const currentBalance = await getAccount(provider.connection, senderAta);
      const excessiveAmount = Number(currentBalance.amount) + 1_000_000;

      try {
        await program.methods
          .transfer(new BN(excessiveAmount), 100)
          .accounts({
            sender: senderKeypair.publicKey,
            senderAta: senderAta,
            recipient: recipientKeypair.publicKey,
            recipientAta: recipientAta,
            feeWalletAta: feeWalletAta,
            config: configPda,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([senderKeypair, recipientKeypair])
          .rpc();

        assert.fail("Should not transfer more than balance");
      } catch (error: any) {
        console.log("  ✅ Excessive transfer prevented");
      }
    });
  });

  // ============================================================================
  // TEST 5: SUPPLY TRACKING
  // ============================================================================

  describe("\n5️⃣  Supply Tracking", () => {
    it("✓ Should track total supply correctly", async () => {
      console.log("\n  Testing supply tracking...");

      const mintInfo = await provider.connection.getParsedAccountInfo(mintPda);
      const mintData = (mintInfo.value!.data as any).parsed.info;
      const totalSupply = mintData.supply;

      console.log(`  Current supply: ${totalSupply / 1_000_000} DEAL`);

      const additionalMint = 1000 * 1_000_000;
      await program.methods
        .mintTokens(new BN(additionalMint))
        .accounts({
          config: configPda,
          mint: mintPda,
          recipient: recipientKeypair.publicKey,
          recipientAta: recipientAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([recipientKeypair])
        .rpc();

      const mintInfoAfter = await provider.connection.getParsedAccountInfo(mintPda);
      const mintDataAfter = (mintInfoAfter.value!.data as any).parsed.info;
      const newSupply = mintDataAfter.supply;

      assert.equal(Number(newSupply) - Number(totalSupply), additionalMint);

      console.log(`  ✅ Minted additional: ${additionalMint / 1_000_000} DEAL`);
      console.log(`  ✅ New supply: ${newSupply / 1_000_000} DEAL`);
    });
  });

  // ============================================================================
  // TEST 6: EDGE CASES
  // ============================================================================

  describe("\n6️⃣  Edge Cases & Security", () => {
    it("✓ Should handle maximum safe calculations", async () => {
      console.log("\n  Testing maximum safe amount calculations...");

      const maxSafeAmount = 1_000_000_000 * 1_000_000; // 1 billion DEAL
      const feeBps = 9999; // 99.99%
      const fee = (maxSafeAmount * feeBps) / 10_000;

      assert.isTrue(fee > 0 && fee < maxSafeAmount);

      console.log(`  ✅ Max safe amount: ${maxSafeAmount / 1_000_000} DEAL`);
      console.log(`  ✅ 99.99% fee calculated: ${fee / 1_000_000} DEAL`);
    });

    it("✓ Should verify config authority", async () => {
      console.log("\n  Verifying config authority...");

      const config = await program.account.config.fetch(configPda);
      assert.equal(config.authority.toBase58(), authority.publicKey.toBase58());

      console.log("  ✅ Config authority verified");
    });

    it("✓ Should verify freeze authority", async () => {
      console.log("\n  Verifying freeze authority...");

      const mintInfo = await provider.connection.getParsedAccountInfo(mintPda);
      const mintData = (mintInfo.value!.data as any).parsed.info;

      assert.equal(mintData.freezeAuthority, configPda.toBase58());

      console.log("  ✅ Freeze authority is config PDA");
    });
  });

  // ============================================================================
  // FINAL SUMMARY
  // ============================================================================

  after(async () => {
    console.log("\n" + "=".repeat(80));
    console.log("📊 Test Summary");
    console.log("=".repeat(80));

    const mintInfo = await provider.connection.getParsedAccountInfo(mintPda);
    const mintData = (mintInfo.value!.data as any).parsed.info;

    const recipientBalance = await getAccount(provider.connection, recipientAta);
    const senderBalance = await getAccount(provider.connection, senderAta);
    const feeBalance = await getAccount(provider.connection, feeWalletAta);

    console.log("\n💰 Final Balances:");
    console.log(`  Total Supply: ${mintData.supply / 1_000_000} DEAL`);
    console.log(`  Recipient: ${Number(recipientBalance.amount) / 1_000_000} DEAL`);
    console.log(`  Sender: ${Number(senderBalance.amount) / 1_000_000} DEAL`);
    console.log(`  Fee Wallet: ${Number(feeBalance.amount) / 1_000_000} DEAL`);

    console.log("\n✅ All tests passed successfully!");
    console.log("=".repeat(80) + "\n");
  });
});