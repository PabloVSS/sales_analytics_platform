-- pedidos sem cliente

SELECT COUNT(*)
FROM sales.orders
WHERE customer_id IS NULL;

-- itens sem pedido

SELECT COUNT(*)
FROM sales.order_items
WHERE order_id IS NULL;

-- itens sem produto

SELECT COUNT(*)
FROM sales.order_items
WHERE product_id IS NULL;

-- registros órfãos

SELECT COUNT(*)
FROM sales.order_items oi
LEFT JOIN sales.orders o
ON oi.order_id = o.id
WHERE o.id IS NULL;