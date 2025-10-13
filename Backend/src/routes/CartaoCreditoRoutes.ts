import { Router } from 'express';
import { CartaoCreditoController } from '../controllers/CartaoCreditoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const cartaoCreditoRoutes = Router();
const cartaoController = new CartaoCreditoController();

cartaoCreditoRoutes.use(authMiddleware);

cartaoCreditoRoutes.post('/', cartaoController.criar);
cartaoCreditoRoutes.get('/', cartaoController.listar);

export { cartaoCreditoRoutes };