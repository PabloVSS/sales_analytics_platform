CREATE VIEW sales.vw_monthly_revenue AS

SELECT

    DATE_TRUNC(
        'month',
        order_date
    ) AS month,

    SUM(total_amount) AS revenue

FROM sales.orders

WHERE status = 'PAID'

GROUP BY month;