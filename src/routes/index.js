import express from 'express';
import {
  indexPage,
  stockPage,
  productsPage,
  addProduct,
  updateProduct,
} from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/stock', stockPage);
indexRouter.get('/products', productsPage);
indexRouter.post('/products', addProduct);
indexRouter.put('/products', updateProduct);

export default indexRouter;
