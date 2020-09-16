import { restart } from 'nodemon';
import Model from '../models/model';

const productsModel = new Model('products');
export const productsPage = async (req, res) => {
  try {
    const data = await productsModel.select(
      'product_name, price, cutting_type'
    );
    res.status(200).json({ products: data.rows });
  } catch (err) {
    res.status(200).json({ products: err.stack });
  }
};

export const addProduct = async (req, res) => {
  const { product_name, price, cutting_type } = req.body;
  const columns = 'product_name, price, cutting_type';
  const values = `'${product_name}', ${price}, '${cutting_type}'`;
  try {
    const data = await productsModel.insertWithReturn(columns, values);
    res.status(200).json({ products: data.rows });
  } catch (err) {
    res.status(200).json({ products: err.stack });
  }
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
  const oldValues = [ `'${old_product_name}'`, `'${old_cutting_type}'` ];
  const columns = [ 'product_name', 'price', 'cutting_type' ];
  const values = [ `'${product_name}'`, `'${price}'`, `'${cutting_type}'` ];
  try {
    const data = await productsModel.updateWithReturn(
      constraintColumns,
      oldValues,
      columns,
      values
    );
    res.status(200).json({ products: data.rows });
  } catch (err) {
    res.status(200).json({ products: err.stack });
  }
};

export const deleteProduct = async (req, res) => {
  const { product_name, cutting_type } = req.body;
  const columns = [ 'product_name', 'cutting_type' ];
  const values = [ `'${product_name}'`, `'${cutting_type}'` ];
  try {
    const data = await productsModel.deleteWithReturn(columns, values);
    res.status(200).json({ products: data.rows });
  } catch (err) {
    res.status(200).json({ products: err.stack });
  }
};

export const getProductId = async (product_name, cutting_type) => {
  console.log('ayyyy in get productId');
  const column = 'id';
  const clause = `WHERE product_name = '${product_name}' AND cutting_type = '${cutting_type}'`;
  try {
    const data = await productsModel.select(column, clause);
    return data;
  } catch (err) {
    return err;
  }
};
