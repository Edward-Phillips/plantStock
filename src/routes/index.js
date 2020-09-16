import express from 'express';
import {
  indexPage,
  stockPage,
  addStock,
  productsPage,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers';
import { productIdFinder } from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/stock', stockPage);
indexRouter.post('/stock', productIdFinder, addStock);
indexRouter.get('/products', productsPage);
indexRouter.post('/products', addProduct);
indexRouter.put('/products', updateProduct);
indexRouter.delete('/products', deleteProduct);
export default indexRouter;
