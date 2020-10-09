import express from 'express';
import {
  indexPage,
  stockPage,
  addStock,
  updateStock,
  productsPage,
  addProduct,
  updateProduct,
  deleteProduct,
  getCustomers,
  getOneCustomer,
  addCustomer,
  updateCustomer,
  getOrdersForCustomer,
} from '../controllers';
import { productIdFinder } from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/stock', stockPage);
indexRouter.post('/stock', productIdFinder, addStock);
indexRouter.put('/stock', productIdFinder, updateStock);

indexRouter.get('/products', productsPage);
indexRouter.post('/products', addProduct);
indexRouter.put('/products', updateProduct);
indexRouter.delete('/products', deleteProduct);

indexRouter.get('/customers', getCustomers);
indexRouter.get('/customers/:id', getOneCustomer);
indexRouter.post('/customers', addCustomer);
indexRouter.put('/customers', updateCustomer);

indexRouter.get('/orders/:customerId', getOrdersForCustomer);

export default indexRouter;
