using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleTable.Data;

namespace ReactPeopleTable.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

        private readonly string _connectionString;
        public PeopleController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAllPeople()
        {
            var repos = new PeopleRepository(_connectionString);
            return repos.GetAllPeople();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person p)
        {
            var repos = new PeopleRepository(_connectionString);
            repos.AddPerson(p);
        }

        [HttpPost]
        [Route("editperson")]
        public void EditPerson(Person p)
        {
            var repos = new PeopleRepository(_connectionString);
            repos.EditPerson(p);
        }

        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(Person p)
        {
            var repos = new PeopleRepository(_connectionString);
            repos.DeletePerson(p.Id);
        }
    }
}