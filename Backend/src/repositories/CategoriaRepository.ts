import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

interface DadosCriarCategoria {
    nome: string;
    descricao?: string;
    usuarioId: number;
}

interface DadosAtualizarCategoria {
    nome?: string;
    descricao?: string;
}

export class CategoriaRepository {

    async criar(dados: DadosCriarCategoria) {
        return prisma.categoria.create({
            data: {
                nome: dados.nome,
                descricao: dados.descricao || null,
                usuarioId: dados.usuarioId,
            },
        });
    }

    async buscarTodasPorUsuarioId(usuarioId: number) {
        return prisma.categoria.findMany({
            where: {
                usuarioId
            },
            orderBy: {
                nome: 'asc'
            },
        });
    }

    async buscarPorIdEUsuarioId(id: number, usuarioId: number) {
        return prisma.categoria.findUnique({
            where: {
                id,
                usuarioId
            },
        });
    }

    async atualizar(id: number, dados: DadosAtualizarCategoria) {
        return prisma.categoria.update({
            where: {
                id
            },
            data: dados,
        });
    }

    async deletar(id: number) {
        return prisma.categoria.delete({
            where: {
                id
            },
        });
    }
}