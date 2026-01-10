export const ServerOnly = () => {
  const now = new Date().toISOString();
  const nodeVersion = process.version;

  return (
    <div className="rounded-lg border border-yellow-400 bg-gray-800 p-4">
      <h3 className="text-lg font-semibold mb-2">Server Component</h3>
      <p className="text-gray-300">Este bloco é renderizado no servidor.</p>
      <div className="mt-3 text-sm text-gray-400">
        <p>Hora do servidor: {now}</p>
        <p>Node.js: {nodeVersion}</p>
      </div>
    </div>
  );
};
