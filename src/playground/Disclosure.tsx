import React, { useState, useRef } from 'react';

export interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const panelId = useRef(`disclosure-panel-${Math.random().toString(36).substring(2, 9)}`).current;

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden dark:border-zinc-800">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-3 bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <span>{title}</span>
          <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        hidden={!isOpen}
        className="px-4 py-3 bg-white text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300 text-sm border-t border-zinc-200 dark:border-zinc-800"
      >
        {children}
      </div>
    </div>
  );
};