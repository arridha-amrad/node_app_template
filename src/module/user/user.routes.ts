/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express';
import { register } from './userController/register';

const router = Router();

router.post('/register', register);

export default router;
