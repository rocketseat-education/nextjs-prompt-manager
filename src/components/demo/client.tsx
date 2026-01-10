'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const ClientCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border border-green-400 bg-gray-800 p-4">
      <h3 className="text-lg font-semibold mb-2">Client Component</h3>
      <p className="text-gray-300">Este bloco roda no navegador.</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-sm text-gray-400">Contador: {count}</span>
        <Button onClick={() => setCount((c) => c + 1)}>Incrementar</Button>
      </div>
    </div>
  );
};
