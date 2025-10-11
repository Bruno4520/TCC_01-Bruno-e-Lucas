import { Router } from 'express';
import { ContaController } from '../controllers/ContaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const contaRoutes = Router();
const contaController = new ContaController();

contaRoutes.use(authMiddleware);

contaRoutes.post('/', contaController.criar);
contaRoutes.get('/', contaController.listar);

export { contaRoutes };