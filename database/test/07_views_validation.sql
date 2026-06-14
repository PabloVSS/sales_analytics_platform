-- resumo

SELECT *
FROM sales.vw_sales_summary;

-- receita mensal

SELECT *
FROM sales.vw_monthly_revenue
ORDER BY month;

-- top clientes

SELECT *
FROM sales.vw_top_customers
ORDER BY revenue DESC
LIMIT 10;

-- top produtos

SELECT *
FROM sales.vw_top_products
ORDER BY units_sold DESC
LIMIT 10;

-- categoria

SELECT *
FROM sales.vw_sales_by_category
ORDER BY revenue DESC;