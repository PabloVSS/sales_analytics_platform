CREATE VIEW sales.vw_sales_summary AS

SELECT

    COUNT(*) AS total_orders,

    SUM(total_amount) AS revenue,

    AVG(total_amount) AS average_ticket

FROM sales.orders

WHERE status = 'PAID';