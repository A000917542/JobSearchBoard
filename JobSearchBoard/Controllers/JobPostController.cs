using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSearchBoard.Controllers
{
    [AllowAnonymous]
    public class JobPostController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
