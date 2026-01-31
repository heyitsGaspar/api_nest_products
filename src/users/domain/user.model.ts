// domain/entities/usuario.entity.ts
import { Rol } from '@prisma/client';

export class Usuario {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly correo: string,
    public readonly password: string,
    public readonly rol: Rol,
  ) {}
}
