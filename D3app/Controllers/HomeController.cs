using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace D3app.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Detail(string latlong, string delType)
        {
            ViewBag.LatLong = latlong;
            ViewBag.DelType = delType;
            return View();
        }
    }
}