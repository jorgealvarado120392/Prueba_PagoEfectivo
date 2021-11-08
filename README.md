# Proyecto Pago Efectivo
Esta es la presentación del proyecto de Pago Efectivo, a continuación describire el desarrollo de cada parte y como ha sido desarrollado.

## Tecnologías Usadas
Ide: Visual Studio 2019
Base Datos: RDS Microsft SQL
Documentación Servicio Web: Swagger UI
Back End: C # NET 5.0
Front End: Html, Less, Jquery, Sweet Alerta
ORM: Entity Framework Core, Code First
Arquitectura: MVC
Pruebas Unitarias: MS Test Unit

## Base Datos:
La base de datos esta alojada en el servicio RDS Microsft SQL y usada a través del ORM, Entity Framework Core con el enfoque Code First, con tablas Cliente y Cupón. La tabla Cliente tiene los campos: ID: Int autogenerado
Nombre Completo: nvarchar (100),
Email: Nvarchar (100)
La tabla Cupón tiene los campos: ID: Int Autogenerado.
IDCliente: Int Foreign Key con relación uno a uno con la tabla cliente.
Cod_CuponGenerado: varchar (max) Se guarda un string encriptado desde el lado del servidor.
Fecha Creado: Datetime, Fecha guardado automáticamente con la hora local en Perú Fecha_Canjeado: Se guarda automáticamente a la hora local cuando el cupón ha sido canjeado, además que sirve para verificar estados del cupón, en el caso que este campo sea nulo, signifca que el cupón ha sido "Generado" y posteriormente cuando es guardado este campo pasa a "Canjeado".

## Api Rest Generar Código y Canjear Código
Estas Apis han sido desarrolladas de manera asincrona documentadas a través de Swagger, para hacer pruebas locales de codigo o de inserción, ambos son desarrollados con C# NET 5.0 

## Funcionalidad Api Generar Código:
Para utilizar la api se deberá usar la ruta: " http://localhost:81/api/GenerarCodigo " y enviar los datos en modo json con los campos de Nombre, email del usuario. En el caso de que el correo electrónico no tenga el formato correcto o ya ha sido usado devolverá un mensaje de error: "El correo electrónico ya ha sido ingresado con anterioridad o el formato es incorrecto". En el caso de que este email sea nuevo devolvera un mensaje: "Su código de descuento es:" + "Codigo", este codigo es autogenerado con 5 caractéres único, y se guardará en la base de datos encriptado.

## Funcionalidad Api Validar Código:
Para utilizar la api se deberá usar la ruta: " http://localhost:81/api/ValidarCodigo " y se enviará los datos en una cadena de 5 caracteres.

En el caso que se envie vacío, se enviará un error con el mensaje: No se ha enviado ningún cupón. En el caso que se envie más o menos de 5 caracteres, se enviará un error con el mensaje: El Cupón debe tener 5 caracteres

En esos casos se validará la existencia del código, si el codigo ya ha sido utilizado o no existe se enviará un error con el mensaje: El Cupón ya ha sido ingresado con anterioridad o no existe

En el caso que el código sea correcto se enviará un mensaje: El Cupón ha sido canjeado correctamente

## Funcionalidad Interfaz del Usuario:
Para probar la interfaz de usuario, se deberá descargar el proyecto y compilar en Visual Studio 2019. En la interfaz del usuario cuando se inicie una pantalla con dos menú: Mantenimiento de Cupón y Validar Cupón

## Mantenimiento de Cupón
En el mantenimiento Cupón se listará tanto los cupones Generados y Canjeados, pero habrá tabs en la parte superior que podrá elegir Todos, Generados, Canjeado. En la parte superior habrá un Botón con el icono + y es ahi donde saldrá un modal con los dos campos a ingresar tanto como nombre y correo electrónico.

## Validar Cupón
En el caso de validar cupón hay una pantalla con un cuadro de texto y se deberá poner el codigo de cupón a validar.

## Pruebas Unitarias.
Las Pruebas Unitarias se han realizado a las Funciones de las apis, ya que generan código y código validar. Las pruebas han sido las siguientes: ValidarEmailExistente, ValidarCuponDiferenteCaracteres, ValidarCuponExistente, ValidarCuponInexistente