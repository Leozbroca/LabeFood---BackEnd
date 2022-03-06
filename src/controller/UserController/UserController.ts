import {Request, Response} from 'express';
import UserBussiness from '../../bussiness/UserBussiness/UserBussiness';
import { userInputDTO } from '../../types'
import { BaseDatabase } from '../../data/BaseDatabase';

class UserController {
    async signup(req:Request, res:Response) {
        try {
            const{name, email, cpf, password} = req.body

            const input:userInputDTO = {
                name,
                email,
                cpf,
                password
            }

            const token = await UserBussiness.signup(input)
            res.status(201).send({ message: "User created sucessfully!", token })
        } catch (error:any) {
            res.status(400).send({
                message: error.message
            });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async login(req:Request, res:Response) {
        try {
            const{ email, password } = req.body

            const input = {
                email,
                password
            }

            const token = await UserBussiness.login(input)
            res.status(201).send({ message: "User logged sucessfully!", token })
        } catch (error:any) {
            res.status(400).send({
                message: error.message
            });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async editUser(req:Request, res:Response) {
        try {
            const token = req.headers.authorization as string;
            const{ name, email, cpf, password } = req.body

            const input = {
                name,
                email,
                cpf,
                password
            }

            await UserBussiness.editUser(input, token)
            res.status(201).send({ message: "User edited sucessfully!"})
        } catch (error:any) {
            res.status(400).send({
                message: error.message
            });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async createAddress(req:Request, res:Response) {
        try {
            const token = req.headers.authorization as string;
            const{ cep, number, complement } = req.body

            const input = {
                cep,
                number,
                complement
            }

            await UserBussiness.createAddress(input, token)
            res.status(201).send({ message: "Address created sucessfully!"})
        } catch (error:any) {
            res.status(400).send({
                message: error.message
            });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }
}

export default new UserController()