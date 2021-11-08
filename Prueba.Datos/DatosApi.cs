using Prueba.Entidad.BaseDatos;
using Prueba.Entidad.Especificas;
using Prueba.Servicios;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Prueba.Utilidades;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Prueba.Datos
{
    public class DatosApi : ICupon
    {
        private static Random random = new Random();

        private bool ValidarEmail(string Email)
        {
            bool validar = false;

            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");

            Match match = regex.Match(Email);

            if (match.Success)
            {
                using (var db = new BDContext())
                {
                    validar = db.Clientes.Any(x => x.Email == Email);
                }
            }
            else
            {
                validar = true;
            }
            return validar;
        }
        private int CrearCliente(string Nombre, string Email)
        {
            Cliente cliente = new Cliente
            {
                NombreCompleto = Nombre,
                Email = Email
            };
            using (var db = new BDContext())
            {
                db.Clientes.Add(cliente);
                db.SaveChanges();
            }
            return cliente.Id;
        }
        private string GenerarCodigoAleatorio()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 5)
              .Select(s => s[random.Next(s.Length)]).ToArray());

        }
        private bool HabilitadoCodigoCupon(string Codigo)
        {
            bool valor = false;

            List<Cupon> ListaCuponSinCanjear = new List<Cupon>();

            using (var db = new BDContext())
            {
                ListaCuponSinCanjear = db.Cupons.Where(x => x.FechaCanjeado == null).ToList();
            }

            foreach (var cupon in ListaCuponSinCanjear)
            {
                if (StringCipher.Decrypt(cupon.CodCuponGenerado) == Codigo)
                {
                    valor = true;

                    break;
                }
            }

            return valor;
        }
        private void GuardarCupon(int Id_Cliente, string CodCupon)
        {
            DateTime horaactual_servidor = DateTime.Now;

            TimeZoneInfo culturaperu = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

            DateTime fecha_horaperu = TimeZoneInfo.ConvertTime(horaactual_servidor, TimeZoneInfo.Local, culturaperu);

            Cupon cupon = new Cupon
            {
                IdCliente = Id_Cliente,
                CodCuponGenerado = StringCipher.Encrypt(CodCupon),
                FechaCreado = fecha_horaperu,
                FechaCanjeado = null
            };

            using (var db = new BDContext())
            {
                db.Cupons.Add(cupon);
                db.SaveChanges();
            }
        }
        private void GuardarEstadoCupon(string CodCupon)
        {
            DateTime horaactual_servidor = DateTime.Now;

            TimeZoneInfo culturaperu = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

            DateTime fecha_horaperu = TimeZoneInfo.ConvertTime(horaactual_servidor, TimeZoneInfo.Local, culturaperu);

            Cupon cupon = new Cupon();

            using (var db = new BDContext())
            {
                var ListaCuponSinCanjear = db.Cupons.Where(x => x.FechaCanjeado == null).ToList();


                foreach (var vercupon in ListaCuponSinCanjear)
                {
                    if (StringCipher.Decrypt(vercupon.CodCuponGenerado) == CodCupon)
                    {
                        cupon = vercupon;

                        break;
                    }
                }

                cupon.FechaCanjeado = fecha_horaperu;

                db.Cupons.Update(cupon);

                db.SaveChanges();
            }
        }
        public async Task<RespuestaCodigo> GenerarCodigo(Entidad_DataCupon data)
        {
            var task = Task.Factory.StartNew(() =>
            {
                RespuestaCodigo respuestaCodigo = new RespuestaCodigo();

                if (ValidarEmail(data.Email))
                {
                    respuestaCodigo.Exito = false;

                    respuestaCodigo.Mensaje = "El Email ya ha sido ingresado con anterioridad o el formato es incorrecto";
                }
                else
                {
                    int idcliente = CrearCliente(data.Nombre, data.Email);

                    string Codigo = GenerarCodigoAleatorio();

                    while (HabilitadoCodigoCupon(Codigo))
                    {
                        GenerarCodigoAleatorio();

                    }

                    GuardarCupon(idcliente, Codigo);

                    respuestaCodigo.Exito = true;

                    respuestaCodigo.Mensaje = "Su código de descuento es :" + Codigo;

                }

                return respuestaCodigo;
            });

            return await task;
        }
        public async Task<RespuestaCodigo> ValidarCodigo(string Codigo)
        {
            var task = Task.Factory.StartNew(() =>
            {
                RespuestaCodigo respuestaCodigo = new RespuestaCodigo();

                if (Codigo.Length != 5)
                {
                    respuestaCodigo.Exito = false;

                    respuestaCodigo.Mensaje = "El Cupón debe tener 5 caracteres";
                }
                else
                {
                    if (HabilitadoCodigoCupon(Codigo))
                    {
                        GuardarEstadoCupon(Codigo);

                        respuestaCodigo.Exito = true;

                        respuestaCodigo.Mensaje = "El Cupón ha sido canjeado correctamente";

                    }
                    else
                    {
                        respuestaCodigo.Exito = false;

                        respuestaCodigo.Mensaje = "El Cupón ya ha sido ingresado con anterioridad o no existe";
                    }
                }
                return respuestaCodigo;
            });

            return await task;
        }
    }
}
