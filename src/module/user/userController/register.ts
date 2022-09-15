import { NextFunction, Request, Response } from 'express';
import { findUser, save } from '../user.services';
import { hash } from 'argon2';
import { validateRegistration } from '../user.validator';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, username } = req.body;
    const { errors, valid } = validateRegistration({
        email,
        password,
        username,
    });
    if (!valid) {
        res.status(400).json(errors);
        return;
    }
    try {
        const isEmailExist = await findUser(email);
        if (isEmailExist !== null) {
            res.status(403).send('Email already registered');
            return;
        }
        const isUsernameExist = await findUser(username);
        if (isUsernameExist !== null) {
            res.status(403).send('Username already registered');
            return;
        }
        const hashedPassword = await hash(password);
        await save({
            email,
            password: hashedPassword,
            username,
        });
        res.status(201).send('registration successful');
        return;
    } catch (err) {
        next(err);
    }
};
