import { useState } from "react";
import { User } from "../types/user.types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const [avatarError, setAvatarError] = useState(false);

  const visibleHobbies = user.hobbies.slice(0, 2);
  const remainingHobbies = user.hobbies.slice(2);
  const initials =  `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  return (
  <article className="h-64 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col items-center text-center">

        {avatarError ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-lime-700">
            {initials}
          </div>
        ) : (
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            loading="lazy"
            onError={() => setAvatarError(true)}
            className="h-20 w-20 rounded-full object-cover"
          />
        )}

      <h2
  title={`${user.first_name} ${user.last_name}`}
  className="mt-3 w-full truncate text-center text-lg font-semibold text-gray-900"
>
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

          {remainingHobbies.length > 0 && (
            <span
              title={remainingHobbies.join(", ")}
              className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              +{remainingHobbies.length}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
