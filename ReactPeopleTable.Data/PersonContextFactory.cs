using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactPeopleTable.Data
{
    public class PersonContextFactory : IDesignTimeDbContextFactory<PersonContext>
    {
        public PersonContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactPeopleTable"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new PersonContext(config.GetConnectionString("ConStr"));
        }
    }
}
