import { ClientCounter } from '@/components/demo/client';

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">RSC importando RCC</h1>
        <p className="text-gray-400">
          Em Next.js (App Router), páginas e layouts são Server Components por
          padrão. Eles podem importar e renderizar diretamente componentes
          cliente.
        </p>
      </header>

      <div className="space-y-4">
        <p className="text-gray-300">
          Abaixo, um Server Component importou um Client Component interativo:
        </p>
        <ClientCounter />
      </div>
    </section>
  );
}
