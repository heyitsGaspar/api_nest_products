# Endpoints de Usuarios

Base: `/users`

| Método | Ruta       | Descripción                | Body/Params                       |
| ------ | ---------- | -------------------------- | --------------------------------- |
| POST   | /users     | Crear usuario (solo admin) | { nombre, apellido, correo, rol } |
| GET    | /users     | Listar todos los usuarios  | -                                 |
| GET    | /users/:id | Obtener usuario por ID     | :id                               |
| PUT    | /users/:id | Actualizar usuario (admin) | :id, { campos a actualizar }      |
| DELETE | /users/:id | Eliminar usuario (admin)   | :id                               |

## Ejemplo de body para crear usuario

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@ejemplo.com",
  "rol": "admin"
}
```

## Notas

- Solo el admin puede crear, actualizar o eliminar usuarios.
- El campo `rol` debe ser `admin` o `user`.
- No se permite crear usuarios con correos duplicados.
