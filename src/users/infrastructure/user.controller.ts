import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { Usuario } from '../domain/user.model';
import { Rol } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: Omit<Usuario, 'id'>) {
    // Solo admin puede crear usuarios
    if (data.rol !== Rol.admin)
      throw new Error('Solo el admin puede crear usuarios');
    return this.userService.createUser(data);
  }

  @Get()
  async findAll() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Usuario>,
    @Req() req,
  ) {
    // Simulación de rol, en producción obtén el rol del usuario autenticado
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const currentRole: Rol = req.user?.rol || Rol.user;
    return this.userService.updateUser(Number(id), data, currentRole);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const currentRole: Rol = req.user?.rol || Rol.user;
    return this.userService.deleteUser(Number(id), currentRole);
  }
}
