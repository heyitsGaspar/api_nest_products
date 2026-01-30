import { Injectable } from '@nestjs/common';
import { Rol } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

import { Usuario } from '../domain/user.model';
import {
  DuplicateEmailError,
  UnauthorizedError,
} from '../../errors/user.errors';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Omit<Usuario, 'id'>): Promise<Usuario> {
    // Verifica si el correo ya existe
    const exists = await this.prisma.usuario.findUnique({
      where: { correo: data.correo },
    });
    if (exists) throw new DuplicateEmailError(data.correo);
    return this.prisma.usuario.create({ data });
  }

  async getUsers(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async getUserById(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async updateUser(
    id: number,
    data: Partial<Usuario>,
    currentRole: Rol,
  ): Promise<Usuario> {
    if (currentRole !== Rol.admin) throw new UnauthorizedError();
    return this.prisma.usuario.update({ where: { id }, data });
  }

  async deleteUser(id: number, currentRole: Rol): Promise<void> {
    if (currentRole !== Rol.admin) throw new UnauthorizedError();
    await this.prisma.usuario.delete({ where: { id } });
  }
}
