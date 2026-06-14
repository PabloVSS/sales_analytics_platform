CREATE OR REPLACE FUNCTION sales.fn_trigger_recalculate_order()
RETURNS TRIGGER
AS $$
BEGIN

    PERFORM sales.fn_calculate_order_total(
        NEW.order_id
    );

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_total_recalculation

AFTER INSERT OR UPDATE

ON sales.order_items

FOR EACH ROW

EXECUTE FUNCTION sales.fn_trigger_recalculate_order();