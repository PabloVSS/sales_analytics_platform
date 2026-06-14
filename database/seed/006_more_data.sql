-- CLIENTES (sem phone)
INSERT INTO sales.customers (id, name, email) VALUES
  ('a0b1c2d3-e4f5-6789-abcd-ef0123456789', 'TechCorp',      'contato@techcorp.com'),
  ('b1c2d3e4-f5a6-7890-1234-567890abcdef', 'MegaVarejo',    'suporte@megavarejo.com'),
  ('c2d3e4f5-a6b7-8901-2345-67890abcdef0', 'EcoSolutions',  'vendas@ecosolutions.com'),
  ('d3e4f5a6-b7c8-9012-3456-7890abcdef01', 'DataHouse',     'info@datahouse.com')
ON CONFLICT (id) DO NOTHING;

-- PRODUTOS
INSERT INTO sales.products (id, name, price, category) VALUES
  ('e4f5a6b7-c8d9-0123-4567-890abcdef012', 'Notebook Pro',      4500.00, 'Eletrônicos'),
  ('f5a6b7c8-d9e0-1234-5678-90abcdef0123', 'Mouse Gamer',        350.00, 'Eletrônicos'),
  ('a6b7c8d9-e0f1-2345-6789-0abcdef01234', 'Teclado Mecânico',   600.00, 'Eletrônicos'),
  ('b7c8d9e0-f1a2-3456-7890-abcdef012345', 'Monitor 27"',       1800.00, 'Eletrônicos'),
  ('c8d9e0f1-a2b3-4567-890a-bcdef0123456', 'Licença Software ERP', 15000.00, 'Software'),
  ('d9e0f1a2-b3c4-5678-90ab-cdef01234567', 'Consultoria TI (hora)',   350.00,  'Serviços'),
  ('e0f1a2b3-c4d5-6789-0abc-def012345678', 'Webcam Full HD',      450.00,  'Eletrônicos'),
  ('f1a2b3c4-d5e6-7890-abcd-ef0123456789', 'Cadeira Ergonômica', 2200.00, 'Móveis')
ON CONFLICT (id) DO NOTHING;

-- PEDIDOS
INSERT INTO sales.orders (id, customer_id, status, total_amount) VALUES
  ('a2b3c4d5-e6f7-8901-2345-678901234567', 'a0b1c2d3-e4f5-6789-abcd-ef0123456789', 'PAID',   0),
  ('b3c4d5e6-f7a8-9012-3456-789012345678', 'b1c2d3e4-f5a6-7890-1234-567890abcdef', 'PAID',   0),
  ('c4d5e6f7-a8b9-0123-4567-890123456789', 'a0b1c2d3-e4f5-6789-abcd-ef0123456789', 'PAID',   0),
  ('d5e6f7a8-b9c0-1234-5678-901234567890', 'c2d3e4f5-a6b7-8901-2345-67890abcdef0', 'PAID',   0),
  ('e6f7a8b9-c0d1-2345-6789-012345678901', 'd3e4f5a6-b7c8-9012-3456-7890abcdef01', 'PENDING', 0),
  ('f7a8b9c0-d1e2-3456-7890-123456789012', 'b1c2d3e4-f5a6-7890-1234-567890abcdef', 'PENDING', 0),
  ('a8b9c0d1-e2f3-4567-8901-234567890123', 'a0b1c2d3-e4f5-6789-abcd-ef0123456789', 'CANCELLED', 0)
ON CONFLICT (id) DO NOTHING;

-- ITENS DE PEDIDO (com total_price calculado)
INSERT INTO sales.order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
  ('a2b3c4d5-e6f7-8901-2345-678901234567', 'e4f5a6b7-c8d9-0123-4567-890abcdef012', 1, 4500.00, 4500.00),
  ('a2b3c4d5-e6f7-8901-2345-678901234567', 'f5a6b7c8-d9e0-1234-5678-90abcdef0123', 3,  350.00, 1050.00),

  ('b3c4d5e6-f7a8-9012-3456-789012345678', 'c8d9e0f1-a2b3-4567-890a-bcdef0123456', 1, 15000.00, 15000.00),

  ('c4d5e6f7-a8b9-0123-4567-890123456789', 'a6b7c8d9-e0f1-2345-6789-0abcdef01234', 2,  600.00, 1200.00),
  ('c4d5e6f7-a8b9-0123-4567-890123456789', 'b7c8d9e0-f1a2-3456-7890-abcdef012345', 1, 1800.00, 1800.00),
  ('c4d5e6f7-a8b9-0123-4567-890123456789', 'e0f1a2b3-c4d5-6789-0abc-def012345678', 1,  450.00, 450.00),

  ('d5e6f7a8-b9c0-1234-5678-901234567890', 'd9e0f1a2-b3c4-5678-90ab-cdef01234567', 10, 350.00, 3500.00),

  ('e6f7a8b9-c0d1-2345-6789-012345678901', 'f1a2b3c4-d5e6-7890-abcd-ef0123456789', 2, 2200.00, 4400.00),

  ('f7a8b9c0-d1e2-3456-7890-123456789012', 'e4f5a6b7-c8d9-0123-4567-890abcdef012', 1, 4500.00, 4500.00),
  ('f7a8b9c0-d1e2-3456-7890-123456789012', 'e0f1a2b3-c4d5-6789-0abc-def012345678', 2,  450.00, 900.00),

  ('a8b9c0d1-e2f3-4567-8901-234567890123', 'f5a6b7c8-d9e0-1234-5678-90abcdef0123', 1, 350.00, 350.00);

-- ATUALIZA TOTAIS DOS PEDIDOS (caso a trigger não tenha disparado)
UPDATE sales.orders o SET total_amount = sub.total
FROM (
  SELECT order_id, SUM(total_price) AS total
  FROM sales.order_items
  GROUP BY order_id
) sub
WHERE o.id = sub.order_id;