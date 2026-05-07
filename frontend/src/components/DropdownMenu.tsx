import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: 'start' | 'end';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return <div className="relative">{children}</div>;
};

export const DropdownMenuTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}> = ({ children, className, asChild, ...props }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={className} onClick={() => setOpen(!open)} {...props}>
      {children}
      <style>{`.dropdown-content { display: ${open ? 'block' : 'none'}; }`}</style>
    </div>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  align = 'end',
}) => {
  return (
    <div
      className={cn(
        'dropdown-content absolute right-0 z-50 mt-2 min-w-[12rem] overflow-hidden rounded-lg border bg-card shadow-lg',
        align === 'start' && 'left-0 right-auto'
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

export const DropdownMenuItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      className={cn(
        'flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors',
        className
      )}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
};
