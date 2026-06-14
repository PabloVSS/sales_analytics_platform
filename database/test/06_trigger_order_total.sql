SELECT
    id,
    total_amount
FROM sales.orders
LIMIT 1;

INSERT INTO sales.order_items
(
    order_id,
    product_id,
    quantity,
    unit_price,
    total_price
)
VALUES
(
    '<ORDER_ID>',
    '<PRODUCT_ID>',
    2,
    100,
    200
);

SELECT
    total_amount
FROM sales.orders
WHERE id = '<ORDER_ID>';