import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminUsersPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Check if current user is admin (you should implement proper admin check)
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch all users from the auth.users view
  const { data: users, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error Loading Users</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">ID</th>
              <th className="px-6 py-3 border-b text-left">Email</th>
              <th className="px-6 py-3 border-b text-left">Created At</th>
              <th className="px-6 py-3 border-b text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{user.id}</td>
                <td className="px-6 py-4 border-b">{user.email}</td>
                <td className="px-6 py-4 border-b">
                  {new Date(user.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 border-b">
                  {user.role || 'user'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify({ users, error }, null, 2)}
        </pre>
      </div>
    </div>
  );
} 