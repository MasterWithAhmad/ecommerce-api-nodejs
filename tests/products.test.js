const request = require('supertest');
const app = require('./setup');

describe('Products API', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@example.com',
                password: 'admin123',
            });
        token = res.body.token;
    });

    it('should create a product', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Product',
                description: 'Test Description',
                price: 100,
                category: '6793001b4054a78fb66bb467',
                stock: 10,
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Product created successfully');
    });

    it('should fetch all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.products).toBeDefined();
    });

    it('should fetch a product by ID', async () => {
        const product = await request(app).get('/api/products');
        const productId = product.body.products[0]._id;

        const res = await request(app).get(`/api/products/${productId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.product).toBeDefined();
    });
});

