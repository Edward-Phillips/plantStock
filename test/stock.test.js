import { expect, server, BASE_URL } from './setup';

describe('stock resource', () => {
  it('gets stock page', (done) => {
    server
      .get(`${BASE_URL}/stock`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.stock).to.be.instanceOf(Array);
        res.body.stock.forEach((m) => {
          expect(m).to.have.property('cost_per_cutting');
          expect(m).to.have.property('current_count');
          expect(m).to.have.property('last_updated');
          expect(m).to.have.property('product_id');
        });
        done();
      });
  });

  it('posts stock', (done) => {
    const data = {
      product_name: 'Philodendron Squamiferum',
      cutting_type: 'unrooted',
      cost_per_cutting: '0.36',
      current_count: 31,
    };
    server
      .post(`${BASE_URL}/stock`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.stock).to.be.instanceOf(Array);
        res.body.stock.forEach((m) => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('product_name', data.product_name);
          expect(m).to.have.property('cost_per_cutting', data.cost_per_cutting);
          expect(m).to.have.property('current_count', data.current_count);
        });
        done();
      });
  });
});
