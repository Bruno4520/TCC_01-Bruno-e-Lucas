import { PrismaClient, type Simulacao } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();
type DadosCriarSimulacao = Omit<Simulacao, 'id' | 'dataSimulacao'>;

export class SimulacaoRepository {

    async salvar(dados: DadosCriarSimulacao) {
        return prisma.simulacao.create({
            data: dados,
        });
    }

    async buscarTodasPorUsuarioId(usuarioId: number) {
        return prisma.simulacao.findMany({
            where: { usuarioId },
            orderBy: { dataSimulacao: 'desc' },
        });
    }
}