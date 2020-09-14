import { expect, server, BASE_URL } from './setup';

describe('Products', () => {
  it('get products page', (done) => {
    server
      .get(`${BASE_URL}/products`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.products).to.be.instanceOf(Array);
        res.body.products.forEach((m) => {
          expect(m).to.have.property('product_name');
          expect(m).to.have.property('price');
          expect(m).to.have.property('cutting_type');
        });
        done();
      });
  });

  it('posts products', done => {
    const data = { product_name: 'plant name', price: '1.5', cutting_type: 'unrooted' };
    server
      .post(`${BASE_URL}/products`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.products).to.be.instanceOf(Array);
        res.body.products.forEach(m => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('product_name', data.product_name);
          expect(m).to.have.property('price', data.price);
          expect(m).to.have.property('cutting_type', data.cutting_type);
        });
        done();
      });
  });

  it('updates a product', (done) => {
    const data = {
      old_product_name: `'Philodendron Squamiferum'`,
      old_cutting_type: `'rooted'`,
      product_name: `'edited Philodendron Squamiferum'`,
      price: 3,
      cutting_type: `'edited rooted'`
    };
    server
      .put(`${BASE_URL}/products`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.products).to.be.instanceOf(Array);
        res.body.products.forEach((m) => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('product_name', 'edited Philodendron Squamiferum');
          expect(m).to.have.property('price', '3');
          expect(m).to.have.property('cutting_type', 'edited rooted');
        });
        done();
      });
  });
});
