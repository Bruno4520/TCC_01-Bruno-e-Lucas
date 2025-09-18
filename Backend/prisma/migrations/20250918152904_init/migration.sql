-- CreateEnum
CREATE TYPE "public"."TipoConta" AS ENUM ('CARTEIRA', 'CONTA_CORRENTE', 'POUPANCA');

-- CreateEnum
CREATE TYPE "public"."TipoTransacao" AS ENUM ('RECEITA', 'DESPESA');

-- CreateEnum
CREATE TYPE "public"."FormaPagamento" AS ENUM ('DEBITO', 'CREDITO', 'PIX', 'DINHEIRO');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Conta" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "tipo" "public"."TipoConta" NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Orcamento" (
    "id" SERIAL NOT NULL,
    "valorPlanejado" DOUBLE PRECISION NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transacao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" "public"."TipoTransacao" NOT NULL,
    "formaPagamento" "public"."FormaPagamento" NOT NULL,
    "contaId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "cartaoCreditoId" INTEGER,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CartaoCredito" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "limite" DOUBLE PRECISION NOT NULL,
    "diaFechamentoFatura" INTEGER NOT NULL,
    "diaVencimentoFatura" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "CartaoCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Fatura" (
    "id" SERIAL NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "estaPaga" BOOLEAN NOT NULL DEFAULT false,
    "cartaoCreditoId" INTEGER NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Parcela" (
    "id" SERIAL NOT NULL,
    "numeroParcela" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "transacaoId" INTEGER NOT NULL,
    "faturaId" INTEGER NOT NULL,

    CONSTRAINT "Parcela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Simulacao" (
    "id" SERIAL NOT NULL,
    "valorInicial" DOUBLE PRECISION NOT NULL,
    "aporteMensal" DOUBLE PRECISION NOT NULL,
    "taxa" DOUBLE PRECISION NOT NULL,
    "periodo" INTEGER NOT NULL,
    "dataSimulacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorFinalBruto" DOUBLE PRECISION NOT NULL,
    "valorFinalLiquido" DOUBLE PRECISION NOT NULL,
    "totalInvestido" DOUBLE PRECISION NOT NULL,
    "valorImposto" DOUBLE PRECISION NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Simulacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "public"."Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Parcela_transacaoId_numeroParcela_key" ON "public"."Parcela"("transacaoId", "numeroParcela");

-- AddForeignKey
ALTER TABLE "public"."Conta" ADD CONSTRAINT "Conta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Categoria" ADD CONSTRAINT "Categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orcamento" ADD CONSTRAINT "Orcamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orcamento" ADD CONSTRAINT "Orcamento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transacao" ADD CONSTRAINT "Transacao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "public"."Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transacao" ADD CONSTRAINT "Transacao_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transacao" ADD CONSTRAINT "Transacao_cartaoCreditoId_fkey" FOREIGN KEY ("cartaoCreditoId") REFERENCES "public"."CartaoCredito"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartaoCredito" ADD CONSTRAINT "CartaoCredito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fatura" ADD CONSTRAINT "Fatura_cartaoCreditoId_fkey" FOREIGN KEY ("cartaoCreditoId") REFERENCES "public"."CartaoCredito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Parcela" ADD CONSTRAINT "Parcela_transacaoId_fkey" FOREIGN KEY ("transacaoId") REFERENCES "public"."Transacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Parcela" ADD CONSTRAINT "Parcela_faturaId_fkey" FOREIGN KEY ("faturaId") REFERENCES "public"."Fatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Simulacao" ADD CONSTRAINT "Simulacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
