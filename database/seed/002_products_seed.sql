INSERT INTO sales.products (
    name,
    category,
    price
)
SELECT
    'Product ' || gs,

    (
        ARRAY[
            'Electronics',
            'Books',
            'Home',
            'Sports',
            'Fashion'
        ]
    )[floor(random()*5+1)],

    ROUND(
        (random() * 900 + 100)::numeric,
        2
    )
FROM generate_series(1,50) gs;