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
      cutting_type: 'rooted',
      cost_per_cutting: '1.5',
      current_count: '0.34',
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
          expect(m).to.have.property('product_id', data.product_name);
          expect(m).to.have.property('cost_per_cutting', data.cost_per_cutting);
          expect(m).to.have.property('cutting_type', data.cutting_type);
          expect(m).to.have.property('current)count', data.current_count);
        });
        done();
      });
  });
});
