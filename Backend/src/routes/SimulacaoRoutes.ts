import { Router } from 'express';
import { SimulacaoController } from '../controllers/SimulacaoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const simulacaoRoutes = Router();
const simulacaoController = new SimulacaoController();

simulacaoRoutes.use(authMiddleware);
simulacaoRoutes.post('/', simulacaoController.simular);
simulacaoRoutes.get('/', simulacaoController.listar);

export { simulacaoRoutes };