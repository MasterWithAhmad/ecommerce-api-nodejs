const request = require('supertest');
const app = require('./setup');

describe('Orders API', () => {
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

    it('should place an order', async () => {
        const res = await request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Order placed successfully');
    });

    it('should fetch user orders', async () => {
        const res = await request(app)
            .get('/api/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.orders).toBeDefined();
    });
});

