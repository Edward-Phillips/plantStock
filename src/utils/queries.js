export const createProductsTable = `
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE IF NOT EXISTS products(
  id serial PRIMARY KEY,
  product_name VARCHAR ( 255 ) NOT NULL,
  price NUMERIC,
  cutting_type VARCHAR ( 255 ) NOT NULL
)
`;

export const insertProducts = `
INSERT INTO products(product_name, price, cutting_type)
VALUES
  ('Philodendron Squamiferum', 3, 'rooted'),
  ('Philodendron Squamiferum', 1.5, 'unrooted')
`;

export const dropProductsTable = 'DROP TABLE IF EXISTS products CASCADE';

export const createStockTable = `
DROP TABLE IF EXISTS stock;
CREATE TABLE IF NOT EXISTS stock(
  id serial PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  cost_per_cutting NUMERIC NOT NULL,
  current_count INTEGER NOT NULL,
  last_updated TIMESTAMP
)
`;

export const insertStock = `
INSERT INTO stock(product_id, cost_per_cutting, current_count)
VALUES
  (1, 0.35, 25),
  (2, 0.35, 25)
`;

export const dropStockTable = 'DROP TABLE IF EXISTS stock';

export const dropCustomersTable = 'DROP TABLE IF EXISTS customers';

export const stupidAsyncSQL = `
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE IF NOT EXISTS products(
  id serial PRIMARY KEY,
  product_name VARCHAR ( 255 ) NOT NULL,
  price NUMERIC,
  cutting_type VARCHAR ( 255 ) NOT NULL
);
DROP TABLE IF EXISTS stock CASCADE;
CREATE TABLE IF NOT EXISTS stock(
  id serial PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  cost_per_cutting NUMERIC NOT NULL,
  current_count INTEGER NOT NULL,
  last_updated TIMESTAMP
);
DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE IF NOT EXISTS customers(
  id serial PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL,
  address VARCHAR ( 255 ) NOT NULL
);
CREATE TABLE IF NOT EXISTS orders(
  id serial PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  order_date VARCHAR( 255 ) NOT NULL,
  order_total NUMERIC NOT NULL
);
CREATE TABLE IF NOT EXISTS order_items(
  id serial PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  stock_id INTEGER REFERENCES stock(id),
  count INTEGER NOT NULL,
  price NUMERIC,
  cost_per_item NUMERIC
);
INSERT INTO products(product_name, price, cutting_type)
VALUES
  ('Philodendron Squamiferum', 3, 'rooted'),
  ('Philodendron Squamiferum', 1.5, 'unrooted');
INSERT INTO stock(product_id, cost_per_cutting, current_count)
VALUES
  (1, 0.35, 45),
  (2, 0.35, 25);
INSERT INTO customers(name, address)
VALUES
  ('Steve', '45 the house on the hill'),
  ('Gerald', '14 The Shieldwall, Arrakis');
INSERT INTO orders(customer_id, order_date, order_total )
VALUES
  (1, 'timestamp here', 90.00),
  (2, '19th September 2020', 14.5);
`;
