import React, { useEffect, useState } from 'react';

export interface DealProps {
  id: string;
  title: string;
  imageUrl?: string;
  discountPercent?: number;
  priceFiat?: number;
  merchantName?: string;
  merchantId?: string;
  expiryISO?: string;
  isOwned?: boolean;
  onBuy?: (id: string) => void;
  onClaim?: (id: string) => void;
  onList?: (id: string) => void;
}

export const DealCard: React.FC<DealProps> = ({
  id,
  title,
  imageUrl = '/placeholder-deal.jpg',
  discountPercent = 0,
  priceFiat,
  merchantName = 'Unknown Merchant',
  merchantId,
  expiryISO,
  isOwned = false,
  onBuy,
  onClaim,
  onList,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('--:--:--');

  useEffect(() => {
    if (!expiryISO) return;
    const update = () => {
      const now = new Date();
      const exp = new Date(expiryISO);
      const diff = Math.max(0, exp.getTime() - now.getTime());
      if (diff === 0) {
        setTimeLeft('Expired');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      const formatted = `${days > 0 ? days + 'd ' : ''}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      setTimeLeft(formatted);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [expiryISO]);

  return (
    <article className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-2xl shadow-md overflow-hidden border border-neutral-100 dark:border-neutral-800">
      <div className="relative h-44 md:h-48 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute left-3 top-3 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {discountPercent}% OFF
        </div>
        <div className="absolute right-3 top-3 bg-neutral-800/70 text-white px-2 py-1 rounded text-xs">
          {merchantName}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <div className="mt-2 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
              #{merchantId ?? '—'}
            </span>
            <span className="text-xs">Expires:</span>
            <span className="font-mono text-sm">{timeLeft}</span>
          </div>
          <div className="text-right">
            {priceFiat !== undefined ? (
              <div className="text-sm">
                Buy:{' '}
                <span className="font-semibold">${priceFiat.toFixed(2)}</span>
              </div>
            ) : (
              <div className="text-sm text-neutral-400">Claimable</div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          {!isOwned ? (
            <button
              onClick={() => onBuy?.(id)}
              className="flex-1 px-3 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-indigo-600 to-violet-500 text-white"
            >
              Buy / Claim
            </button>
          ) : (
            <>
              <button
                onClick={() => onClaim?.(id)}
                className="flex-1 px-3 py-2 rounded-lg font-semibold text-sm border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                Redeem
              </button>
              <button
                onClick={() => onList?.(id)}
                className="px-3 py-2 rounded-lg font-semibold text-sm border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                List
              </button>
            </>
          )}
        </div>

        <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold">Note:</span> NFT coupons are
          transferable and verifiable on-chain. Redemption burns the token (or
          marks it used) depending on merchant rules.
        </div>
      </div>
    </article>
  );
};

export default DealCard;
