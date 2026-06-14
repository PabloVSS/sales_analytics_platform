CREATE VIEW sales.vw_top_customers AS

SELECT

    c.id,

    c.name,

    SUM(o.total_amount) revenue

FROM sales.customers c

JOIN sales.orders o
    ON c.id = o.customer_id

WHERE o.status = 'PAID'

GROUP BY c.id, c.name;