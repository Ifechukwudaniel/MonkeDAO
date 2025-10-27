import { Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const BestDealPosted = ({
  deal,
}: {
  deal?: { title: string; image: string; likes: number; slug: string };
}) => {
  if (!deal) return null;

  return (
    <div className="mt-4 border  rounded-lg p-3 hover:shadow-sm transition-all duration-150 bg-background border-[#C4C4C4] ">
      <h3 className="font-semibold mb-2 text-sm flex items-center gap-1">
        <span>Best Deal</span>
      </h3>

      <Link
        href={`/products/${deal.slug}`}
        className="flex gap-3 items-start group"
      >
        <Image
          src={deal.image}
          alt={deal.title}
          width={80}
          height={60}
          className="rounded-md object-cover border border-border/50 group-hover:border-border transition-all"
        />

        <div className="flex flex-col justify-between flex-1">
          <p className="text-xs font-medium line-clamp-2 group-hover:text-foreground transition-colors">
            {deal.title}
          </p>

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Heart size={12} /> {deal.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={12} /> 12
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
