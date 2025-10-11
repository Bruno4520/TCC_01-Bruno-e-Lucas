import { PrismaClient, type TipoConta } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

interface DadosCriarConta {
    nome: string;
    saldo: number;
    tipo: TipoConta;
    usuarioId: number;
}

export class ContaRepository {
    async criar(dados: DadosCriarConta) {
        return prisma.conta.create({
            data: {
                nome: dados.nome,
                saldo: dados.saldo,
                tipo: dados.tipo,
                usuarioId: dados.usuarioId,
            },
        });
    }

    async buscarTodasPorUsuarioId(usuarioId: number) {
        return prisma.conta.findMany({
            where: {
                usuarioId: usuarioId,
            },
            orderBy: {
                nome: "asc",
            },
        });
    }

    async buscarPorIdEUsuarioId(id: number, usuarioId: number) {
        return prisma.conta.findUnique({
            where: {
                id,
                usuarioId,
            },
        });
    }
}
