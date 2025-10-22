import { Router } from 'express';
import { FaturaController } from '../controllers/FaturaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const faturaRoutes = Router();
const faturaController = new FaturaController();

faturaRoutes.use(authMiddleware);
faturaRoutes.post('/:id/pagar', faturaController.pagar);

export { faturaRoutes };