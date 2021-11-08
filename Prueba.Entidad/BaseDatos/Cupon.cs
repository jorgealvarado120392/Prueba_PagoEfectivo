using System;
using System.Collections.Generic;
using System.Text;

namespace Prueba.Entidad.BaseDatos
{
    public class Cupon
    {
       public int Id { get; set; }
        public int IdCliente { get; set; }
        public string CodCuponGenerado { get; set; }
        public DateTime FechaCreado { get; set; }
        public DateTime? FechaCanjeado { get; set; }
        public virtual Cliente Clientes { get; set; }
    }
}
