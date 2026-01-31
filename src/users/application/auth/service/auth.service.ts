/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import * as usuarioRepository from '../../../domain/repository/usuario.repository';
import { UnauthorizedError } from '../../../../errors/user.errors';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(usuarioRepository.USUARIO_REPOSITORY)
    private readonly usuarioRepo: usuarioRepository.UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.usuarioRepo.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      correo: dto.correo,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: hashedPassword,
      rol: 'user', // 👈 siempre user
    });
  }

  async login(dto: { correo: string; password: string }) {
    const user = await this.usuarioRepo.findByEmail(dto.correo);
    if (!user) throw new UnauthorizedError();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedError();

    const payload = { sub: user.id, rol: user.rol };

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
