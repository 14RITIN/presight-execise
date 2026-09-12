export function UserGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 16}).map((_, index) => (
        <div
          key={index}
          className={`
            animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm
            ${index >= 3 ? 'hidden sm:block' : ''}
            ${index >= 6 ? 'sm:hidden xl:block' : ''}
          `}
        >
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-gray-200" />

            <div className="mt-4 h-5 w-32 rounded bg-gray-200" />

            <div className="mt-2 h-4 w-24 rounded bg-gray-200" />

            <div className="mt-5 flex gap-2">
              <div className="h-6 w-20 rounded-full bg-gray-200" />
              <div className="h-6 w-16 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}