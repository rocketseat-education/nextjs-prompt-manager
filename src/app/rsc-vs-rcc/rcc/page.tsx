import { ClientShell } from '@/components/demo/client-wrapper';
import { ServerOnly } from '@/components/demo/server';

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">RCC usando RSC via prop</h1>
        <p className="text-gray-400">
          Componentes cliente não podem importar Server Components diretamente.
          Para usá-los em uma árvore cliente, passe-os via props (por exemplo,
          <code className="mx-1">children</code>) a partir de um Server
          Component.
        </p>
      </header>

      <div className="space-y-4">
        <p className="text-gray-300">
          Aqui, um Server Component fornece o conteúdo como{' '}
          <code className="mx-1">children</code> para um componente cliente:
        </p>
        <ClientShell>
          <ServerOnly />
        </ClientShell>
      </div>
    </section>
  );
}
