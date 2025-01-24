const request = require('supertest');
const app = require('./setup');

describe('Cart API', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'user@example.com',
                password: 'user123',
            });
        token = res.body.token;
    });

    it('should add an item to the cart', async () => {
        const res = await request(app)
            .post('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: '<product-id>',
                quantity: 2,
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Item added to cart');
    });

    it('should fetch the user\'s cart', async () => {
        const res = await request(app)
            .get('/api/cart')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
    });
});
