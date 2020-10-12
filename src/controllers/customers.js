import Model from '../models/model';
import ResourceHandler from './resourceHandler';

const customersModel = new Model('customers');

const customersHandler = new ResourceHandler('customers');

export const getCustomers = async (req, res) => {
  const columns = 'id, name, address';
  const queryResult = await customersHandler.getResources(columns);
  res.status(200).json({ customers: queryResult });
};

export const addCustomer = async (req, res) => {
  const { name, address } = req.body;
  const columns = 'name, address';
  const values = `'${name}', '${address}'`;
  const queryResult = await customersHandler.addResource(columns, values);
  res.status(200).json({ customers: queryResult });
};

export const updateCustomer = async (req, res) => {
  const {
    old_name, old_address, name, address
  } = req.body;
  const columns = [ 'name', 'address' ];
  const constraintValues = [ `'${old_name}'`, `'${old_address}'` ];
  const values = [ `'${name}'`, `'${address}'` ];
  const queryResult = await customersHandler.updateResource(
    columns,
    constraintValues,
    columns,
    values
  );
  res.status(200).json({ customers: queryResult });
};

export const getOneCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await customersModel.getById(id);
    res.status(200).json({ customers: data.rows });
  } catch (err) {
    res.status(200).json({ customers: err.stack });
  }
};
