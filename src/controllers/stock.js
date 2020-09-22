import Model from '../models/model';

const stockModel = new Model('stock');

export const stockPage = async (req, res) => {
  try {
    const columns = 'product_name, product_id, cost_per_cutting, current_count, last_updated';
    const clause = ' INNER JOIN products ON products.id = stock.product_id';
    const data = await stockModel.select(columns, clause);
    res.status(200).json({ stock: data.rows });
  } catch (err) {
    res.status(200).json({ stock: err.stack });
  }
};

export const addStock = async (req, res) => {
  const { product_name, cost_per_cutting, current_count } = req.body;
  const { product_id } = req;
  const columns = 'product_id, cost_per_cutting, current_count ';
  const values = `${product_id}, ${cost_per_cutting}, ${current_count}`;
  try {
    const data = await stockModel.insertWithReturn(columns, values);
    data.rows[0].product_name = product_name;
    res.status(200).json({ stock: data.rows });
  } catch (err) {
    res.status(200).json({ stock: err.stack });
  }
};

export const updateStock = async (req, res) => {
  const {
    product_name, cost_per_cutting, new_count, cutting_type
  } = req.body;
  const { product_id } = req;
  const constraintColumns = [ 'product_id', 'cost_per_cutting' ];
  const constraintValues = [ product_id, cost_per_cutting ];
  const columns = [ 'current_count' ];
  const values = [ new_count ];
  try {
    const data = await stockModel.updateWithReturn(
      constraintColumns,
      constraintValues,
      columns,
      values
    );
    data.rows[0].product_name = product_name;
    data.rows[0].cutting_type = cutting_type;
    res.status(200).json({ stock: data.rows });
  } catch (err) {
    res.status(200).json({ stock: err.stack });
  }
};
