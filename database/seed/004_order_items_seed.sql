INSERT INTO sales.order_items (
    order_id,
    product_id,
    quantity,
    unit_price,
    total_price
)
SELECT

    o.id,

    p.id,

    qty,

    p.price,

    qty * p.price

FROM sales.orders o

CROSS JOIN LATERAL (

    SELECT
        id,
        price
    FROM sales.products
    ORDER BY random()
    LIMIT (
        floor(random()*3)+3
    )

) p

CROSS JOIN LATERAL (

    SELECT (
        floor(random()*5)+1
    )::INTEGER AS qty

) q;