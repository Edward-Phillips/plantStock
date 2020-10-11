import { expect, server, BASE_URL } from './setup';

describe('Orders', () => {
  it('gets all the orders for a particular customer', (done) => {
    server
      .get(`${BASE_URL}/orders/1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.orders).to.be.instanceOf(Array);
        res.body.orders.forEach((order) => {
          expect(order).to.have.property('customer_id', 1);
          expect(order).to.have.property('order_date');
          expect(order).to.have.property('order_total');
        });
        done();
      });
  });
});
