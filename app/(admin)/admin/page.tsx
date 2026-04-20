export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      
      {/* TITULO */}
      <h2 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card title="Tours" value="24" />
        <Card title="Reservas" value="128" />
        <Card title="Usuarios" value="58" />
        <Card title="Proveedores" value="12" />
      </div>

      {/* BLOQUE GRANDE */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-2">
          Actividad reciente
        </h3>
        <p className="text-sm text-gray-500">
          Aquí podrás visualizar reservas, cambios y actividad del sistema.
        </p>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-[#d4663a]">
        {value}
      </h3>
    </div>
  );
}