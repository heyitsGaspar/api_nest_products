import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../users/infrastructure/auth/auth.controller';
import { AuthService } from '../users/application/auth/service/auth.service';

import { USUARIO_REPOSITORY } from '../users/domain/repository/usuario.repository';
import { PrismaUsuarioRepository } from '../users/infrastructure/repository/prisma-usuario.repository';

import { JwtStrategy } from '../users/infrastructure/auth/jwt.strategy';
import { JwtRefreshStrategy } from '../users/infrastructure/auth/jwt-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaUsuarioRepository,
    {
      provide: USUARIO_REPOSITORY,
      useClass: PrismaUsuarioRepository,
    },
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
