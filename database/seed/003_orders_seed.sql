INSERT INTO sales.orders (
    customer_id,
    order_date,
    status,
    total_amount
)
SELECT

    (
        SELECT id
        FROM sales.customers
        ORDER BY random()
        LIMIT 1
    ),

    NOW()
      - (random() * interval '365 days'),

    (
        ARRAY[
            'PAID',
            'PAID',
            'PAID',
            'PAID',
            'PENDING',
            'CANCELLED'
        ]
    )[floor(random()*6+1)],

    0

FROM generate_series(1,1000);