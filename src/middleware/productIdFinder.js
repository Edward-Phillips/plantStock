import Model from '../models/model';

const productsModel = new Model('products');

export const productIdFinder = async (req, res, next) => {
  const { product_name, cutting_type } = req.body;
  const column = 'id';
  const clause = ` WHERE product_name = '${product_name}' AND cutting_type = '${cutting_type}'`;
  try {
    const data = await productsModel.select(column, clause);
    const { id } = data.rows[0];
    req.product_id = id;
    next();
  } catch (err) {
    req.body.err = err;
    next();
  }
};
