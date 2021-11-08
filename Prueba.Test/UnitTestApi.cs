using Microsoft.VisualStudio.TestTools.UnitTesting;
using Prueba.Datos;
using Prueba.Entidad.Especificas;

namespace Prueba.Test
{
    [TestClass]
    public class UnitTestApi
    {
        [TestMethod]
        public void ValidarEmailExistente()
        {
            Entidad_DataCupon data = new Entidad_DataCupon { Nombre = "Jorge Alvarado", Email = "coco0340@hotmail.com" };

            DatosApi dato = new DatosApi();

            var resultado = dato.GenerarCodigo(data);

            Assert.IsFalse(resultado.Result.Exito);

            Assert.AreEqual(resultado.Result.Mensaje, "El Email ya ha sido ingresado con anterioridad o el formato es incorrecto");

        }
        [TestMethod]
        public void ValidarCuponDiferenteCaracteres()
        {
            string Cupon = "123456";

            DatosApi dato = new DatosApi();

            var resultado = dato.ValidarCodigo(Cupon);

            Assert.IsFalse(resultado.Result.Exito);

            Assert.AreEqual(resultado.Result.Mensaje, "El Cupón debe tener 5 caracteres");

        }
        [TestMethod]
        public void ValidarCuponExistente()
        {
            string Cupon= "000DX";

            DatosApi dato = new DatosApi();

            var resultado = dato.ValidarCodigo(Cupon);

            Assert.IsFalse(resultado.Result.Exito);

            Assert.AreEqual(resultado.Result.Mensaje, "El Cupón ya ha sido ingresado con anterioridad o no existe");

        }       
        [TestMethod]
        public void ValidarCuponInexistente()
        {
            string Cupon = "12345";

            DatosApi dato = new DatosApi();

            var resultado = dato.ValidarCodigo(Cupon);

            Assert.IsFalse(resultado.Result.Exito);

            Assert.AreEqual(resultado.Result.Mensaje, "El Cupón ya ha sido ingresado con anterioridad o no existe");

        }


    }
}
