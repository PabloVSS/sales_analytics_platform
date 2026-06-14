-- receita total

SELECT
    SUM(total_amount)
FROM sales.orders
WHERE status = 'PAID';

-- ticket médio

SELECT
    AVG(total_amount)
FROM sales.orders
WHERE status = 'PAID';

-- total pedidos pagos

SELECT
    COUNT(*)
FROM sales.orders
WHERE status = 'PAID';