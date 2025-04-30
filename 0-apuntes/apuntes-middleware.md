
### ¿Q/C/PQ?
Los middleware es una función que se ejecuta antes o después de la petición al servidor y que se utiliza para procesar la petición o la respuesta


### Los pasos para poder crear un middleware son:

  1.Crear la función que se va a expotar utilizando el module.exports
  2.Exportar la función para que se pueda importar en otro archivo
  3.Importar la función el el archivo que se va a utilizar poniendo el nombre de la función


### Funciones de express que se utilizan para cerar un middleware:

  app.use() registrar un middleware en la aplicación
  app.get() registra una ruta especifica
  app.post() registra una ruta especifica para recibir dato
  app.put() registra una ruta especifica para actualizar datos
  app.delete() registra una ruta especifica para eliminar datos
  app.all() registra una ruta especifica para recibir cualquier tipo de petición
  app.listen() inicia el servidor y lo pone a la escucha de peticiones en un puerto especifico

  res es la respuesta que se le envía al cliente
  req es la petición que se ha hecho al servidor
  next es la función para pasar al controlador siguiente


### Cosas importantes a tener en cuenta:
  Los archivos que se van a importar tienen que estar en .json o .js
  Hacer los controladores lo más genéricos posible para que se puedan reutilizar en otros controladores y no tener que repetir el código