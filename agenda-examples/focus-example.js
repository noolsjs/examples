'use strict';

const nools = require('nools');

const flow = nools.compile(require.resolve('./focus-example.nools'));
const State = flow.getDefined('state');

/**
 * In this example we create a simple state machine that makes use of `focus` and `auto-focus`
 *
 * The `Bootstrap` rule will run first as it is part of the default agenda group.
 * As part of its action it modifies fact `a` state to finished, which in turn causes
 * the rule `A to B` to fire.
 *
 * Once `A to B` first `B to C` comes into focus because of the `auto-focus` flag.
 * In the action of `B to C` focus('B to D') is invoked which puts that agenda group
 * at the top of the stack and it will run next.
 *
 * Expected output:
 * ```
 * focus-example: Example 1 [ 'Bootstrap', 'A to B', 'B to C', 'B to D' ]
 * ```
 *
 * @return {*|Promise.<TResult>}
 */
function example1() {
    const fired = [];
    const session = flow.getSession(
        new State('A', 'NOT_RUN'),
        new State('B', 'NOT_RUN'),
        new State('C', 'NOT_RUN'),
        new State('D', 'NOT_RUN'));

    return session.on('fire', ruleName => fired.push(ruleName))
        .match()
        .then(() => console.log('focus-example: Example 1', fired)); // [ 'Hello World', 'Hello World2' ]);
}

module.exports = {
    run() {
        return example1();
    },
};
