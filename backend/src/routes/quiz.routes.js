import QuizController from '../controllers/quiz.controller.js';
import Router from 'express';

const router = Router();

router.post('/quiz/create', QuizController.createQuiz);
router.get('/quiz/:id', QuizController.getQuiz);

router.get('/myquiz', QuizController.getAllQuiz);
router.get('/myquiz/:userId', QuizController.getUsersQuiz);
router.get('/myquiz/:id', QuizController.getQuiz);
router.put('/myquiz/edit/:id', QuizController.updateQuiz);
router.delete('/myquiz/delete/:id', QuizController.deleteQuiz);

const QuizRoutes = router;
export default QuizRoutes;