import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UsuarioRepository } from '../../domain/repository/usuario.repository';
import { Usuario } from '../../domain/user.model';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { correo: email },
    });

    if (!user) return null;

    return new Usuario(
      user.id,
      user.nombre,
      user.apellido,
      user.correo,
      user.password,
      user.rol,
    );
  }

  async create(data: Omit<Usuario, 'id'>): Promise<Usuario> {
    const user = await this.prisma.usuario.create({ data });

    return new Usuario(
      user.id,
      user.nombre,
      user.apellido,
      user.correo,
      user.password,
      user.rol,
    );
  }
}
