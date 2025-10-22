import express from 'express';
import { usuarioRoutes } from './routes/UsuarioRoutes.js';
import { contaRoutes } from './routes/ContaRoutes.js';
import { categoriaRoutes } from './routes/CategoriaRoutes.js';
import { transacaoRoutes } from './routes/TransacaoRoutes.js';
import { cartaoCreditoRoutes } from './routes/CartaoCreditoRoutes.js';
import { orcamentoRoutes } from './routes/OrcamentoRoutes.js';
import { faturaRoutes } from './routes/FaturaRoutes.js';
import { simulacaoRoutes } from './routes/SimulacaoRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contas', contaRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/transacoes', transacaoRoutes);
app.use('/api/cartoes', cartaoCreditoRoutes);
app.use('/api/orcamentos', orcamentoRoutes);
app.use('/api/faturas', faturaRoutes);
app.use('/api/simulacoes', simulacaoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});