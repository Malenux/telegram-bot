### Antes de empezar un proyecto:
 Crear la base de datos: crearla para tener en cuenta la estructura de la base de datos y los modelos que se van a utilizar

### Tipo de base de datos:
  ### SQL: 
    Para datos estructurados y relaciones entre tablas.
    Ventajas:
      Integridad de los datos: datos consistentes y sin duplicados.
      Escalabilidad: se pueden añadir más tablas y relaciones sin problemas.
      Seguridad: se pueden establecer permisos y roles para los usuarios.
    Desventajas:
      Rigidez: la estructura de la base de datos es fija y no se puede cambiar fácilmente.
      Complejidad: la estructura de la base de datos puede ser compleja y difícil de entender.
      Rendimiento: puede ser más lento que otras bases de datos para consultas complejas.

  ### MongoBD:
    Para datos no estructurados y flexibilidad en la estructura de los datos
    Ventajas:
      Flexibilidad: se pueden añadir y eliminar campos fácilmente.
      Escalabilidad: se pueden añadir más documentos sin problemas.
      Rendimiento: puede ser más rápido que otras bases de datos para consultas complejas.
    Desventajas:
      Integridad de los datos: puede haber datos duplicados o inconsistentes.
      Complejidad: la estructura de la base de datos puede ser difícil de entender.
      Seguridad: se pueden establecer permisos y roles para los usuarios, pero no es tan robusto como en SQL.

  ### ORM (Objecto Relational Mapping):
    Es una técnica de programación que permite ineteractuar con las bases de datos utilizando objetos.
    Pero no es necesario utilizar un ORM para interactuar con una base de datos, se puede hacer directamente utilizando la API de la base de datos.
    Mas que nada es para fcilitar la interacción con la base de datos y para que sea más fácil de entender el código.
    Ejemplos de ORM: 
      Sequelize: para SQL
      Mongoose: para MongoDB

Después crear el modelo de la base de datos y las rutas que se van a utilizar para la API.

