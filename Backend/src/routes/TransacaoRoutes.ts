import { Router } from 'express';
import { TransacaoController } from '../controllers/TransacaoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const transacaoRoutes = Router();
const transacaoController = new TransacaoController();

transacaoRoutes.use(authMiddleware);
transacaoRoutes.post('/', transacaoController.criar);
transacaoRoutes.get('/conta/:contaId', transacaoController.listarPorConta);
transacaoRoutes.delete('/:id', transacaoController.deletar);
transacaoRoutes.put('/:id', transacaoController.atualizar);

export { transacaoRoutes };