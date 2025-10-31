import type { FilterState } from 'components/MarketPlaceFilter';
import type { ProductDeal, RedemptionPayload, VerificationResult } from 'types';

/* ╔════════════════════════════════════════════╗
   ║                Parse Filters.              ║
   ╚════════════════════════════════════════════╝ */
export const parseFiltersFromParams = (
  searchParams: URLSearchParams,
  defaultFilters: FilterState,
): FilterState => {
  const newFilters: FilterState = { ...defaultFilters };

  if (searchParams.has('distance'))
    newFilters.distance = Number(searchParams.get('distance'));
  if (searchParams.has('location'))
    newFilters.location = searchParams.get('location') || '';
  if (searchParams.has('categories'))
    newFilters.categories = searchParams.get('categories')?.split(',') || [];
  if (searchParams.has('isGift'))
    newFilters.isGift = searchParams.get('isGift') === 'true';
  if (searchParams.has('priceMin') || searchParams.has('priceMax')) {
    newFilters.priceRange = [
      Number(searchParams.get('priceMin')) || 0,
      Number(searchParams.get('priceMax')) || 10000,
    ];
  }
  if (searchParams.has('dealScore'))
    newFilters.dealScore = Number(searchParams.get('dealScore'));
  if (searchParams.has('verifiedMerchant'))
    newFilters.verifiedMerchant =
      searchParams.get('verifiedMerchant') === 'true';
  if (searchParams.has('nftMintable'))
    newFilters.nftMintable = searchParams.get('nftMintable') === 'true';
  if (searchParams.has('trending'))
    newFilters.trending = searchParams.get('trending') === 'true';
  if (searchParams.has('transferable'))
    newFilters.transferable = searchParams.get('transferable') === 'true';
  if (searchParams.has('tradeable'))
    newFilters.tradeable = searchParams.get('tradeable') === 'true';
  if (searchParams.has('giftable'))
    newFilters.giftable = searchParams.get('giftable') === 'true';

  return newFilters;
};

/* ╔════════════════════════════════════════════╗
   ║      Convert Filters to Params             ║
   ╚════════════════════════════════════════════╝ */
export const filtersToParams = (filters: FilterState): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.distance) params.set('distance', String(filters.distance));
  if (filters.location) params.set('location', filters.location);
  if (filters.categories.length > 0)
    params.set('categories', filters.categories.join(','));
  if (filters.isGift !== null) params.set('isGift', String(filters.isGift));
  if (filters.priceRange[0] > 0)
    params.set('priceMin', String(filters.priceRange[0]));
  if (filters.priceRange[1] < 10000)
    params.set('priceMax', String(filters.priceRange[1]));
  if (filters.dealScore) params.set('dealScore', String(filters.dealScore));
  if (filters.verifiedMerchant) params.set('verifiedMerchant', 'true');
  if (filters.nftMintable) params.set('nftMintable', 'true');
  if (filters.trending) params.set('trending', 'true');
  if (filters.transferable) params.set('transferable', 'true');
  if (filters.tradeable) params.set('tradeable', 'true');
  if (filters.giftable) params.set('giftable', 'true');

  return params;
};

/* ╔════════════════════════════════════════════╗
   ║          Apply Filters to Deal             ║
   ╚════════════════════════════════════════════╝ */
export const applyDealFilters = (
  deals: ProductDeal[],
  filters: FilterState,
): ProductDeal[] => {
  return deals.filter((deal) => {
    if (filters.distance && deal.location.distanceFromCenter) {
      if (deal.location.distanceFromCenter > filters.distance) return false;
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      const matchesLocation =
        deal.location.city.toLowerCase().includes(locationLower) ||
        deal.location.state?.toLowerCase().includes(locationLower) ||
        deal.location.country.toLowerCase().includes(locationLower);
      if (!matchesLocation) return false;
    }

    if (filters.categories.length > 0) {
      if (!filters.categories.includes(deal.category)) return false;
    }

    if (
      deal.pricing.discountedPrice < filters.priceRange[0] ||
      deal.pricing.discountedPrice > filters.priceRange[1]
    )
      return false;

    if (filters.dealScore && deal.dealScore < filters.dealScore) return false;
    if (filters.verifiedMerchant && !deal.merchant.verifiedMerchant)
      return false;
    if (filters.nftMintable && !deal.nftDetails.mintable) return false;
    if (filters.trending && !deal.purchaseStats.trending) return false;
    if (filters.transferable && !deal.nftDetails.transferable) return false;

    return true;
  });
};

