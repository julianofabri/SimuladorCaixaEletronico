import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Account from '../models/Account';
import User from '../models/User';

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            birthDate,
            CPF,
            isActive,
            newAccounts
        } = request.body;
        
        let accounts;

        const usersRepository = getRepository(User);

        if(newAccounts){
            accounts = newAccounts.map((account: Account) => {
                return { 
                    accountType: account.accountType,
                    balance: account.balance,
                    isActive: account.isActive
                }
            });
        }
        
        
        const user = usersRepository.create({
            name,
            birthDate,
            CPF,
            isActive,
            accounts
        });
    
        await usersRepository.save(user).then(() => {
            return response.status(201).json({
                message: 'Novo Usuário Cadastrado',
                user: user
            });
        }).catch((err) => {
            console.log(err);
            if(err.errno == 19)
                return response.status(409).json({
                    message: 'CPF já cadastrado. Insira um CPF válido.'
                });
        });
    },

    async getUser(request: Request, response: Response){
        const { id } = request.params;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { id } });

        if(user == undefined){
            return response.json({
                message: 'Usuário não encontrado.'
            });
        }

        return response.json(user);
    },

    async updateUser(request: Request, response: Response){

        const id = request.params;
        const {
            name,
            birthDate,
            CPF,
            isActive
        } = request.body;

        const usersRepository = getRepository(User);
        
        await usersRepository.update(id, {
            name,
            birthDate,
            CPF,
            isActive
        }).catch(err => {
            return response.json({
                message: err
            });
        });

        return response.json({
            message: 'Usuário alterado com sucesso.'
        });
    },

    async listUsers(request: Request, response: Response){
        const usersRepository = getRepository(User);

        const users = await usersRepository.find();

        return response.json(users);

    },

    async deleteUser(request: Request, response: Response){
        const id = request.params;

        const usersRepository = getRepository(User);
        
        await usersRepository.update(id, {
            isActive: false
        }).catch(err => {
            return response.json({
                message: err
            });
        });

        return response.json({
            message: 'Usuário excluído com sucesso.'
        });
    }
}