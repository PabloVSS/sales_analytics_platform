CREATE VIEW sales.vw_top_products AS

SELECT

    p.id,

    p.name,

    SUM(oi.quantity) units_sold

FROM sales.products p

JOIN sales.order_items oi
    ON p.id = oi.product_id

GROUP BY p.id, p.name;