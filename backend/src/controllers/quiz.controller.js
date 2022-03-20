import QuizDAO from '../dao/quizDAO.js';

export default class QuizController {
    static async createQuiz(req, res) {
        try {

            const quiz = await QuizDAO.createQuiz(req);
            res.status(201).json({ message: 'Quiz создан', quiz });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }

    static async updateQuiz(req, res) {
        try {

            const quiz = await QuizDAO.updateQuiz(req);
            res.status(201).json({ message: 'Quiz обновлен', quiz });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }

    static async getQuiz(req, res) {
        try {

            const quiz = await QuizDAO.getQuiz(req);

            if(!quiz) {
                return res.status(400).json({ message: 'Quiz не был получен' })
            }

            res.status(201).json({ message: 'Quiz получен', quiz });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }

    static async deleteQuiz(req, res) {
        try {

            const quiz = await QuizDAO.deleteQuiz(req); 
            
            if(!quiz) {
                return res.status(400).json({ message: 'Quiz не был удален' })
            }
            
            res.status(201).json({ message: 'Quiz удален', quiz });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }
    
    static async getUsersQuiz(req, res) {
        try {

            const quiz = await QuizDAO.getUsersQuiz(req);

            if(!quiz) {
                return res.status(400).json({ message: 'UsersQuiz не был получен' })
            }

            res.status(201).json({ message: 'UsersQuiz получен', quiz });

        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }

    static async getAllQuiz(req, res) {
        try {

            const quiz = await QuizDAO.getAllQuiz();

            if(!quiz) {
                return res.status(400).json({ message: 'AllQuiz не был получен' })
            }

            res.status(201).json({ message: 'AllQuiz получен', quiz });

        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }
}