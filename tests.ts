 /// <reference path="qunit.d.ts" />

var persons;
var personsBase = [
    { firstname: 'Peter', lastname: 'Jensen', type: 'Person', age: 30 },
    { firstname: 'Anne', lastname: 'Jensen', type: 'Person', age: 50  },
    { firstname: 'Kurt', lastname: 'Hansen', type: 'Person', age: 40  }
];

QUnit.module('Linq equivalent operations in Javascript');
QUnit.testStart(() => persons = personsBase.slice(0));

test('All', () => {
    var result = persons.filter(person => person.type == 'Person').length == persons.length;

    ok(result);
});

test('Concat', () => { 
    var result = persons.concat(persons);

    equal(result.length, 6);
});

test('Count', () => {
    var result = persons.length;

    equal(result, 3);
});


test('Distinct', () => {
	var lastnames = personsBase.map(person => person.lastname);
    var result = lastnames.filter((value, index) => lastnames.indexOf(value) == index);

    equal(result.length, 2);
});

test('Empty', () => {
    var result = [];

    equal(result.length, 0);
});

test('First', () => {
    var result = persons[0];
    if (!result) throw new Error('Expected at least one element to take first')

    equal(result.firstname, 'Peter');
});

test('FirstOrDefault', () => {
    var result = persons[0];

    equal(result.firstname, 'Peter');
});

test('ForEach', () => {
	persons.forEach(person => person.type = '')

    equal(persons[0].type, '');
});

test('GroupBy', () => {
	var result = persons.reduce((previous, person) => {
		(previous[person.lastname] = previous[person.lastname] || []).push(person);
    	return previous;
	}, []);

	equal(result['Jensen'].length, 2);
});

test('IndexOf', () => {
	var result = persons.indexOf(persons[2]);

    equal(result, 2);
});

test('Last', () => {
    var result = persons[persons.length-1];

    if (!result) throw new Error('Expected at least one element to take last')

    equal(result.firstname, 'Kurt');
});

test('LastOrDefault', () => {
    var result = persons[persons.length-1];

    equal(result.firstname, 'Kurt');
});

test('OrderBy', () => {
    persons.sort((person1, person2) => person1.firstname.localeCompare(person2.firstname));

    equal(persons[0].firstname, 'Anne');
});

test('OrderByDescending', () => {
    persons.sort((person1, person2) => person2.firstname.localeCompare(person1.firstname));

    equal(persons[0].firstname, 'Peter');
});

test('Reverse', () => {
	var result = persons.reverse();

    equal(result[0].firstname, 'Kurt');
});

test('Select', () => {
	var result = persons.map(person => ({ fullname: person.firstname + ' ' + person.lastname }) );

    equal(result[0].fullname, 'Peter Jensen');
});

test('Single', () => {
	var onePerson = persons.filter(person => person.firstname == "Peter"); 
    if (onePerson.length != 1) throw new Error('Expected at excactly one element to take single')
   
	var result = onePerson[0];

    equal(result.firstname, 'Peter');
});

test('Skip', () => {
	var result = persons.slice(2, persons.length); 

    equal(result[0].firstname, 'Kurt');
    equal(result.length, 1);
});

test('Take', () => {
	var result = persons.slice(0, 2); 

	equal(result[0].firstname, 'Peter');
    equal(result.length, 2);
});

test('Where', () => {
    var result = persons.filter(person => person.lastname == 'Jensen')

    equal(result.length, 2);
});