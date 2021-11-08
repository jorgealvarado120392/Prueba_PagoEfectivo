using Microsoft.AspNetCore.Mvc;
using Prueba.Datos;
using Prueba.Entidad.Especificas;
using Prueba.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Prueba.web.Controllers
{

    [Route("Cupon")]
    public class CuponController : Controller
    {
        private readonly DatosWeb _datosweb;       
        public CuponController()
        {

            _datosweb = new DatosWeb();
        }
        [Route("GuardarCupon")]
        [HttpPost]
        public IActionResult GuardarCupon()
        {
            string Nombre = Request.Form["TxtNombre"].ToString().Trim();

            string Email = Request.Form["TxtEmail"].ToString().Trim();

            Entidad_DataCupon data = new Entidad_DataCupon
            {
                Nombre = Nombre,
                Email = Email
            };
            var respuesta = RestHelper<Entidad_DataCupon, RespuestaCodigo>.Execute("GenerarCodigo", data);

            return Json(respuesta);
        }
        [Route("ValidarCupon")]
        [HttpPost]
        public IActionResult ValidarCupon()
        {
            string CodCupon = Request.Form["TxtCodcupon"].ToString().Trim();
                        
            var respuesta = RestHelper<string, RespuestaCodigo>.Execute("ValidarCodigo", CodCupon);

            return Json(respuesta);
        }
        [Route("ListarCupon")]
        public IActionResult ListarCupon()
        {
            var item = _datosweb.ListaCupon();

            JsonResult jsonres = Json(item);

            return jsonres;
        }
    }
}
