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

export const stupidAsyncSQL = `
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE IF NOT EXISTS products(
  id serial PRIMARY KEY,
  product_name VARCHAR ( 255 ) NOT NULL,
  price NUMERIC,
  cutting_type VARCHAR ( 255 ) NOT NULL
);
DROP TABLE IF EXISTS stock;
CREATE TABLE IF NOT EXISTS stock(
  id serial PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  cost_per_cutting NUMERIC NOT NULL,
  current_count INTEGER NOT NULL,
  last_updated TIMESTAMP
);
DROP TABLE IF EXISTS customers;
CREATE TABLE IF NOT EXISTS customers(
  id serial PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL,
  address VARCHAR ( 255 ) NOT NULL
);
INSERT INTO products(product_name, price, cutting_type)
VALUES
  ('Philodendron Squamiferum', 3, 'rooted'),
  ('Philodendron Squamiferum', 1.5, 'unrooted');
INSERT INTO stock(product_id, cost_per_cutting, current_count)
VALUES
  (1, 0.35, 25),
  (2, 0.35, 25);

INSERT INTO customers(name, address)
VALUES
  ('Steve', '45 the house on the hill'),
  ('Gerald', '14 The Shieldwall, Arrakis');
`;
