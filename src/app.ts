import express from 'express';
import TestRoute from './module/test/test.routes';

export const createServer = (): express.Express => {
    const app = express();

    app.use(express.json());
    app.use('/api/test', TestRoute);

    return app;
};
