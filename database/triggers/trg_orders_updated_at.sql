CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON sales.orders
FOR EACH ROW
EXECUTE FUNCTION sales.fn_update_timestamp();