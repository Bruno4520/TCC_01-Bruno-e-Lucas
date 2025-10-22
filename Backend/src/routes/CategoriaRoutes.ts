import { Router } from 'express';
import { CategoriaController } from '../controllers/CategoriaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const categoriaRoutes = Router();
const categoriaController = new CategoriaController();

categoriaRoutes.use(authMiddleware);
categoriaRoutes.post('/', categoriaController.criar);
categoriaRoutes.get('/', categoriaController.listar);
categoriaRoutes.put('/:id', categoriaController.atualizar);
categoriaRoutes.delete('/:id', categoriaController.deletar);

export { categoriaRoutes };