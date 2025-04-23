import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

type TableInfo = {
  table_name: string
  table_type: string
  estimated_row_count: number
}

export default async function TablesPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: tables, error } = await supabase
    .rpc('list_tables') as { data: TableInfo[] | null, error: any }
  
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Database Tables</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Table Name</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Estimated Rows</th>
            </tr>
          </thead>
          <tbody>
            {tables?.map((table: TableInfo) => (
              <tr key={table.table_name} className="border-b">
                <td className="px-6 py-4">{table.table_name}</td>
                <td className="px-6 py-4">{table.table_type}</td>
                <td className="px-6 py-4">{table.estimated_row_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 