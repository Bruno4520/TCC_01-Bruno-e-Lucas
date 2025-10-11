import { type Request, type Response } from 'express';
import { type JwtPayload } from 'jsonwebtoken';
import { ContaRepository } from '../repositories/ContaRepository.js';

const contaRepository = new ContaRepository();

export class ContaController {

    async criar(req: Request, res: Response) {
        try {
            const { nome, saldo, tipo } = req.body;
            const { id: usuarioId } = (req as any).user as JwtPayload;

            if (!nome || saldo === undefined || !tipo) {
                return res.status(400).json({ mensagem: 'Nome, saldo inicial e tipo são obrigatórios.' });
            }

            if (!['CARTEIRA', 'CONTA_CORRENTE', 'POUPANCA'].includes(tipo)) {
                return res.status(400).json({ mensagem: 'Tipo de conta inválido.' });
            }

            const novaConta = await contaRepository.criar({ nome, saldo, tipo, usuarioId });
            return res.status(201).json(novaConta);

        } catch (error) {
            console.error("ERRO AO CRIAR CONTA:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const { id: usuarioId } = (req as any).user as JwtPayload;
            const contas = await contaRepository.buscarTodasPorUsuarioId(usuarioId);
            return res.status(200).json(contas);

        } catch (error) {
            console.error("ERRO AO LISTAR CONTAS:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}