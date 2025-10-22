-- DropForeignKey
ALTER TABLE "public"."Orcamento" DROP CONSTRAINT "Orcamento_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transacao" DROP CONSTRAINT "Transacao_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Orcamento" ALTER COLUMN "categoriaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transacao" ALTER COLUMN "categoriaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
