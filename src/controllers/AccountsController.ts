import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Account from '../models/Account';

export default {
    async create(request: Request, response: Response) {
        const {
            userId,
            accountType,
            balance,
            isActive
        } = request.body;
        
        const accountRepository = getRepository(Account);
    
        const account = accountRepository.create({
            accountType,
            balance,
            isActive,
            user: userId
        });
    
    
        await accountRepository.save(account).then(() => {
            return response.status(201).json({
                message: 'Nova conta bancária aberta',
                user: account
            });
        }).catch((err) => {
            if(err.errno == 19){
                return response.status(409).json({
                    message: 'Erro ao cadastrar conta bancária, cheque as informações e tente novamente'
                });
            }
        });
    },

    async deposit(request: Request, response: Response){
        const { id } = request.params;

        const { deposito } = request.body;

        if(deposito % 1 != 0){
            return response.json({
                message: 'Deposito não aceita valores decimais'
            });
        }

        const accountsRepository = getRepository(Account);

        if(deposito > 0){
            const account = await accountsRepository.findOne({ where: { id } });

            if(account !== undefined){
                if(!account.inOperation){
                    await accountsRepository.update(id, {
                        inOperation: true
                    }).catch(err => {
                        return response.json({
                            message: err
                        });
                    });

                    await new Promise(resolve => setTimeout(resolve, 5000));
    
                    await accountsRepository.update(id, {
                        balance: account.balance + deposito
                    }).catch(err => {
                        return response.json({
                            message: err
                        });
                    });
    
                    await accountsRepository.update(id, {
                        inOperation: false
                    }).catch(err => {
                        return response.json({
                            message: err
                        });
                    });

                    return response.json({
                        message: 'Depósito efetuado com sucesso.'
                    });
                } else {
                    return response.json({
                        message: 'Conta bancária em outra transação.'
                    });
                }
                
            } else {
                return response.json({
                    message: 'Conta bancária não encontrada.'
                });
            }

        } else {
            return response.json({
                message: 'Valor do depósito não pode ser negativo'
            })
        }
        
    },

    async withdraw(request: Request, response: Response){
        const { id } = request.params;

        const { saque, accountType } = request.body;

        if(saque % 1 != 0){
            return response.json({
                message: 'Saque não aceita valores decimais'
            });
        }

        const accountsRepository = getRepository(Account);

        if(saque > 0){
            const account = await accountsRepository.findOne({ where: { id, accountType } });

            if(account !== undefined){
                if(!account.inOperation){
                    await accountsRepository.update(id, {
                        inOperation: true
                    }).catch(err => {
                        return response.json({
                            message: err
                        });
                    });

                    await new Promise(resolve => setTimeout(resolve, 5000));
    
                    await accountsRepository.update(id, {
                        balance: account.balance - saque
                    }).catch(err => {
                        return response.json({
                            message: err
                        });
                    });
    
                    await accountsRepository.update(id, {
                        inOperation: false
                    }).catch(err => {
                        return response.json({
                            message: err
                        });
                    });

                    return response.json({
                        message: 'Saque efetuado com sucesso.'
                    });
                } else {
                    return response.json({
                        message: 'Conta bancária em outra transação.'
                    });
                }
                
            } else {
                return response.json({
                    message: 'Conta bancária não encontrada.'
                });
            }

        } else {
            return response.json({
                message: 'Valor do saque não pode ser negativo'
            })
        }
        
    },

    async listAccounts(request: Request, response: Response){
        const accountRepository = getRepository(Account);

        const account = await accountRepository.find();

        return response.json(account);

    }
}