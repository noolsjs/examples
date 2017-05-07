# Validator Example

```sh
npm run validator-example
```

In this example we create a user validator.

The validator will emit a validation error if any of the following conditions are met.

1. Missing First or Last Name
2. First or Last Name are > 10 characters
3. First or Last Name contain numeric characters.
4. Missing DOB
5. DOB > 100 years old.
6. DOB < 18 years old.
7. Missing Email Address
8. Invalid Email Address.
9. Non unique Email Address.

## Expected Output

```
validation-example: Example 1 - User(id: 12, firstName: Sally, lastName: GregorianCalendar, dob: 1980-11-10T06:00:00.000Z, email: sally@yukon.com) is invalid 'Email is not unqiue'
validation-example: Example 1 - User(id: 13, firstName: Sally, lastName: Yukon, dob: 1980-11-10T06:00:00.000Z, email: sally@yukon.com) is invalid 'Email is not unqiue'
validation-example: Example 1 - User(id: 12, firstName: Sally, lastName: GregorianCalendar, dob: 1980-11-10T06:00:00.000Z, email: sally@yukon.com) is invalid 'Last name cannot be longer than 10 characters'
validation-example: Example 1 - User(id: 11, firstName: Bobalicious, lastName: Yukon, dob: 1980-11-10T06:00:00.000Z, email: bob3@yukon.com) is invalid 'First name cannot be longer than 10 characters'
validation-example: Example 1 - User(id: 10, firstName: Bob, lastName: Yukon1, dob: 1980-11-10T06:00:00.000Z, email: bob2@yukon.com) is invalid 'Last name is must not contain numbers'
validation-example: Example 1 - User(id: 9, firstName: Bob1, lastName: Yukon, dob: 1980-11-10T06:00:00.000Z, email: bob1@yukon.com) is invalid 'First name is must not contain numbers'
validation-example: Example 1 - User(id: 7, firstName: Bob, lastName: Yukon, dob: 1980-11-10T06:00:00.000Z, email: bob@yukon) is invalid 'Invalid email address'
validation-example: Example 1 - User(id: 6, firstName: Bob, lastName: Yukon, dob: 1980-11-10T06:00:00.000Z, email: bob) is invalid 'Invalid email address'
validation-example: Example 1 - User(id: 5, firstName: Bob, lastName: Yukon, dob: 1980-11-10T06:00:00.000Z, email: undefined) is invalid 'Invalid email address'
validation-example: Example 1 - User(id: 4, firstName: Bob, lastName: Yukon, dob: 2000-11-10T06:00:00.000Z, email: undefined) is invalid 'Date Of Birth must be >= 18 years ago'
validation-example: Example 1 - User(id: 4, firstName: Bob, lastName: Yukon, dob: 2000-11-10T06:00:00.000Z, email: undefined) is invalid 'Invalid email address'
validation-example: Example 1 - User(id: 3, firstName: Bob, lastName: Yukon, dob: null, email: undefined) is invalid 'Date of birth is required'
validation-example: Example 1 - User(id: 3, firstName: Bob, lastName: Yukon, dob: null, email: undefined) is invalid 'Invalid email address'
validation-example: Example 1 - User(id: 2, firstName: Bob, lastName: undefined, dob: null, email: undefined) is invalid 'Last name is required'
validation-example: Example 1 - User(id: 2, firstName: Bob, lastName: undefined, dob: null, email: undefined) is invalid 'Date of birth is required'
validation-example: Example 1 - User(id: 2, firstName: Bob, lastName: undefined, dob: null, email: undefined) is invalid 'Invalid email address'
validation-example: Example 1 - User(id: 1, firstName: undefined, lastName: undefined, dob: null, email: undefined) is invalid 'First name is required'
validation-example: Example 1 - User(id: 1, firstName: undefined, lastName: undefined, dob: null, email: undefined) is invalid 'Last name is required'
validation-example: Example 1 - User(id: 1, firstName: undefined, lastName: undefined, dob: null, email: undefined) is invalid 'Date of birth is required'
validation-example: Example 1 - User(id: 1, firstName: undefined, lastName: undefined, dob: null, email: undefined) is invalid 'Invalid email address'
validation-example: Example 1 - User(id: 8, firstName: Bob, lastName: Yukon, dob: 1980-11-10T06:00:00.000Z, email: bob@yukon.com) is valid
```