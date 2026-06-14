INSERT INTO sales.customers (
    name,
    email,
    city,
    state
)
SELECT
    'Customer ' || gs,
    'customer' || gs || '@email.com',
    (
        ARRAY[
            'New York',
            'Chicago',
            'Miami',
            'Dallas',
            'Seattle'
        ]
    )[floor(random()*5+1)],
    (
        ARRAY[
            'NY',
            'IL',
            'FL',
            'TX',
            'WA'
        ]
    )[floor(random()*5+1)]
FROM generate_series(1,100) gs;