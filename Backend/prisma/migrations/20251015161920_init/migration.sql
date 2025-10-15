-- DropForeignKey
ALTER TABLE "public"."CartaoCredito" DROP CONSTRAINT "CartaoCredito_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Categoria" DROP CONSTRAINT "Categoria_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Conta" DROP CONSTRAINT "Conta_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Fatura" DROP CONSTRAINT "Fatura_cartaoCreditoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Orcamento" DROP CONSTRAINT "Orcamento_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Parcela" DROP CONSTRAINT "Parcela_faturaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Parcela" DROP CONSTRAINT "Parcela_transacaoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Simulacao" DROP CONSTRAINT "Simulacao_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transacao" DROP CONSTRAINT "Transacao_cartaoCreditoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transacao" DROP CONSTRAINT "Transacao_contaId_fkey";

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_cartaoCreditoId_fkey" FOREIGN KEY ("cartaoCreditoId") REFERENCES "CartaoCredito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartaoCredito" ADD CONSTRAINT "CartaoCredito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fatura" ADD CONSTRAINT "Fatura_cartaoCreditoId_fkey" FOREIGN KEY ("cartaoCreditoId") REFERENCES "CartaoCredito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_transacaoId_fkey" FOREIGN KEY ("transacaoId") REFERENCES "Transacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_faturaId_fkey" FOREIGN KEY ("faturaId") REFERENCES "Fatura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Simulacao" ADD CONSTRAINT "Simulacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
