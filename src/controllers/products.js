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