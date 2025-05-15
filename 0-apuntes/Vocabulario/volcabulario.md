# 📚 Vocabulario esencial – Node.js, Express 5, Sequelize, ESLint y MySQL

## 🟦 Node.js y entorno

- **`require`**: Función que permite importar módulos en Node.js.
- **`exports / module.exports`**: Permite exportar funciones, clases u objetos para usarlos en otros archivos.
- **`__dirname`**: Devuelve la ruta del directorio actual del archivo.
- **`fs`**: Módulo para leer, escribir y manipular archivos.
- **`path / path.join`**: Para construir rutas de archivos compatible con todos los sistemas.
- **`basename`**: Devuelve el nombre del archivo desde una ruta.
- **`dotenv`**: Carga variables de entorno desde un archivo `.env`.
- **`process.env`**: Contiene las variables de entorno de la aplicación.

## ⚙️ Express (versión 5)

- **Express**: Framework web para crear servidores y APIs con Node.js.
- **Middleware**: Función que intercepta la solicitud antes de llegar al controlador.
- **Router**: Sistema para organizar las rutas por módulos.
- **`req` (request)**: Representa la solicitud HTTP entrante.
- **`res` (response)**: Representa la respuesta HTTP que se enviará al cliente.
- **`next`**: Pasa el control al siguiente middleware.
- **Controlador**: Encargado de la lógica de negocio.
- **Gestor de errores**: Middleware con 4 parámetros que captura errores (`(err, req, res, next)`).

## 🗃️ Sequelize (ORM)

- **Sequelize**: ORM que permite trabajar con bases de datos SQL desde JavaScript.
- **DataTypes**: Define tipos de datos como `STRING`, `INTEGER`, `BOOLEAN`, etc.
- **Modelo**: Representación de una tabla de la base de datos.
- **Instancia**: Representación de una fila individual en la tabla.
- **associate**: Método para definir relaciones entre modelos.
- **Hooks**: Funciones que se ejecutan antes o después de acciones como crear, actualizar, etc.
- **Migraciones**: Scripts para crear/modificar tablas de forma controlada.
- **Seeds**: Scripts que insertan datos iniciales o de prueba.

## 🛢️ Tipos de datos en MySQL

- **`INT`**: Entero. Ideal para IDs o contadores.
- **`UNSIGNED`**: Entero solo positivo. Aumenta el rango máximo.
- **`DECIMAL`**: Decimales precisos. Ideal para valores monetarios.
- **`FLOAT`**: Decimales menos precisos. Útil para cálculos científicos.
- **`BOOLEAN`**: Verdadero (`1`) o falso (`0`).
- **`DATETIME`**: Fecha y hora completa.
- **`VARCHAR`**: Texto de longitud variable, con un límite definido.
- **`TEXT`**: Grandes cantidades de texto, sin límite fijo.
- **`ZEROFILL`**: Rellena con ceros a la izquierda (solo presentación).

## 🔍 Funciones en MySQL

- **`WHERE`**: Filtra registros que cumplen una condición específica.
  - **Operadores comunes**:
    - `=`: Igual a.
    - `!=` o `<>`: Diferente de.
    - `<`, `<=`, `>`, `>=`: Comparaciones.
    - `BETWEEN`: Dentro de un rango.
    - `LIKE`: Coincidencia de patrones (`%` para múltiples caracteres, `_` para uno solo).
    - `IN`: Coincide con cualquier valor en una lista.
    - `IS NULL` / `IS NOT NULL`: Verifica valores nulos.
  - **Ejemplo**:
    ```sql
    SELECT * FROM usuarios WHERE edad > 18 AND ciudad = 'Madrid';
    ```
  - **Combinadores**:
    - `AND`: Todas las condiciones deben cumplirse.
    - `OR`: Al menos una condición debe cumplirse.
    - `NOT`: Niega una condición.
- **Orden de evaluación**: Se pueden usar paréntesis para agrupar condiciones y controlar la prioridad.

- **OFFSET**: Saltate 'X'.
- **LIMIT**: Limita.

## 🔐 Claves y relaciones

- **Clave primaria (Primary Key)**: Identifica de forma única cada registro.
- **Clave foránea (Foreign Key)**: Enlaza registros entre tablas.
- **Relaciones**:
  - `hasOne`: Un registro tiene uno relacionado.
  - `belongsTo`: Relación inversa de `hasOne`.
  - `hasMany`: Un registro tiene muchos relacionados.
  - `belongsToMany`: Muchos a muchos.

## 🧰 Herramientas y utilidades

- **ESLint**: Analiza el código en busca de errores y buenas prácticas.
- **Prettier**: Formatea el código automáticamente.
- **Nodemon**: Reinicia el servidor al detectar cambios.
- **Postman / Insomnia**: Prueban y documentan APIs.
- **Swagger / OpenAPI**: Documentación interactiva para APIs.

## 🌐 API REST y HTTP

- **API REST**: Estilo de arquitectura que usa HTTP para interactuar con recursos.
- **JSON**: Formato de intercambio de datos.
- **CORS**: Controla qué dominios pueden acceder a la API.
- **Códigos HTTP comunes**: (son objetos)
  - `200`: OK.
  - `201`: Recurso creado.
  - `400`: Petición incorrecta.
  - `401`: No autorizado.
  - `404`: No encontrado.
  - `422`: Error semántico.
  - `500`: Error interno del servidor.

## 🧪 Testing y validación

- **Jest / Mocha**: Frameworks para pruebas automáticas.
- **Supertest**: Prueba endpoints HTTP en test automáticos.
- **Joi / Yup / express-validator**: Validación de datos en peticiones.

