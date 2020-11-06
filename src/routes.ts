import { Router } from 'express';
import UsersController from './controllers/UsersController';
import AccountController from './controllers/AccountsController';
import User from './models/User';
import Account from './models/Account';

const routes = Router();

routes.get('/user', UsersController.listUsers);
routes.get('/user/:id', UsersController.getUser);
routes.put('/user/:id', UsersController.updateUser);
routes.post('/user', UsersController.create);
routes.delete('/user/:id', UsersController.deleteUser);

routes.post('/account', AccountController.create);

routes.put('/deposit/:id', AccountController.deposit);
routes.put('/withdraw/:id', AccountController.withdraw);


export default routes;