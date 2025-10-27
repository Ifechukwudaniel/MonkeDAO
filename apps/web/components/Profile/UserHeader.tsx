'use client';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Profile } from '../../types/product';

export const UserHeader = ({ user }: { user: Profile }) => {
  const copyWallet = () => {
    navigator.clipboard.writeText(user.walletAddress);
    toast.success('Wallet address copied');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background border border-border rounded-2xl p-5 transition-all duration-200 border-[#C4C4C4]">
      <div className="flex items-center gap-4">
        <Image
          src={user.avatarUrl}
          alt={user.username}
          width={80}
          height={80}
          className="rounded-full border-2  object-cover border-[#C4C4C4]"
        />
        <div>
          <h1 className="text-xl font-bold text-foreground">{user.username}</h1>

          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>
              {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
            </span>
            <Copy
              size={14}
              className="cursor-pointer hover:text-foreground transition-colors"
              onClick={copyWallet}
            />
          </div>

          <p className="text-xs text-muted-foreground/80 mt-3">
            Joined {user.joinedDate} • Last Active {user.lastActive}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold uppercase text-foreground">
          {user.reputation.level}
        </p>
        <div className="flex gap-2 mt-2">
          {user.badges.slice(0, 3).map((b) => (
            <Image
              key={b.id}
              src={b.image}
              alt={b.name}
              width={40}
              height={40}
              className="rounded-full border border-border/60 object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
