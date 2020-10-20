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

  it('can post a new order for a particular customer', (done) => {
    const data = {
      customer_id: 1,
      order_date: 'timestamp here',
      order_total: 90.00,
      order_items: [{
        stock_id: 1,
        count: 30,
        price: 3,
        cost_per_cutting: 0.35
      }]
    };
    server
      .post(`${BASE_URL}/orders`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.order[0]).to.have.property('order_date', 'timestamp here');
        expect(res.body.order[0]).to.have.property('order_total', '90');
        expect(res.body.order[0]).to.have.property('customer_id', 1);
        expect(res.body.order[0]).to.have.property('id');
        res.body.order_items.forEach((orderItem) => {
          expect(orderItem).to.have.property('stock_id', 1);
          expect(orderItem).to.have.property('count', 30);
          expect(orderItem).to.have.property('price', 3);
          expect(orderItem).to.have.property('cost_per_cutting', 0.35);
          expect(orderItem).to.have.property('order_id', res.body.order[0].id);
        });
        done();
      });
  });
});
