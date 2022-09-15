import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import { Server } from 'http';
import { Express } from 'express';
import { createServer } from '../../../app';
import request from 'supertest';
import { connectToDB, disconnectDB } from '../../../utils/db';

import { faker } from '@faker-js/faker';

let app: Express;
let server: Server;

beforeAll(async () => {
    app = createServer();
    server = app.listen(5001);
    await connectToDB();
});

afterAll(async () => {
    server.close();
    await disconnectDB();
});

describe('register controller', () => {
    it('should return 400 when email is invalid', async () => {
        const body = {
            email: 'invalid email',
            username: 'my_username99',
            password: 'MyPower123',
        };
        const response = await request(app).post('/api/user/register').send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject([
            {
                field: expect.stringMatching('email'),
                message: expect.stringContaining('email'),
            },
        ]);
    });

    it('should return 400 when username is invalid ', async () => {
        const body = {
            email: 'valid@mail.com',
            username: 'jack.',
            password: 'MyPower123',
        };
        const response = await request(app).post('/api/user/register').send(body);
        expect(response.statusCode).toBe(400);
        console.log('body : ', response.body);
        expect(response.body).toMatchObject([
            {
                field: expect.stringMatching('username'),
                message: expect.stringContaining('username'),
            },
        ]);
    });

    it('should return 400 when password is invalid ', async () => {
        const body = {
            email: 'valid@mail.com',
            username: 'my_username99',
            password: 'invalid password',
        };
        const response = await request(app).post('/api/user/register').send(body);
        expect(response.statusCode).toBe(400);
        console.log('body : ', response.body);
        expect(response.body).toMatchObject([
            {
                field: expect.stringMatching('password'),
                message: expect.stringContaining('password'),
            },
        ]);
    });

    it('should return 400 when password or username or email is in invalid ', async () => {
        const body = {
            email: 'invalid email',
            username: 'invalid username',
            password: 'invalid password',
        };
        const response = await request(app).post('/api/user/register').send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject([
            {
                field: expect.stringMatching('username'),
                message: expect.stringContaining('username'),
            },
            {
                field: expect.stringMatching('email'),
                message: expect.stringContaining('email'),
            },
            {
                field: expect.stringMatching('password'),
                message: expect.stringContaining('password'),
            },
        ]);
    });

    it('should return status code 201', async () => {
        const body = {
            email: faker.internet.email(),
            username: faker.internet.userName().toLowerCase(),
            password: 'MyPower123',
        };
        console.log('body : ', body);

        const response = await request(app).post('/api/user/register').send(body);
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe('registration successful');
    });
});
