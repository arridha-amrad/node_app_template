import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => res.send('Test route'));

export default router;
