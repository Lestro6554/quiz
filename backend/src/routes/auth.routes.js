import { registerValidation, loginValidation } from '../utils/validations/index.js';
import UsersController from '../controllers/users.controller.js';
import Router from 'express';

const router = Router();

router.post('/registration', registerValidation, UsersController.registerUser)
router.post('/authorization', loginValidation, UsersController.authUser)

const UserRoutes = router;
export default UserRoutes;