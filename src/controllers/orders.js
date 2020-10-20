import Model from '../models/model';
import ResourceHandler from './resourceHandler';

const ordersModel = new Model('orders');

const ordersHandler = new ResourceHandler('orders');

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

export const addOrder = async(req, res) => {
  const {customer_id, order_date, order_total} = req.body;
  const columns = 'customer_id, order_date, order_total';
  const values = `'${customer_id}', '${order_date}', '${order_total}'`;
  const queryResult = await ordersHandler.addResource(columns, values);
  res.status(200).json({order: queryResult});
};
