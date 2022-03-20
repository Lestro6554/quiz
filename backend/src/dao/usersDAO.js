import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default class UsersDAO {
    static async getUserByUserId(req) {
        return await User.findById(req)
    }

    static async getUser(req) {
        return await User.findOne({ login: req.body.login })
    }

    static async createUser(req) {
        const {login, password, name, fullname} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ login, password: hashedPassword, name, fullname });
        await user.save();
    }

}