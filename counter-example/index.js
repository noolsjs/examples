'use strict';

const _ = require('lodash');
const nools = require('nools');

const flow = nools.compile(require.resolve('./counter-example.nools'));

/**
 * In this example a flow to count to a specific number.
 *
 * This flow makes use of `halt` and `matchUntilHalt`. This example has four rules.
 *
 * 1. `Bootstrap` - This looks for a Number fact and a non existent Counter.
 * Once this rule is fired a counter is asserted into the session.
 * 2. `Done Counting` - This rule looks for a Number and a counter that has a count
 * equal to the Number. This rule is interesting because it calls `halt()` once it is
 * fired which causes `matchUntilHalt` to resolve.
 * 3. `Log Count` - This rule looks for a counter and logs a message every time the
 * counter is divisible by 1000.
 * 4. `Increment Counter` - This rule increments the counter.
 *
 * @return {Promise}
 */
function example1(howHighToCount) {
    const howHigh = parseInt(howHighToCount, 10) || 10000;
    return flow.getSession(howHigh).matchUntilHalt();
}

module.exports = {
    run(howHigh){
        return example1(howHigh);
    },
};