/* ╔════════════════════════════════════════════╗
   ║                Validation.                 ║
   ╚════════════════════════════════════════════╝ */
export const validateQrPayload = (data: string): RedemptionPayload | null => {
  try {
    const parsed = JSON.parse(data);

    if (
      !parsed.dealId ||
      !parsed.couponId ||
      !parsed.user ||
      !parsed.timestamp
    ) {
      throw new Error('Missing required fields');
    }

    return parsed;
  } catch (err) {
    console.error('Invalid QR payload:', err);
    return null;
  }
};

/* ╔════════════════════════════════════════════╗
   ║                Formatter                   ║
   ╚════════════════════════════════════════════╝ */
export const formatTimestamp = (timestamp: number) =>
  new Date(timestamp).toLocaleString();

export const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

/* ╔════════════════════════════════════════════╗
   ║                Verify Redemption             ║
   ╚════════════════════════════════════════════╝ */

export const verifyRedemption = async (
  payload: RedemptionPayload,
): Promise<VerificationResult> => {
  // TODO: Replace with actual backend/blockchain verification
  // This should include:
  // 1. Verify signature authenticity
  // 2. Check NFT/coupon ownership on-chain
  // 3. Verify coupon hasn't been redeemed (check redemption status)
  // 4. Validate timestamp and expiration

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const now = Date.now();
  const qrAge = now - payload.timestamp;
  const qrExpired = qrAge > 1000 * 60 * 5;
  const dealExpired = payload.expiresAt && now > payload.expiresAt;
  const alreadyRedeemed = Math.random() > 0.7;
  const validSignature = payload.signature && payload.signature.length > 20;
  const validOwnership = payload.user && payload.user.length > 10;

  const warnings: string[] = [];
  if (qrAge > 1000 * 60 * 2) warnings.push('QR code is older than 2 minutes');

  if (alreadyRedeemed)
    return {
      success: false,
      message: 'Coupon Already Redeemed',
      details: { alreadyRedeemed: true },
    };
  if (qrExpired)
    return {
      success: false,
      message: 'QR Code Expired',
      details: { expired: true },
    };
  if (dealExpired)
    return {
      success: false,
      message: 'Deal Has Expired',
      details: { expired: true },
    };
  if (!validSignature)
    return {
      success: false,
      message: 'Invalid Signature',
      details: { invalidSignature: true },
    };
  if (!validOwnership)
    return {
      success: false,
      message: 'Ownership Verification Failed',
      details: { ownership: false },
    };

  return {
    success: true,
    message: 'Redemption Verified Successfully',
    warnings: warnings.length > 0 ? warnings : undefined,
  };
};
// /*
// /**
//  * Signs a message using the Solana wallet provider.
//  * @param {object} walletProvider - The connected wallet provider.
//  * @param {string} nonce - A unique nonce for the message.
//  * @returns {Promise<string>} - The signed message in hexadecimal format.
//  */
// export const signMessage = async (walletProvider: Provider, nonce: string) => {
//   try {
//     const message = `Sign this message to authenticate to Paystream. This request will not trigger a blockchain transaction or cost any gas fees. iat: ${nonce}`;

//     const encodedMessage = new TextEncoder().encode(message);

//     const signature = await walletProvider.signMessage(encodedMessage);

//     const signatureHex = Buffer.from(signature).toString('hex');

//     return signatureHex;
//   } catch (error) {
//     console.error('Error signing message:', error);
//     throw error;
//   }
// };

// import { PublicKey } from '@solana/web3.js';
// import nacl from 'tweetnacl';

// /**
//  * Verifies a signed message using the wallet's public key.
//  * @param {string} publicKey - The wallet's public key.
//  * @param {string} signatureHex - The signed message in hexadecimal format.
//  * @param {string} nonce - The nonce used in the original message.
//  * @returns {boolean} - True if the signature is valid, false otherwise.
//  */
// export const verifyMessage = (
//   publicKey: string,
//   signatureHex: string,
//   nonce: string,
// ) => {
//   try {
//     const message = `Sign this message to authenticate to Monkedeal. This request will not trigger a blockchain transaction or cost any gas fees. iat: ${nonce}`;

//     const encodedMessage = new TextEncoder().encode(message);

//     const signatureBuffer = Buffer.from(signatureHex, 'hex');
//     const publicKeyBytes = new PublicKey(publicKey).toBytes();

//     const isValid = nacl.sign.detached.verify(
//       encodedMessage,
//       signatureBuffer,
//       publicKeyBytes,
//     );

//     return isValid;
//   } catch (error) {
//     console.error('Error verifying message:', error);
//     return false;
//   }
// }; */
