type Props = {
  title: string;
  value: number | string;
  testId?: string;
};

export function KpiCard({ title, value, testId }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <p className="text-sm text-gray-400">{title}</p>
      <p data-testid={testId} className="text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}