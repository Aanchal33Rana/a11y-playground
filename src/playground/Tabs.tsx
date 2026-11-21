import React, { useState, useRef } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId }) => {
  const [activeId, setActiveId] = useState<string>(defaultTabId || tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveId(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Playground Tabs" className="flex space-x-2 border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((tab, index) => {
          const isSelected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => {
          const isSelected = tab.id === activeId;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              tabIndex={0}
              hidden={!isSelected}
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2"
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};