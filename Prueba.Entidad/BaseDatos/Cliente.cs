using System;
using System.Collections.Generic;
using System.Text;

namespace Prueba.Entidad.BaseDatos
{
    public class Cliente
    {
        
        public int Id { get; set; } 
        public string NombreCompleto { get; set; }
        public string Email { get; set; }
        public virtual Cupon Cupons{ get; set; }
    }
}
