import express from 'express';
import { usuarioRoutes } from './routes/UsuarioRoutes.js';
import { contaRoutes } from './routes/ContaRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contas', contaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});