import Model from '../models/model';
import ResourceHandler from './resourceHandler';

const productsModel = new Model('products');

const productsHandler = new ResourceHandler('products');

export const productsPage = async (req, res) => {
  const columns = 'product_name, price, cutting_type';
  const queryResult = await productsHandler.getResources(columns);
  res.status(200).json({ products: queryResult });
};

export const addProduct = async (req, res) => {
  const { product_name, price, cutting_type } = req.body;
  const columns = 'product_name, price, cutting_type';
  const values = `'${product_name}', ${price}, '${cutting_type}'`;
  const queryResult = await productsHandler.addResource(columns, values);
  res.status(200).json({ products: queryResult });
};

export const updateProduct = async (req, res) => {
  const {
    old_product_name,
    old_cutting_type,
    product_name,
    price,
    cutting_type,
  } = req.body;
  const constraintColumns = [ 'product_name', 'cutting_type' ];
  const constraintValues = [ `'${old_product_name}'`, `'${old_cutting_type}'` ];
  const columns = [ 'product_name', 'price', 'cutting_type' ];
  const values = [ `'${product_name}'`, `'${price}'`, `'${cutting_type}'` ];
  const queryResult = await productsHandler.updateResource(
    constraintColumns,
    constraintValues,
    columns,
    values
  );
  res.status(200).json({ products: queryResult });
};

export const deleteProduct = async (req, res) => {
  const { product_name, cutting_type } = req.body;
  const columns = [ 'product_name', 'cutting_type' ];
  const values = [ `'${product_name}'`, `'${cutting_type}'` ];
  const queryResult = await productsHandler.deleteResource(columns, values);
  res.status(200).json({ products: queryResult });
};

export const getProductId = async (product_name, cutting_type) => {
  const column = 'id';
  const clause = `WHERE product_name = '${product_name}' AND cutting_type = '${cutting_type}'`;
  try {
    const data = await productsModel.select(column, clause);
    return data;
  } catch (err) {
    return err;
  }
};
