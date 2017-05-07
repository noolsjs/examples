'use strict';

const nools = require('nools');

const flow = nools.compile(require.resolve('./validator-example.nools'));
const User = flow.getDefined('user');


/**
 * In this example we create a user validator. The validator will emit a validation error
 * if any of the following conditions are met.
 *
 * 1. Missing First or Last Name
 * 2. First or Last Name are > 10 characters
 * 3. First or Last Name contain numeric characters.
 * 4. Missing DOB
 * 5. DOB > 100 years old.
 * 6. DOB < 18 years old.
 * 7. Missing Email Address
 * 8. Invalid Email Address.
 * 9. Non unique Email Address.
 *
 * @return {*|Promise.<null>}
 */
function example1() {
    const users = [
        // invalid firstName, lastName and email
        new User({id: 1}),
        // invalid lastName, dob, and email
        new User({id: 2, firstName: 'Bob'}),
        // invalid dob and email
        new User({id: 3, firstName: 'Bob', lastName: 'Yukon'}),
        // dob < 18 years invalid email
        new User({id: 4, firstName: 'Bob', lastName: 'Yukon', dob: new Date(2000, 10, 10)}),
        // invalid email
        new User({id: 5, firstName: 'Bob', lastName: 'Yukon', dob: new Date(1980, 10, 10)}),
        // invalid email
        new User({id: 6, firstName: 'Bob', lastName: 'Yukon', dob: new Date(1980, 10, 10), email: 'bob'}),
        // invalid email
        new User({id: 7, firstName: 'Bob', lastName: 'Yukon', dob: new Date(1980, 10, 10), email: 'bob@yukon'}),
        // valid
        new User({id: 8, firstName: 'Bob', lastName: 'Yukon', dob: new Date(1980, 10, 10), email: 'bob@yukon.com'}),
        // invalid firstName
        new User({id: 9, firstName: 'Bob1', lastName: 'Yukon', dob: new Date(1980, 10, 10), email: 'bob1@yukon.com'}),
        // invalid lastName
        new User({id: 10, firstName: 'Bob', lastName: 'Yukon1', dob: new Date(1980, 10, 10), email: 'bob2@yukon.com'}),
        // invalid firstName > 10 characters
        new User({id: 11, firstName: 'Bobalicious', lastName: 'Yukon', dob: new Date(1980, 10, 10), email: 'bob3@yukon.com'}),
        // invalid lastName > 10 characters, non unique email
        new User({id: 12, firstName: 'Sally', lastName: 'GregorianCalendar', dob: new Date(1980, 10, 10), email: 'sally@yukon.com'}),
        // invalid non unique email
        new User({id: 13, firstName: 'Sally', lastName: 'Yukon', dob: new Date(1980, 10, 10), email: 'sally@yukon.com'}),
    ];
    const invalidIds = new Set();
    const session = flow.getSession(...users);
    return session
        .on('validation-error', (err) => {
            invalidIds.add(err.user.id);
            console.log(`validation-example: Example 1 - ${err.user} is invalid '${err.error}'`);
        })
        .match()
        .then(() => {
            users
                .filter(m => !invalidIds.has(m.id))
                .forEach(m => console.log(`validation-example: Example 1 - ${m} is valid`));
            session.dispose();
        });
}

module.exports = {
    run() {
        return example1();
    },
};
