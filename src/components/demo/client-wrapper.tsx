'use client';

import { ReactNode } from 'react';

export const ClientShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg border border-green-400 bg-gray-800 p-4">
      <h3 className="text-lg font-semibold mb-2">Client Shell</h3>
      <p className="text-gray-300">
        Este componente cliente recebe um Server Component via prop.
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
};
