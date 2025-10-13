import { type Request, type Response } from 'express';
import { type JwtPayload } from 'jsonwebtoken';
import { CartaoCreditoRepository } from '../repositories/CartaoCreditoRepository.js';

const cartaoCreditoRepository = new CartaoCreditoRepository();

export class CartaoCreditoController {

    async criar(req: Request, res: Response) {
        try {
            const { nome, limite, diaFechamentoFatura, diaVencimentoFatura } = req.body;
            const { id: usuarioId } = (req as any).user as JwtPayload;

            if (!nome || !limite || !diaFechamentoFatura || !diaVencimentoFatura) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
            }

            const novoCartao = await cartaoCreditoRepository.criar({
                nome,
                limite,
                diaFechamentoFatura,
                diaVencimentoFatura,
                usuarioId,
            });

            return res.status(201).json(novoCartao);
        } catch (error) {
            console.error("ERRO AO CRIAR CARTÃO DE CRÉDITO:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const { id: usuarioId } = (req as any).user as JwtPayload;
            const cartoes = await cartaoCreditoRepository.buscarTodosPorUsuarioId(usuarioId);
            return res.status(200).json(cartoes);
        } catch (error) {
            console.error("ERRO AO LISTAR CARTÕES DE CRÉDITO:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}