/// <reference path="qunit.d.ts" />
var persons;
var personsBase = [
    { firstname: 'Peter', lastname: 'Jensen', type: 'Person', age: 30 },
    { firstname: 'Anne', lastname: 'Jensen', type: 'Person', age: 50 },
    { firstname: 'Kurt', lastname: 'Hansen', type: 'Person', age: 40 }
];

QUnit.module('Linq equivalent operations in Javascript');
QUnit.testStart(function () {
    return persons = personsBase.slice(0);
});

test('All', function () {
    var result = persons.filter(function (person) {
        return person.type == 'Person';
    }).length == persons.length;

    ok(result);
});

test('Concat', function () {
    var result = persons.concat(persons);

    equal(result.length, 6);
});

test('Count', function () {
    var result = persons.length;

    equal(result, 3);
});

test('Distinct', function () {
    var lastnames = personsBase.map(function (person) {
        return person.lastname;
    });
    var result = lastnames.filter(function (value, index) {
        return lastnames.indexOf(value) == index;
    });

    equal(result.length, 2);
});

test('Empty', function () {
    var result = [];

    equal(result.length, 0);
});

test('First', function () {
    var result = persons[0];
    if (!result)
        throw new Error('Expected at least one element to take first');

    equal(result.firstname, 'Peter');
});

test('FirstOrDefault', function () {
    var result = persons[0];

    equal(result.firstname, 'Peter');
});

test('ForEach', function () {
    persons.forEach(function (person) {
        return person.type = '';
    });

    equal(persons[0].type, '');
});

test('GroupBy', function () {
    var result = persons.reduce(function (previous, person) {
        (previous[person.lastname] = previous[person.lastname] || []).push(person);
        return previous;
    }, []);

    equal(result['Jensen'].length, 2);
});

test('IndexOf', function () {
    var result = persons.indexOf(persons[2]);

    equal(result, 2);
});

test('Last', function () {
    var result = persons[persons.length - 1];

    if (!result)
        throw new Error('Expected at least one element to take last');

    equal(result.firstname, 'Kurt');
});

test('LastOrDefault', function () {
    var result = persons[persons.length - 1];

    equal(result.firstname, 'Kurt');
});

test('OrderBy', function () {
    persons.sort(function (person1, person2) {
        return person1.firstname.localeCompare(person2.firstname);
    });

    equal(persons[0].firstname, 'Anne');
});

test('OrderByDescending', function () {
    persons.sort(function (person1, person2) {
        return person2.firstname.localeCompare(person1.firstname);
    });

    equal(persons[0].firstname, 'Peter');
});

test('Reverse', function () {
    var result = persons.reverse();

    equal(result[0].firstname, 'Kurt');
});

test('Select', function () {
    var result = persons.map(function (person) {
        return ({ fullname: person.firstname + ' ' + person.lastname });
    });

    equal(result[0].fullname, 'Peter Jensen');
});

test('Single', function () {
    var onePerson = persons.filter(function (person) {
        return person.firstname == "Peter";
    });
    if (onePerson.length != 1)
        throw new Error('Expected at excactly one element to take single');

    var result = onePerson[0];

    equal(result.firstname, 'Peter');
});

test('Skip', function () {
    var result = persons.slice(2, persons.length);

    equal(result[0].firstname, 'Kurt');
    equal(result.length, 1);
});

test('Take', function () {
    var result = persons.slice(0, 2);

    equal(result[0].firstname, 'Peter');
    equal(result.length, 2);
});

test('Where', function () {
    var result = persons.filter(function (person) {
        return person.lastname == 'Jensen';
    });

    equal(result.length, 2);
});
