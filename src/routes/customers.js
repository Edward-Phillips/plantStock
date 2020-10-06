import express from 'express';
import {
  getCustomers,
  getOneCustomer,
  addCustomer,
  updateCustomer,
} from '../controllers';

const customerRouter = express.Router({ mergeParams: true });

customerRouter.get('/', getCustomers);
customerRouter.get('/:id', getOneCustomer);
customerRouter.post('/', addCustomer);
customerRouter.put('/', updateCustomer);

export default customerRouter;
