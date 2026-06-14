export function KpiCard({ title, value, loading }: any) {
  return (
    <div className="p-4 border rounded">
      <p>{title}</p>

      {loading ? (
        <div
          data-testid="skeleton"
          className="animate-pulse h-4 bg-gray-300"
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}