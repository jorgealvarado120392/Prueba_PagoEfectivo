# Proyecto Pago Efectivo
Esta es la presentaci�n del proyecto de Pago Efectivo, a continuaci�n describire el desarrollo de cada parte y como ha sido desarrollado.

## Tecnolog�as Usadas
Ide: Visual Studio 2019
Base Datos: RDS Microsft SQL
Documentaci�n Servicio Web: Swagger UI
Back End: C # NET 5.0
Front End: Html, Less, Jquery, Sweet Alerta
ORM: Entity Framework Core, Code First
Arquitectura: MVC
Pruebas Unitarias: MS Test Unit

## Base Datos:
La base de datos esta alojada en el servicio RDS Microsft SQL y usada a trav�s del ORM, Entity Framework Core con el enfoque Code First, con tablas Cliente y Cup�n. La tabla Cliente tiene los campos: ID: Int autogenerado
Nombre Completo: nvarchar (100),
Email: Nvarchar (100)
La tabla Cup�n tiene los campos: ID: Int Autogenerado.
IDCliente: Int Foreign Key con relaci�n uno a uno con la tabla cliente.
Cod_CuponGenerado: varchar (max) Se guarda un string encriptado desde el lado del servidor.
Fecha Creado: Datetime, Fecha guardado autom�ticamente con la hora local en Per� Fecha_Canjeado: Se guarda autom�ticamente a la hora local cuando el cup�n ha sido canjeado, adem�s que sirve para verificar estados del cup�n, en el caso que este campo sea nulo, signifca que el cup�n ha sido "Generado" y posteriormente cuando es guardado este campo pasa a "Canjeado".

## Api Rest Generar C�digo y Canjear C�digo
Estas Apis han sido desarrolladas de manera asincrona documentadas a trav�s de Swagger, para hacer pruebas locales de codigo o de inserci�n, ambos son desarrollados con C# NET 5.0 

## Funcionalidad Api Generar C�digo:
Para utilizar la api se deber� usar la ruta: " http://localhost:81/api/GenerarCodigo " y enviar los datos en modo json con los campos de Nombre, email del usuario. En el caso de que el correo electr�nico no tenga el formato correcto o ya ha sido usado devolver� un mensaje de error: "El correo electr�nico ya ha sido ingresado con anterioridad o el formato es incorrecto". En el caso de que este email sea nuevo devolvera un mensaje: "Su c�digo de descuento es:" + "Codigo", este codigo es autogenerado con 5 caract�res �nico, y se guardar� en la base de datos encriptado.

## Funcionalidad Api Validar C�digo:
Para utilizar la api se deber� usar la ruta: " http://localhost:81/api/ValidarCodigo " y se enviar� los datos en una cadena de 5 caracteres.

En el caso que se envie vac�o, se enviar� un error con el mensaje: No se ha enviado ning�n cup�n. En el caso que se envie m�s o menos de 5 caracteres, se enviar� un error con el mensaje: El Cup�n debe tener 5 caracteres

En esos casos se validar� la existencia del c�digo, si el codigo ya ha sido utilizado o no existe se enviar� un error con el mensaje: El Cup�n ya ha sido ingresado con anterioridad o no existe

En el caso que el c�digo sea correcto se enviar� un mensaje: El Cup�n ha sido canjeado correctamente

## Funcionalidad Interfaz del Usuario:
Para probar la interfaz de usuario, se deber� descargar el proyecto y compilar en Visual Studio 2019. En la interfaz del usuario cuando se inicie una pantalla con dos men�: Mantenimiento de Cup�n y Validar Cup�n

## Mantenimiento de Cup�n
En el mantenimiento Cup�n se listar� tanto los cupones Generados y Canjeados, pero habr� tabs en la parte superior que podr� elegir Todos, Generados, Canjeado. En la parte superior habr� un Bot�n con el icono + y es ahi donde saldr� un modal con los dos campos a ingresar tanto como nombre y correo electr�nico.

## Validar Cup�n
En el caso de validar cup�n hay una pantalla con un cuadro de texto y se deber� poner el codigo de cup�n a validar.

## Pruebas Unitarias.
Las Pruebas Unitarias se han realizado a las Funciones de las apis, ya que generan c�digo y c�digo validar. Las pruebas han sido las siguientes: ValidarEmailExistente, ValidarCuponDiferenteCaracteres, ValidarCuponExistente, ValidarCuponInexistente