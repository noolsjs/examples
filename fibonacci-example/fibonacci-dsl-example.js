'use strict';

const nools = require('nools');

const flow = nools.compile(require.resolve('./fibonacci-dsl-example.nools'));

const Fibonacci = flow.getDefined('fibonacci');
const Result = flow.getDefined('result');

/**
 * In this example a [fibonacci](https://en.wikipedia.org/wiki/Fibonacci) calculator is created using the `nools` dsl.
 *
 * There are three rules in this example.
 *
 * 1. `Recurse` - This rule creates a `Fibonacci` instance for each number up
 * to the calculated value (e.g. 1,2,3,4,5,6,7,8,9,10)
 * 2. `Bootstrap` - This rule looks for any `Fibonacci` instance that have a value
 * equal to -1 and a sequence of 1 or 2 and sets it to 1.
 * 3. `Calculate` - This rule looks for the subsequent Fibonacci instances
 * (f1, f2, f3) with f3 not being calculated and calculates its value from f1 and f2 added together.
 *
 * Expected Output:
 *
 * ```
 * fibonacci-dsl-example: Example 1 - [number=10] [result=55]
 * ```
 *
 * @param {Number} [number=10] - The number to calculate the Fibonacci value of.
 * @return {*|Promise.<null>}
 */
function example1(number) {
    const sequence = parseInt(number, 10) || 10;
    const result = new Result();
    const session = flow.getSession(new Fibonacci({sequence}), result);
    return session.match()
        .then(() => {
            console.log(`fibonacci-dsl-example: Example 1 - [number=${sequence}] [result=${result}]`);
            session.dispose();
        });
}

module.exports = {
    run(number) {
        return example1(number);
    },
};
