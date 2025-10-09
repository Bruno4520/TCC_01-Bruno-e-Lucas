import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.post('/', usuarioController.criar);
usuarioRoutes.post('/login', usuarioController.login);

export { usuarioRoutes };