'use client';

import { Button } from '@monkedeals/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@monkedeals/ui/components/card';
import { Textarea } from '@monkedeals/ui/components/textarea';
import { Send, Smile } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// 🎨 Interface / Props Definition
// =====================================
interface ReviewBoxProps {
  user: {
    image: string;
    name: string;
    reputation: number;
    joined: string;
  };
  onSubmit?: (message: string) => void;
}

/* ╔════════════════════════════════════════════╗
   ║ ⬢ Comment Box Component
   ╚════════════════════════════════════════════╝ */
export const ReviewBox = ({ user, onSubmit }: ReviewBoxProps) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handlePost = () => {
    if (!message.trim()) return;
    onSubmit?.(message.trim());
    setMessage('');
  };

  return (
    <Card className=" w-full p-4  border border-border-default rounded-sm shadow-none mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase">
          Leave a comment
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* ✦ Profile info ✦ */}
        <div className="flex items-center gap-3">
          <Image
            src={user.image}
            alt={user.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <div className="text-sm text-zinc-500 flex gap-2">
              <span>⭐ {user.reputation}</span>
              <span>• Joined {user.joined}</span>
            </div>
          </div>
        </div>

        {/* ✦ Message Box ✦ */}
        <div className="relative">
          <Textarea
            placeholder="Write your comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] resize-none pr-10 border-border-default focus:ring-primary"
          />

          {/* ✦ Emoji Button ✦ */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="absolute right-3 bottom-3 text-gray-800 hover:text-primary "
          >
            <Smile size={20} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        {/* ✦ Post Button Action ✦ */}
        <div className="flex justify-end">
          <Button
            onClick={handlePost}
            disabled={!message.trim()}
            className="flex items-center gap-2 text-white uppercase font-semibold text-xs py-2.5 cursor-pointer"
          >
            <Send size={10} />
            Post Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
