export const modifyProduct = (req, res, next) => {
  req.body.product_name = `Ye Olde ${req.body.product_name}`;
  next();
};
