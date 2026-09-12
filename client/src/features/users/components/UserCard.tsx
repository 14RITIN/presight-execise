import { User } from '../types/user.types';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const visibleHobbies = user.hobbies.slice(0, 2);
  const remainingHobbies = user.hobbies.length - visibleHobbies.length;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="h-20 w-20 rounded-full object-cover"
          loading="lazy"
        />

        <h2 className="mt-3 text-lg font-semibold text-gray-900">
          {user.first_name} {user.last_name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {user.nationality} · Age {user.age}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {visibleHobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {hobby}
            </span>
          ))}

          {remainingHobbies > 0 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              +{remainingHobbies}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}