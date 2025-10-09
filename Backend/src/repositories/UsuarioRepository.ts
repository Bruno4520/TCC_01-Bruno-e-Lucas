import { PrismaClient } from '../../generated/prisma/index.js';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export class UsuarioRepository {

  async criar(dadosUsuario: any) {

    const senhaHash = await argon2.hash(dadosUsuario.senha);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        senha: senhaHash,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      }
    });

    return novoUsuario;
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });
  }

  async buscarPorId(id: number) {
    return prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
  }
}