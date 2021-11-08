using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prueba.Entidad.Especificas;
using Prueba.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prueba.webapi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GenerarCodigoController : ControllerBase
    {
        private readonly ICupon _servicioCodigo;

        public GenerarCodigoController(ICupon servicioCodigo)
        {
            _servicioCodigo = servicioCodigo;
        }
        /// <summary>
        /// Función usada para consultar el estado de los documentos de venta de sunat
        /// </summary>
        /// <param name="request"></param>
        /// <returns>
        /// Se envia un documento tipo json en el formulario con el tipo de data consultaconstanciarequest
        /// </returns>
        [HttpPost]
        [ProducesResponseType(typeof(RespuestaCodigo), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(string), StatusCodes.Status409Conflict)]
        public async Task<object> Post([FromBody] Entidad_DataCupon data)
        {
            var response = new RespuestaCodigo();

            if (data is null)
            {
                response.Mensaje = "No se ha enviado ninguna información";
                response.Exito = false;
            }


            try
            {
                response = await _servicioCodigo.GenerarCodigo(data);
             }
            catch (Exception ex)
            {
                string mensaje;
                if (ex.InnerException is null)
                    mensaje = ex.Message;
                else mensaje = $"{ex.Message}\n{(ex.InnerException)}";

                response.Mensaje = mensaje;
                response.Exito = false;
            }

            return Ok(response);
        }


    }
}

