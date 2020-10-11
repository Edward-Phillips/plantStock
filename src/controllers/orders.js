import Model from '../models/model';

const ordersModel = new Model('orders');

export const getOrdersForCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const clause = `WHERE customer_id = '${customerId}'`
    const data = await ordersModel.select('*', clause);
    res.status(200).json({ orders: data.rows });
  } catch (err) {
    res.status(200).json({ orders: err.stack });
  }
};
