import express from 'express';
import { indexPage, stockPage, productsPage, addProduct } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/stock', stockPage);
indexRouter.get('/products', productsPage);
indexRouter.post('/products', addProduct);

export default indexRouter;
