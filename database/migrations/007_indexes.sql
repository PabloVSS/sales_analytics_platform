CREATE INDEX idx_customers_email
ON sales.customers(email);

CREATE INDEX idx_customers_state
ON sales.customers(state);

CREATE INDEX idx_products_category
ON sales.products(category);


CREATE INDEX idx_orders_customer
ON sales.orders(customer_id);

CREATE INDEX idx_orders_date
ON sales.orders(order_date);

CREATE INDEX idx_orders_status
ON sales.orders(status);

CREATE INDEX idx_order_items_order
ON sales.order_items(order_id);

CREATE INDEX idx_order_items_product
ON sales.order_items(product_id);