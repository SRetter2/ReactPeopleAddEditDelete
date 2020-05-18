using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleTable.Data
{
    public class PersonContext : DbContext
    {
        private readonly string _connectionString;

        public PersonContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Person> People { get; set; }
    }
}
