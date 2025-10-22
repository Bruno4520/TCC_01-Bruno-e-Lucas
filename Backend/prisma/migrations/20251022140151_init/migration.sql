/*
  Warnings:

  - You are about to drop the column `periodo` on the `Simulacao` table. All the data in the column will be lost.
  - You are about to drop the column `taxa` on the `Simulacao` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Simulacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodoMensal` to the `Simulacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxaMensal` to the `Simulacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Simulacao" DROP COLUMN "periodo",
DROP COLUMN "taxa",
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "periodoMensal" INTEGER NOT NULL,
ADD COLUMN     "taxaMensal" DOUBLE PRECISION NOT NULL;
