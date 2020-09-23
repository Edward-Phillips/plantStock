import Model from '../models/model';

const customersModel = new Model('customers');

export const customersPage = async (req, res) => {
  try {
    const data = await customersModel.select(
      'name, address'
    );
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
