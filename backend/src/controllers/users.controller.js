import UsersDAO from '../dao/usersDAO.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { validationResult } from 'express-validator';

export default class UsersController {
    static async registerUser(req, res) {
        try {
            //валидность полученных данных
            const errors = validationResult(req);
    
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверные данные при регистрации' 
                })
            }
    
            //проверка на доступность логина
            const findUser = await UsersDAO.getUser(req);
    
            if(findUser) {
                return res.status(400).json({ message: 'Логин уже существует' })
            }
    
            const user = await UsersDAO.createUser(req);
    
            res.status(201).json({ message: 'Пользователь создан' });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }

    static async authUser(req, res) {
        try {
            //валидность полученных данных от фронта
            const errors = validationResult(req);
    
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверные данные при входе' 
                })
            }
    
            const user = await UsersDAO.getUser(req);//получение пользователя по логину
    
            if(!user) {
                return res.status(400).json({ message: 'Неверный логин' })
            }
            
            const verifyPassword = await bcrypt.compare(req.body.password, user.password); //сравнение паролей
            
    
            if(!verifyPassword) {
                return res.status(400).json({ message: 'Неверный пароль' })
            }
            //создание токена авторизации
            const token = jwt.sign(
                { 
                    userId: user.id ,
                    login: user.login,
                    name: user.name,
                    fullname: user.fullname
                },
                config.get('jwtSecret'),
                { expiresIn: '1h'}
            );
            res.json({ token, userId: user.id })
    
        } catch (err) {
            res.status(500).json({message: '500 ошибка'})
        }
    }
}


