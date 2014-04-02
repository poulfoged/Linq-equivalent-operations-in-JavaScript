using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;

namespace Linq_equivalent_operations_in_Javascript
{
    [TestFixture]
    public class LinqTests
    {
        private dynamic[] personsBase =
        {
            new { firstname = "Peter", lastname = "Jensen", type = "Person", age = 30 },
            new { firstname = "Anne", lastname = "Jensen", type = "Person", age = 50  },
            new { firstname = "Kurt", lastname = "Hansen", type = "Person", age = 40  }
        };

        private List<dynamic> persons;

        [SetUp]
        public void Setup()
        {
            persons = personsBase.ToList();
        }

        [Test]
        public void All()
        {
            var result = persons.All(person => person.type == "Person");

            Assert.That(result);
        }

        [Test]
        public void Concat()
        {
            var result = persons.Concat(persons);

            Assert.That(result.Count(), Is.EqualTo(6));
        }

        [Test]
        public void Count()
        {
            var result = persons.Count();

            Assert.That(result, Is.EqualTo(3));
        }

        [Test]
        public void Distinct()
        {
            var lastnames = persons.Select(person => person.lastname);
            var result = lastnames.Distinct();

            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public void Empty()
        {
            var result = Enumerable.Empty<dynamic>();

            Assert.That(result, Is.Empty);
        }

        [Test]
        public void First()
        {
            var result = persons.First();

            Assert.That(result.firstname, Is.EqualTo("Peter"));
        }

        [Test]
        public void FirstOrDefault()
        {
            var result = persons.FirstOrDefault();

            Assert.That(result.firstname, Is.EqualTo("Peter"));
        }

        [Test]
        public void ForEach()
        {
            var fullnames = new List<string>();
            persons.ForEach(person => fullnames.Add(person.firstname + " " + person.lastname));

            Assert.That(fullnames.First(), Is.EqualTo("Peter Jensen"));
        }


        [Test]
        public void GroupBy()
        {
            var result = persons.GroupBy(person => person.lastname);

            Assert.That(result.Single(r => r.Key == "Jensen").Count(), Is.EqualTo(2));
        }

        [Test]
        public void IndexOf()
        {
            var result = persons.IndexOf(persons[2]);

            Assert.That(result, Is.EqualTo(2));
        }

        [Test]
        public void Last()
        {
            var result = persons.Last();

            Assert.That(result.firstname, Is.EqualTo("Kurt"));
        }

        [Test]
        public void LastOrDefault()
        {
            var result = persons.LastOrDefault();

            Assert.That(result.firstname, Is.EqualTo("Kurt"));
        }

        [Test]
        public void OrderBy()
        {
            var result = persons.OrderBy(person => person.firstname);

            Assert.That(result.First().firstname, Is.EqualTo("Anne"));
        }

        [Test]
        public void OrderByDescending()
        {
            var result = persons.OrderByDescending(person => person.firstname);

            Assert.That(result.First().firstname, Is.EqualTo("Peter"));
        }

        [Test]
        public void Reverse()
        {
            persons.Reverse();

            Assert.That(persons.First().firstname, Is.EqualTo("Kurt"));
        }

        [Test]
        public void Select()
        {
            var result = persons.Select(person => new {fullname = person.firstname + " " + person.lastname});

            Assert.That(result.First().fullname, Is.EqualTo("Peter Jensen"));
        }

        [Test]
        public void Single()
        {
            var result = persons.Single(person => person.firstname == "Peter");

            Assert.That(result.firstname, Is.EqualTo("Peter"));
        }

        [Test]
        public void Skip()
        {
            var result = persons.Skip(2);

            Assert.That(result.First().firstname, Is.EqualTo("Kurt"));
        }


        [Test]
        public void Take()
        {
            var result = persons.Take(2);

            Assert.That(result.First().firstname, Is.EqualTo("Peter"));
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public void Where()
        {
            var result = persons.Where(person => person.lastname == "Jensen");

            Assert.That(result.Count(), Is.EqualTo(2));
        }
    }
}
