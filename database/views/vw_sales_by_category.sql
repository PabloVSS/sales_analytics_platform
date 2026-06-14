CREATE VIEW sales.vw_sales_by_category AS

SELECT

    p.category,

    SUM(oi.total_price) revenue

FROM sales.products p

JOIN sales.order_items oi
    ON p.id = oi.product_id

GROUP BY p.category;