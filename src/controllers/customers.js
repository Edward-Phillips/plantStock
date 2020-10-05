import Model from '../models/model';

const customersModel = new Model('customers');

export const getCustomers = async (req, res) => {
  try {
    const data = await customersModel.select('id, name, address');
    res.status(200).json({ customers: data.rows });
  } catch (err) {
    res.status(200).json({ customers: err.stack });
  }
};

export const addCustomer = async (req, res) => {
  const { name, address } = req.body;
  const columns = 'name, address';
  const values = `'${name}', '${address}'`;
  try {
    const data = await customersModel.insertWithReturn(columns, values);
    res.status(200).json({ customers: data.rows });
  } catch (err) {
    res.status(200).json({ customers: err.stack });
  }
};

export const updateCustomer = async (req, res) => {
  const {
    old_name, old_address, name, address
  } = req.body;
  const columns = [ 'name', 'address' ];
  const constraintValues = [ `'${old_name}'`, `'${old_address}'` ];
  const values = [ `'${name}'`, `'${address}'` ];
  try {
    const data = await customersModel.updateWithReturn(
      columns,
      constraintValues,
      columns,
      values
    );
    res.status(200).json({ customers: data.rows });
  } catch (err) {
    res.status(200).json({ customers: err.stack });
  }
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
