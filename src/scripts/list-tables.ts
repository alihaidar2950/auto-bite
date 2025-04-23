import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gcscelrcmmztobladawd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjc2NlbHJjbW16dG9ibGFkYXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NTM0NjAsImV4cCI6MjAyOTEyOTQ2MH0.8QJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function listTables() {
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_schema, table_name')
    .eq('table_schema', 'public')
    .order('table_name')

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('Tables in public schema:')
  data.forEach(table => {
    console.log(`- ${table.table_name}`)
  })
}

listTables() 