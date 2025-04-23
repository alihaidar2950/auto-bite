'use client';

import { signOut } from '@/app/actions/auth';

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
      >
        Sign Out
      </button>
    </form>
  );
} 