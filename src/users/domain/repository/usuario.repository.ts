import { Usuario } from '../user.model';

export const USUARIO_REPOSITORY = 'USUARIO_REPOSITORY';

export interface UsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  create(data: Omit<Usuario, 'id'>): Promise<Usuario>;
}
