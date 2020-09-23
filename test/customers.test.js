import { expect, server, BASE_URL } from './setup';

describe('Customers', () => {
  it('get customers page', (done) => {
    server
      .get(`${BASE_URL}/customers`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.customers).to.be.instanceOf(Array);
        res.body.customers.forEach((m) => {
          expect(m).to.have.property('name');
          expect(m).to.have.property('address');
        });
        done();
      });
  });

  it('posts customers', (done) => {
    const data = {
      name: 'plant name',
      address: 'Number 49, Seventh Square'
    };
    server
      .post(`${BASE_URL}/customers`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.customers).to.be.instanceOf(Array);
        res.body.customers.forEach((m) => {
          expect(m).to.have.property('name', data.name);
          expect(m).to.have.property('address', data.address);
        });
        done();
      });
  });
});