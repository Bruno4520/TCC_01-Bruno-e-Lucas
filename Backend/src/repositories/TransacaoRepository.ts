import { PrismaClient, type FormaPagamento, type TipoTransacao } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

interface DadosCriarTransacao {
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    formaPagamento: FormaPagamento;
    contaId: number;
    categoriaId: number;
}

export class TransacaoRepository {

    async criar(dados: DadosCriarTransacao) {
        return prisma.$transaction(async (tx) => {
            const transacao = await tx.transacao.create({
                data: {
                    descricao: dados.descricao,
                    valor: dados.valor,
                    tipo: dados.tipo,
                    formaPagamento: dados.formaPagamento,
                    contaId: dados.contaId,
                    categoriaId: dados.categoriaId,
                },
            });

            const valorAtualizacao = dados.tipo === 'RECEITA' ? dados.valor : -dados.valor;

            await tx.conta.update({
                where: { id: dados.contaId },
                data: {
                    saldo: {
                        increment: valorAtualizacao,
                    },
                },
            });

            return transacao;
        });
    }

    async buscarTodasPorContaId(contaId: number) {
        return prisma.transacao.findMany({
            where: { contaId },
            orderBy: { data: 'desc' },
        });
    }
}