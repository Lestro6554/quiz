import Quiz from '../models/Quiz.js';

export default class QuizDAO {
    static async getQuiz(req) {
        return await Quiz.findById(req.params.id)
    }

    static async getUsersQuiz(req) {
        return await Quiz.find({userId: req.params.userId})
    }

    static async getAllQuiz() {
        return await Quiz.find({})
    }

    static async deleteQuiz(req) {
        return await Quiz.findByIdAndDelete(req.params.id)
    }

    static async updateQuiz(req) {
        await Quiz.findByIdAndUpdate(req.params.id, req.body);
    }

    static async createQuiz(req) {
        const title = req.body.title;
        const description = req.body.description;
        const privateQuiz = req.body.privateQuiz;
        const open = req.body.open;
        const userId = req.body.userId;
        const questions = req.body.questions;
        const timer = req.body.timer;
        
        const quiz = new Quiz({ title, description, privateQuiz, open, userId, questions, timer });
        await quiz.save();
    }

}