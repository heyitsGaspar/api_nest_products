import { Rol as PrismaRol } from '@prisma/client';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: PrismaRol;
}
