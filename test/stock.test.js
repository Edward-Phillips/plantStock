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
});
