CREATE OR REPLACE FUNCTION sales.fn_order_kpis()
RETURNS TABLE (
    total_orders BIGINT,
    total_revenue NUMERIC,
    avg_ticket NUMERIC
)
AS $$
BEGIN

RETURN QUERY

SELECT
    COUNT(*),
    SUM(total_amount),
    AVG(total_amount)

FROM sales.orders

WHERE status = 'PAID';

END;
$$ LANGUAGE plpgsql;