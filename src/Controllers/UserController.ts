require('dotenv').config();
import prisma from '../../PrismaClinet';
import * as bcr from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { User } from '@prisma/client'
import { CurrentUser, LoginRequest, SignupRequest } from '../Helpers/TypeDefs';
import { LoginRequestValidator, SignupRequestValidator } from '../Helpers/Validators';
import { authDetails } from '../Helpers/Middleware';

const SignupHandler = async (req: Request, res: Response) => {
    const body: SignupRequest = req.body;

    const validation = SignupRequestValidator(body);

    if (!validation[0]) {
        return res.status(400).json({ message: `Missing ${validation[1]}` });
    }

    const { email, name, password } = body;

    let user: User | null = await prisma.user.findFirst({ where: { email: email } });
    if (user) {
        return res.status(409).json({ message: `Account with ${email} already exists!` });
    }

    bcr.hash(password, 13).then((hash: string) => {
        prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hash,
            },
        }).then((doc: User | { password?: string }) => {
            delete doc.password;
            const token = jwt.sign(doc, String(process.env.JWT_SECRET_KEY))
            return res.status(200).json({ user: doc, token: token });
        }).catch((err: Error) => {
            return res.status(500).json({ message: err.message })
        })
    }).catch((err: Error) => {
        return res.status(500).json({ message: err.message })
    });
};


const LoginHandler = async (req: Request, res: Response) => {
    const body: LoginRequest = req.body;

    const validation = LoginRequestValidator(body);
    if (!validation[0]) {
        return res.status(400).json({ message: `Missing ${validation[1]}` });
    }

    const { email, password } = body;

    let user: User | null = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
        return res.status(404).json({ message: `Account with ${email} doesn't exist!` });
    }

    let mUser: any | { password?: string } = user;
    bcr.compare(password, user.password).then((match: boolean) => {
        if (!match) {
            return res.status(409).json({ message: "Wrong Password" });
        }
        delete mUser.password;
        const token = jwt.sign(mUser, String(process.env.JWT_SECRET_KEY))
        return res.status(200).json({ user: mUser, token: token });

    }).catch(
        (err: Error) => { return res.status(500).json({ message: err.message }) }
    )
}

export { SignupHandler, LoginHandler}