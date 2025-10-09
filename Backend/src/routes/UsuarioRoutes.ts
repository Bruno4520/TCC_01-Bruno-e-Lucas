import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.post('/', usuarioController.criar);
usuarioRoutes.post('/login', usuarioController.login);

usuarioRoutes.get('/perfil', authMiddleware, usuarioController.buscarPerfil);

export { usuarioRoutes };