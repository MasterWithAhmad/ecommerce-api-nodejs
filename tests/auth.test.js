const request = require('supertest');
const app = require('./setup'); // Import setup.js

describe('Authentication API', () => {
    it('should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully.');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});