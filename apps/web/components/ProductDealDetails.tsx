'use client';

import { Clock, GitBranch, Heart, MapPin, Share2, Tag } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import type { ProductDeal } from '../types/index';

/**
 * ProductDealDetail.tsx
 *
 * - Exports: ProductDealDetail (default)
 * - Subcomponents: DealGallery, DealHeader, MerchantCard, PurchasePanel, NFTMeta, ReviewsList, TagsRow
 *
 * Notes:
 * - All actions (buy, mint, wishlist, share) are placeholders for you to wire to real logic.
 * - Uses your ProductDeal type from types/deal.ts
 */

/* ----------------------------- Helper types ----------------------------- */

type PurchaseHandler = (optionId: string) => void;
type WishlistHandler = (dealId: string) => void;

/* ---------------------------- DealGallery -------------------------------- */

const DealGallery: React.FC<{
  images: string[];
  banner: string;
  title: string;
}> = ({ images, banner, title }) => {
  const gallery = useMemo(() => [banner, ...images], [banner, images]);
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100">
        <Image
          src={gallery[active]}
          alt={`${title} image ${active}`}
          fill
          className="object-cover"
          onError={() => {}}
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {gallery.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 relative h-16 w-24 rounded-md overflow-hidden border ${
                i === active
                  ? 'ring-2 ring-offset-1 ring-indigo-400'
                  : 'border-neutral-200'
              }`}
            >
              <Image
                src={src}
                alt={`thumb-${i}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ----------------------------- TagsRow ---------------------------------- */

const TagsRow: React.FC<{ tags: string[] }> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
        >
          <Tag className="w-3 h-3" /> {t}
        </span>
      ))}
    </div>
  );
};

/* ---------------------------- DealHeader -------------------------------- */

const DealHeader: React.FC<{
  deal: ProductDeal;
  liked: boolean;
  onToggleWishlist: () => void;
  onShare: () => void;
}> = ({ deal, liked, onToggleWishlist, onShare }) => {
  return (
    <header className="mb-4">
      <h1 className="text-2xl md:text-3xl font-bold leading-tight">
        {deal.title}
      </h1>
      <p className="mt-2 text-sm text-neutral-500">{deal.shortDescription}</p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1 text-sm">
            <MapPin className="w-4 h-4 text-neutral-600" />
            <span className="text-xs text-neutral-600">
              {deal.location.city ?? deal.location.country}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1 text-sm">
            <Clock className="w-4 h-4 text-neutral-600" />
            <span className="text-xs text-neutral-600">
              {deal.availability.startDate} → {deal.availability.endDate}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1 text-sm">
            <GitBranch className="w-4 h-4 text-neutral-600" />
            <span className="text-xs text-neutral-600">
              DealScore: {deal.dealScore}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleWishlist}
            aria-label="Add to wishlist"
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
              liked
                ? 'bg-rose-50 text-rose-600'
                : 'bg-neutral-50 text-neutral-700'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{liked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={onShare}
            aria-label="Share deal"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-neutral-50 text-neutral-700 text-sm font-medium"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <TagsRow tags={deal.tags} />
    </header>
  );
};

/* --------------------------- MerchantCard ------------------------------- */

