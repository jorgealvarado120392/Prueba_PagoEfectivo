using Prueba.Entidad.Especificas;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prueba.Servicios
{
    public interface ICupon
    {
        Task<RespuestaCodigo> GenerarCodigo(Entidad_DataCupon data);
        Task<RespuestaCodigo> ValidarCodigo(string Codigo);
    }
}
