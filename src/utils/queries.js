export const createProductsTable = `
DROP TABLE IF EXISTS products;
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

export const dropProductsTable = 'DROP TABLE products';
