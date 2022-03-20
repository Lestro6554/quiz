import { check } from 'express-validator';

export default [
    check('login').exists(), 
    check('password').isLength({ min: 4 })
];