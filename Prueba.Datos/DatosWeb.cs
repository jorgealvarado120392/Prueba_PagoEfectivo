using Prueba.Entidad.BaseDatos;
using Prueba.Entidad.Especificas;
using Prueba.Servicios;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Prueba.Utilidades;

namespace Prueba.Datos
{
    public class DatosWeb : ITraerCupon
    {
        public List<Entidad_ListaCupon> ListaCupon()
        {
            List<Entidad_ListaCupon> lista = new List<Entidad_ListaCupon>();

            using (var db = new BDContext())
            {
                lista = (from cp in db.Cupons
                         join cl in db.Clientes on cp.IdCliente equals cl.Id
                         select new Entidad_ListaCupon
                         {
                             Nombre = cl.NombreCompleto,
                             Email = cl.Email,
                             Codigo = StringCipher.Decrypt(cp.CodCuponGenerado),
                             Estado = cp.FechaCanjeado == null ? "Generado" : "Canjeado"
                         }).ToList();
            }

            return lista;
        }
    }
}
