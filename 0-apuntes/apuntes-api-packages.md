### ¿Qué es? 
Este archivo es el package.json de la API que se encarga de atender las llamadas a un bot de telegram (este es nuestro backend del proyecto).###

### Aqui se definen las dependencias y devDependencias que se van a utilizar en el proyecto, como las siguientes librerías que son las más importantes:
 - express: frontend del proyecto, es el framework que se utiliza para crear la API y atender las llamadas a la misma.
 - mysql2: librería que se utiliza para conectarse a la base de datos mysql, es la que se encarga de hacer las consultas a la base de datos y devolver los resultados.
 - sequelize: ORM que se utiliza para interactuar con la base de datos, es el que se encarga de crear las tablas y hacer las consultas a la base de datos.
 - eslint: librería que se utiliza para validar el código y asegurarse de que cumple con las normas de estilo definidas en el proyecto. Se utiliza para evitar errores de sintaxis y mejorar la calidad del código.
 - neostandard: librería que se utiliza para validar el código y asegurarse de que cumple con las normas de estilo definidas en el proyecto. Se utiliza para evitar errores de sintaxis y mejorar la calidad del código. Es una alternativa a eslint, pero no es tan popular como eslint. Se utiliza para validar el código y asegurarse de que cumple con las normas de estilo definidas en el proyecto. Se utiliza para evitar errores de sintaxis y mejorar la calidad del código.

### Significado de algunas palabras en el package.json (solo palabras nuevas):
  - devDependencies: Son dependencias que solo se utilizan en el desarrollo del proyecto, no son necesarias para el funcionamiento del proyecto en producción. Por ejemplo, eslint y neostandard solo se utilizan para validar el código y asegurarse de que cumple con las normas de estilo definidas en el proyecto.
  - dependencies: Son dependencias que son necesarias para el funcionamiento del proyecto en producción. Por ejemplo, express, mysql2 y sequelize son necesarias para el funcionamiento del proyecto en producción. Se utilizan para crear la API y conectarse a la base de datos. Sin estas dependencias, el proyecto no funcionaría correctamente en producción.