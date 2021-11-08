using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Prueba.Datos;
using Prueba.web.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Prueba.web.Controllers
{

    public class HomeController : Controller
    {
       
        public IActionResult Index()
        {
            return View();
        }
       
        public IActionResult Cupon()
        {
            return View();
        }
        public IActionResult CanjearCupon()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
