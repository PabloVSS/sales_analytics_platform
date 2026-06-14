SELECT
    id,
    updated_at
FROM sales.customers
LIMIT 1;

UPDATE sales.customers
SET name = 'TEST UPDATE'
WHERE id = '<ID>';

SELECT
    updated_at
FROM sales.customers
WHERE id = '<ID>';