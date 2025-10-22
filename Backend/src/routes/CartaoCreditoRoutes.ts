import { Router } from 'express';
import { CartaoCreditoController } from '../controllers/CartaoCreditoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const cartaoCreditoRoutes = Router();
const cartaoController = new CartaoCreditoController();

cartaoCreditoRoutes.use(authMiddleware);
cartaoCreditoRoutes.post('/', cartaoController.criar);
cartaoCreditoRoutes.get('/', cartaoController.listar);
cartaoCreditoRoutes.put('/:id', cartaoController.atualizar);
cartaoCreditoRoutes.delete('/:id', cartaoController.deletar);
cartaoCreditoRoutes.get('/:id/faturas', cartaoController.listarFaturas);

export { cartaoCreditoRoutes };