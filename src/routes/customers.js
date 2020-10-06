import express from 'express';
import {
  getCustomers,
  getOneCustomer,
  addCustomer,
  updateCustomer,
} from '../controllers';

const customerRouter = express.Router({ mergeParams: true });

const debug = (req, res, next) => {
  console.log(req.params.id);
  next();
};

customerRouter.get('/', getCustomers);
customerRouter.get('/:id', debug, getOneCustomer);
customerRouter.post('/', addCustomer);
customerRouter.put('/', updateCustomer);

export default customerRouter;
