'use strict';

const nools = require('nools');

class Fibonacci {
    constructor(options) {
        const opts = options || {};
        this.sequence = opts.sequence;
        this.value = opts.value || -1;
    }
}

class Result {
    constructor(result) {
        this.result = result || -1;
    }

    toString() {
        return `${this.result}`;
    }
}

const flow = nools.flow('Fibonacci Programmatic Example', (builder) => {
    builder.rule('Recurse',
        [
            [Fibonacci, 'f1', 'f1.value == -1'],
            ['not', Fibonacci, 'f', 'f.sequence == 1'],
        ],
        (facts, session) => {
            session.assert(new Fibonacci({sequence: facts.f1.sequence - 1}));
        });

    builder.rule('Bootstrap',
        [
            Fibonacci, 'f', '(f.sequence == 1 || f.sequence == 2) && f.value == -1',
        ],
        (facts, session) => {
            facts.f.value = 1;
            session.modify(facts.f);
        });

    builder.rule('Calculate',
        [
            [Fibonacci, 'f1', 'f1.value != -1', {sequence: 's1'}],
            [Fibonacci, 'f2', 'f2.value != -1 && f2.sequence == s1 + 1', {sequence: 's2'}],
            [Fibonacci, 'f3', 'f3.value == -1 && f3.sequence == s2 + 1'],
            [Result, 'r'],
        ],
        (facts, session) => {
            facts.f3.value = facts.f1.value + facts.f2.value;
            session.modify(facts.f3);
            facts.r.result = facts.f3.value;
            session.modify(facts.r);
        });
});

/**
 * In this example a [fibonacci](https://en.wikipedia.org/wiki/Fibonacci) calculator is created using
 * the `nools` programmatic api.
 *
 * There are three rules in this example.
 *
 * 1. `Recurse` - This rule creates a `Fibonacci` instance for each number up
 * to the calculated value (e.g. 1,2,3,4,5,6,7,8,9,10)
 * 2. `Bootstrap` - This rule looks for any `Fibonacci` instance that has a value
 * equal to -1 and a sequence of 1 or 2 and sets it to 1.
 * 3. `Calculate` - This rule looks for the subsequent Fibonacci instances
 * (f1, f2, f3) with f3 not being calculated and calculates its value from f1 and f2 added together.
 *
 * Expected Output:
 *
 * ```
 * fibonacci-programmatic-example: Example 1 - [number=10] [result=55]
 * ```
 *
 * @param {Number} [number=10] - The number to calculate the Fibonacci value of.
 * @return {*|Promise.<TResult>}
 */
function example1(number) {
    const sequence = parseInt(number, 10) || 10;
    const result = new Result();
    const session = flow.getSession(new Fibonacci({sequence}), result);
    return session.match()
        .then(() => {
            console.log(`fibonacci-programmatic-example: Example 1 - [number=${sequence}] [result=${result}]`);
            session.dispose();
        });
}

module.exports = {
    run(number) {
        return example1(number);
    },
};
