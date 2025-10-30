'use client';

import { FolderOpen } from 'lucide-react';

// 🎨 Interface / Props Definition
// =====================================
interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({
  title = 'No items yet',
  message = 'Check back soon for new deals.',
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 pt-5 text-center">
      <div className="flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-primary/10">
        <FolderOpen size={48} className="text-gray-400" />
      </div>
      <h2 className="text-lg mb-2 font-medium text-gray-800">{title}</h2>
      <p className="text-gray-200 font-semibold text-sm">{message}</p>
    </div>
  );
};
