export function UserFiltersSkeleton() {
  const rows = Array.from({ length: 8 });

  return (
    <aside className="animate-pulse rounded-xl border border-gray-200 bg-white p-4">
      <div>
        <div className="mb-4 h-5 w-24 rounded bg-gray-200" />

        <div className="space-y-6">
          {rows.map((_, index) => (
            <div
              key={`nationality-${index}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>

              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5">
        <div className="mb-4 h-5 w-20 rounded bg-gray-200" />

        <div className="space-y-6">
          {rows.map((_, index) => (
            <div
              key={`hobby-${index}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-4 w-28 rounded bg-gray-200" />
              </div>

              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}