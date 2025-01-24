const request = require('supertest');
const app = require('./setup');

describe('Categories API', () => {
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

    it('should create a category', async () => {
        const res = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Category' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Category created successfully');
    });

    it('should fetch all categories', async () => {
        const res = await request(app).get('/api/categories');
        expect(res.statusCode).toBe(200);
        expect(res.body.categories).toBeDefined();
    });
});
