-- Create a function to list all tables in the public schema
CREATE OR REPLACE FUNCTION public.list_tables()
RETURNS TABLE (
    table_name text,
    table_type text,
    estimated_row_count bigint
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tables.table_name::text,
        tables.table_type::text,
        (SELECT reltuples::bigint FROM pg_class WHERE oid = (quote_ident(tables.table_name)::regclass)) AS estimated_row_count
    FROM information_schema.tables tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
END;
$$; 