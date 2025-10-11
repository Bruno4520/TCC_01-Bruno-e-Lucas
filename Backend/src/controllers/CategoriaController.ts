import { type Request, type Response } from 'express';
import { type JwtPayload } from 'jsonwebtoken';
import { CategoriaRepository } from '../repositories/CategoriaRepository.js';

const categoriaRepository = new CategoriaRepository();

export class CategoriaController {

    async criar(req: Request, res: Response) {
        try {
            const { nome, descricao } = req.body;
            const { id: usuarioId } = (req as any).user as JwtPayload;

            if (!nome) {
                return res.status(400).json({ mensagem: 'A categoria precisa de um nome.' });
            }

            const novaCategoria = await categoriaRepository.criar({ nome, descricao, usuarioId });
            return res.status(201).json(novaCategoria);
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ mensagem: 'Já existe uma categoria com esse nome.' });
            }
            console.error("ERRO AO CRIAR CATEGORIA:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const { id: usuarioId } = (req as any).user as JwtPayload;
            const categorias = await categoriaRepository.buscarTodasPorUsuarioId(usuarioId);
            return res.status(200).json(categorias);
        } catch (error) {
            console.error("ERRO AO LISTAR CATEGORIAS:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, descricao } = req.body;
            const { id: usuarioId } = (req as any).user as JwtPayload;

            const categoriaExistente = await categoriaRepository.buscarPorIdEUsuarioId(Number(id), usuarioId);
            if (!categoriaExistente) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
            }

            const categoriaAtualizada = await categoriaRepository.atualizar(Number(id), { nome, descricao });
            return res.status(200).json(categoriaAtualizada);
        } catch (error) {
            console.error("ERRO AO ATUALIZAR CATEGORIA:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { id: usuarioId } = (req as any).user as JwtPayload;

            const categoriaExistente = await categoriaRepository.buscarPorIdEUsuarioId(Number(id), usuarioId);
            if (!categoriaExistente) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada ou não pertence a você.' });
            }

            await categoriaRepository.deletar(Number(id));
            return res.status(204).send();
        } catch (error) {
            console.error("ERRO AO DELETAR CATEGORIA:", error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}