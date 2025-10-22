/*
  Warnings:

  - You are about to drop the column `padrao` on the `Categoria` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome,usuarioId]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Categoria_nome_key";

-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "padrao",
ADD COLUMN     "sistema" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_usuarioId_key" ON "Categoria"("nome", "usuarioId");
