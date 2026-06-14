CREATE TRIGGER trg_order_items_updated_at
BEFORE UPDATE ON sales.order_items
FOR EACH ROW
EXECUTE FUNCTION sales.fn_update_timestamp();