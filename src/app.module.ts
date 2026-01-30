import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/infrastructure/user.controller';
import { UserService } from './users/application/user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
