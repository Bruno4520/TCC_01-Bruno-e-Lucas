/*
  Warnings:

  - Added the required column `ganhoLiquido` to the `Simulacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Simulacao" ADD COLUMN     "ganhoLiquido" DOUBLE PRECISION NOT NULL;
