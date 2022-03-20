import ResultController from '../controllers/result.controller.js';
import Router from 'express';

const router = Router();

router.post('/quiz/:id/result', ResultController.createResultsByQuizId)
router.get('/myquiz/:id/result', ResultController.getAllResultsByQuizId)

const ResultRoutes = router;
export default ResultRoutes;