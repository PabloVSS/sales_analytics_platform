CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON sales.products
FOR EACH ROW
EXECUTE FUNCTION sales.fn_update_timestamp();