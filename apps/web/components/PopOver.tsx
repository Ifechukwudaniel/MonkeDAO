import { X } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface PopoverBoxProps {
  trigger: ReactNode; // the icon or button that triggers it
  children: ReactNode; // content inside the box
}

export const PopoverBox = ({ trigger, children }: PopoverBoxProps) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div
          ref={boxRef}
          className="absolute top-full right-0 mt-2 w-100 border-[#C4C4C4] bg-[#FCFBF2] border  rounded-sm z-50 p-3"
        >
          <button
            onClick={() => setOpen(false)}
            className=" border border-[#C4C4C4] hover:text-gray-800 p-1"
          >
            <X size={16} />
          </button>
          <div className="mt-3">{children}</div>
        </div>
      )}
    </div>
  );
};
