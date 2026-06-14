CREATE OR REPLACE FUNCTION sales.fn_calculate_order_total(
    p_order_id UUID
)
RETURNS VOID
AS $$
BEGIN

    UPDATE sales.orders
    SET total_amount = (

        SELECT COALESCE(
            SUM(total_price),
            0
        )

        FROM sales.order_items

        WHERE order_id = p_order_id

    )

    WHERE id = p_order_id;

END;
$$ LANGUAGE plpgsql;