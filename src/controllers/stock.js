import Model from '../models/model';

const stockModel = new Model('stock');

export const stockPage = async (req, res) => {
  try {
    const data = await stockModel.select(
      'product_id, cost_per_cutting, current_count, last_updated'
    );
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
