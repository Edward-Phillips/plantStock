import Model from '../models/model';
import ResourceHandler from './resourceHandler';

const ordersModel = new Model('orders');

const ordersHandler = new ResourceHandler('orders');

const orderItemsHandler = new ResourceHandler('order_items')

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

export const addOrder = async(req, res, next) => {
  const { customer_id, order_date, order_total } = req.body;
  const columns = 'customer_id, order_date, order_total';
  const values = `'${customer_id}', '${order_date}', '${order_total}'`;
  const queryResult = await ordersHandler.addResource(columns, values);
  const { id } = queryResult[0];
  req.order_id = id;
  req.order = queryResult;
  next();
};


export const addOrderItems = async(req, res, next) => {
  const { order_items } = req.body;
  const { order_id } = req;
  const columns = 'order_id, stock_id, count, price, cost_per_item';
  const orderedItems = [];
  order_items.map(async (item) => {
    const { stock_id, count, price, cost_per_cutting } = item;
    const values = `'${order_id}', '${stock_id}', '${count}', '${price}', '${cost_per_cutting}'`;
    const queryResult = await orderItemsHandler.addResource(columns, values);
    orderedItems.push(queryResult[0]);
  });
  res.status(200).json({order: req.order, order_items: orderedItems});
};