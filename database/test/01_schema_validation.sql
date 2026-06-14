-- TABELAS

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'sales'
ORDER BY table_name;

-- VIEWS

SELECT table_name
FROM information_schema.views
WHERE table_schema = 'sales';

-- FUNCTIONS

SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'sales';