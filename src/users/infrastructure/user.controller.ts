import { Controller, Get, Param, Put, Delete, Body, Req } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { Usuario } from '../domain/user.model';
import { Rol } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Usuario>, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const currentRole: Rol = req.user?.rol || Rol.user;
    return this.userService.updateUser(Number(id), data, currentRole);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const currentRole: Rol = req.user?.rol || Rol.user;
    return this.userService.deleteUser(Number(id), currentRole);
  }
}
