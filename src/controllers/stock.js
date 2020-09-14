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
