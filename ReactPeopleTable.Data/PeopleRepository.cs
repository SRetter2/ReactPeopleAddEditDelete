using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleTable.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;
        public PeopleRepository(string conn)
        {
            _connectionString = conn;
        }
        public List<Person> GetAllPeople()
        {
            using(var cxt = new PersonContext(_connectionString))
            {
                return cxt.People.ToList();
            }
        }
        public void AddPerson(Person person)
        {
            using(var cxt = new PersonContext(_connectionString))
            {
                cxt.People.Add(person);
                cxt.SaveChanges();
            }
        }
        public void EditPerson(Person person)
        {
            using(var cxt = new PersonContext(_connectionString))
            {
                cxt.People.Attach(person);
                cxt.Entry(person).State = EntityState.Modified;
                cxt.SaveChanges();
            }
        }
        public void DeletePerson(int id)
        {
            using(var cxt = new PersonContext(_connectionString))
            {
                cxt.Database.ExecuteSqlCommand(
                    "DELETE FROM People WHERE Id = @id",
                    new SqlParameter("@id", id));
            }
        }
    }
}
