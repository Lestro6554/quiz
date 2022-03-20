import ResultDAO from '../dao/resultDAO.js';
import QuizDAO from '../dao/quizDAO.js';
import UsersDAO from '../dao/usersDAO.js';

export default class ResultController {
    static async getAllResultsByQuizId(req, res) {
        try {

            const results = await ResultDAO.getAllResultsByQuizId(req);
        
            if(!results) {
                return res.status(400).json({ message: 'Результаты не были получены' })
            }

            res.status(201).json({ message: 'Результаты были получены', results });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }

    static async createResultsByQuizId(req, res) {
        try {

            const quiz = await QuizDAO.getQuiz(req); //получаю квиз по id
            const userByResult = await ResultDAO.getUserByResult(req.body.userId, req.body.quizId);
            
            const answers = req.body.answers; //записываю ответы на вопросы
            let name, fullname, userId;

            if(userByResult.length > 0) {
                return res.status(200).json({ message: 'Тест был уже пройден' })
            }

            for (let i in answers) {
                let answer = answers[i].answer.trim().toLowerCase().split(" ");
                let correctAnswer = quiz.questions[i].correctAnswer.trim().toLowerCase().split(" ");
                
                answers[i].answer = answer[i] === correctAnswer[i];
            }

            if(req.body.userId == 'null') {
                name = "Анонимный",
                fullname = "Пользователь",
                userId = null;
            } else {
                const user = await UsersDAO.getUserByUserId(req.body.userId); //получение пользователя
                name = user.name;
                fullname = user.fullname;
                userId = req.body.userId;
            }

            const results = await ResultDAO.createResultsByQuizId(req.body.quizId, userId, name, fullname, answers);

            if(!results) {
                return res.status(400).json({ message: 'Результаты не были записаны' })
            }

            res.status(201).json({ message: 'Результаты были записаны' });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }
}
