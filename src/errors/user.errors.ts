export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`El correo '${email}' ya está registrado.`);
    this.name = 'DuplicateEmailError';
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('No tienes permisos para realizar esta acción.');
    this.name = 'UnauthorizedError';
  }
}
