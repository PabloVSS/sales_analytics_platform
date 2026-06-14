CREATE TABLE sales.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    category VARCHAR(100) NOT NULL,

    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),

    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);