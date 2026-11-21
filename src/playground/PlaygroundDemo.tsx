import React, { useState } from 'react';
import { Modal } from './Modal';
import { Tabs } from './Tabs';
import { Disclosure } from './Disclosure';

export const PlaygroundDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sampleTabs = [
    { id: 'overview', label: 'Overview', content: <p>This is the Overview tab panel content.</p> },
    { id: 'specs', label: 'Specifications', content: <p>W3C ARIA Authoring Practices Guide rules followed.</p> },
    { id: 'code', label: 'Source Code', content: <p>Clean TypeScript implementations with strict typing.</p> },
  ];

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-8 font-sans">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">A11y Playground Demo</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Modal Dialog Test</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 cursor-pointer"
        >
          Open Accessible Modal
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Keyboard Trap Modal">
          <p className="mb-4">Press Tab to verify focus stays trapped inside this modal. Press Escape to close.</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 rounded text-sm cursor-pointer"
          >
            Close Modal
          </button>
        </Modal>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Tabs Navigation Test</h2>
        <Tabs tabs={sampleTabs} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Disclosure Widget Test</h2>
        <Disclosure title="Click or Press Enter/Space to expand">
          <p>Hidden disclosure content revealed cleanly with correct aria-expanded states.</p>
        </Disclosure>
      </section>
    </main>
  );
};