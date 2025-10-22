import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

interface DadosCriarCartao {
    nome: string;
    limite: number;
    diaFechamentoFatura: number;
    diaVencimentoFatura: number;
    usuarioId: number;
}

interface DadosAtualizarCartao {
    nome?: string;
    limite?: number;
    diaFechamentoFatura?: number;
    diaVencimentoFatura?: number;
}

export class CartaoCreditoRepository {

    async criar(dados: DadosCriarCartao) {
        return prisma.cartaoCredito.create({
            data: {
                nome: dados.nome,
                limite: dados.limite,
                diaFechamentoFatura: dados.diaFechamentoFatura,
                diaVencimentoFatura: dados.diaVencimentoFatura,
                usuarioId: dados.usuarioId,
            },
        });
    }

    async buscarTodosPorUsuarioId(usuarioId: number) {
        return prisma.cartaoCredito.findMany({
            where: { usuarioId },
            orderBy: { nome: 'asc' },
        });
    }

    async buscarPorIdEUsuarioId(id: number, usuarioId: number) {
        return prisma.cartaoCredito.findUnique({
            where: { id, usuarioId },
        });
    }

    async buscarFaturasPorCartaoId(id: number) {
        return prisma.cartaoCredito.findUnique({
            where: { id },
            include: {
                faturas: {
                    orderBy: [{ ano: 'desc' }, { mes: 'desc' }],
                    include: {
                        parcelas: true,
                    },
                },
            },
        });
    }

    async atualizar(id: number, dados: DadosAtualizarCartao) {
        return prisma.cartaoCredito.update({
            where: { id },
            data: dados,
        });
    }

    async deletar(id: number) {
        return prisma.cartaoCredito.delete({
            where: { id },
        });
    }
}