const MerchantCard: React.FC<{ merchant: ProductDeal['merchant'] }> = ({
  merchant,
}) => {
  return (
    <aside className="rounded-lg border border-neutral-200 p-3 bg-white/50">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center">
          {merchant.logoUrl ? (
            <Image
              src={merchant.logoUrl}
              alt={merchant.name}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <div className="text-sm font-semibold text-neutral-700">
              {merchant.name.slice(0, 2)}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold">{merchant.name}</div>
          <div className="text-xs text-neutral-500">
            Joined {new Date(merchant.dateJoined).getFullYear()} ·{' '}
            {merchant.totalDeals} deals
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm text-neutral-600">
        <div>
          Rating:{' '}
          <span className="font-semibold">{merchant.merchantRating}/5</span> (
          {merchant.totalReviews})
        </div>
        {merchant.verifiedMerchant && (
          <div className="mt-1 text-xs text-green-600 font-semibold">
            Verified Merchant
          </div>
        )}
      </div>
    </aside>
  );
};

/* --------------------------- PurchasePanel ------------------------------ */

const PurchasePanel: React.FC<{
  deal: ProductDeal;
  onPurchase: PurchaseHandler;
  onMint?: (optionId: string) => void;
}> = ({ deal, onPurchase, onMint }) => {
  const [selected, setSelected] = useState<string | null>(
    deal.options[0]?.id ?? null,
  );

  const selOption =
    deal.options.find((o) => o.id === selected) ?? deal.options[0];

  return (
    <div className="rounded-lg border border-neutral-200 p-4 bg-white/50">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-neutral-400">Price</div>
          <div className="text-2xl font-bold text-emerald-700">
            {deal.pricing.currency}{' '}
            {selOption
              ? (selOption.discountedPrice ?? deal.pricing.discountedPrice)
              : deal.pricing.discountedPrice}
          </div>
          <div className="text-sm text-neutral-400 line-through">
            {deal.pricing.currency}{' '}
            {selOption
              ? (selOption.originalPrice ?? deal.pricing.originalPrice)
              : deal.pricing.originalPrice}
          </div>
        </div>

        <div className="text-right text-xs text-neutral-500">
          <div>
            Sold:{' '}
            <span className="font-semibold">
              {deal.purchaseStats.totalPurchased}
            </span>
          </div>
          <div className="mt-1">
            Available:{' '}
            <span className="font-semibold">
              {selOption?.available ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-xs text-neutral-500">Options</label>
        <div className="mt-2 flex flex-col gap-2">
          {deal.options.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`text-left rounded-md px-3 py-2 border ${
                selected === o.id
                  ? 'border-indigo-400 bg-indigo-50'
                  : 'border-neutral-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{o.name}</div>
                  <div className="text-xs text-neutral-500">
                    {deal.pricing.currency} {o.discountedPrice} ·{' '}
                    {o.available ? 'Available' : 'Sold out'}
                  </div>
                </div>
                <div className="text-xs text-neutral-400">
                  {o.maxGuests ? `${o.maxGuests} pax` : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => selected && onPurchase(selected)}
          disabled={!selOption?.available}
          className="flex-1 rounded-md bg-emerald-600 text-white px-4 py-2 font-semibold disabled:opacity-50"
        >
          Buy / Claim
        </button>

        {deal.nftDetails.mintable && (
          <button
            onClick={() => selected && onMint?.(selected)}
            className="rounded-md border border-neutral-200 px-4 py-2 font-semibold"
          >
            Mint NFT
          </button>
        )}
      </div>

      <div className="mt-3 text-xs text-neutral-500">
        <strong>Note:</strong> NFTs may be minted on-chain at purchase;
        royalties and transfer rules apply per listing.
      </div>
    </div>
  );
};

/* ---------------------------- NFTMeta ----------------------------------- */

const NFTMeta: React.FC<{
  nft: ProductDeal['nftDetails'];
  blockchain: ProductDeal['blockchain'];
}> = ({ nft, blockchain }) => {
  return (
    <div className="rounded-lg border border-neutral-200 p-3 bg-white/50 text-sm">
      <div className="font-semibold">NFT Metadata</div>
      <div className="mt-2 space-y-1">
        <div>
          Mintable: <strong>{nft.mintable ? 'Yes' : 'No'}</strong>
        </div>
        <div>
          Standard: <strong>{nft.tokenStandard}</strong>
        </div>
        <div>
          Transferable: <strong>{nft.transferable ? 'Yes' : 'No'}</strong>
        </div>
        {typeof nft.royaltyPercentage !== 'undefined' && (
          <div>
            Royalty: <strong>{nft.royaltyPercentage}%</strong>
          </div>
        )}
        {nft.maxSupply && (
          <div>
            Max supply: <strong>{nft.maxSupply}</strong>
          </div>
        )}
        {nft.currentMinted !== undefined && (
          <div>
            Minted: <strong>{nft.currentMinted}</strong>
          </div>
        )}
        <div>
          Chain: <strong>{blockchain.chainId}</strong>
        </div>
        <div>
          Contract:{' '}
          <code className="text-xs">{blockchain.contractAddress}</code>
        </div>
      </div>
    </div>
  );
};

/* --------------------------- ReviewsList -------------------------------- */

const ReviewsList: React.FC<{ reviews: ProductDeal['reviews'] }> = ({
  reviews,
}) => {
  if (!reviews || reviews.length === 0)
    return (
      <div className="text-sm text-neutral-500">
        No reviews yet — be the first to drop feedback.
      </div>
    );

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="rounded-md border border-neutral-100 p-3 bg-white/50"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-semibold">
              {r.userName.slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.userName}</div>
                <div className="text-xs text-neutral-400">
                  {new Date(r.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-neutral-600 mt-1">{r.title}</div>
              <div className="mt-2 text-sm text-neutral-700">{r.comment}</div>
              <div className="mt-2 text-xs text-neutral-500">
                Helpful: {r.helpful}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------- ProductDealDetail ----------------------------- */

export const ProductDealDetail: React.FC<{
  deal: ProductDeal;
  onPurchase?: PurchaseHandler;
  onMint?: (optionId: string) => void;
  onToggleWishlist?: WishlistHandler;
}> = ({
  deal,
  onPurchase = () => {},
  onMint = () => {},
  onToggleWishlist = () => {},
}) => {
  const [liked, setLiked] = useState(false);

  const handleWishlist = () => {
    setLiked((v) => !v);
    onToggleWishlist(deal.id);
  };

  const handleShare = () => {
    // basic web share fallback
    if (navigator.share) {
      navigator
        .share({
          title: deal.title,
          text: deal.shortDescription,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      // fallback copy
      void navigator.clipboard?.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Gallery */}
        <div className="lg:col-span-2 space-y-4">
          <DealGallery
            images={deal.images}
            banner={deal.bannerImage}
            title={deal.title}
          />
          <DealHeader
            deal={deal}
            liked={liked}
            onToggleWishlist={handleWishlist}
            onShare={handleShare}
          />

          <section className="rounded-lg border border-neutral-200 p-4 bg-white/50">
            <h3 className="font-semibold mb-2">About this deal</h3>
            <p className="text-sm text-neutral-700">{deal.description}</p>

            {deal.amenities && (
              <>
                <h4 className="mt-4 font-medium">Inclusions</h4>
                <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-neutral-600">
                  {deal.amenities.map((a) => (
                    <li key={a} className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />{' '}
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="rounded-lg border border-neutral-200 p-4 bg-white/50">
            <h3 className="font-semibold mb-3">
              Reviews ({deal.reviews.length})
            </h3>
            <ReviewsList reviews={deal.reviews} />
          </section>
        </div>

        {/* Right: Merchant + Purchase + NFT meta */}
        <div className="space-y-4">
          <MerchantCard merchant={deal.merchant} />
          <PurchasePanel deal={deal} onPurchase={onPurchase} onMint={onMint} />
          <NFTMeta nft={deal.nftDetails} blockchain={deal.blockchain} />
        </div>
      </div>
    </div>
  );
};

export default ProductDealDetail;
