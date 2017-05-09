'use strict';

const nools = require('nools');

const flow = nools.compile(require.resolve('./hello-world-dsl-example.nools'));
const Message = flow.getDefined('Message');

/**
 * In this example we create a 'hello world' flow. This flow contains one
 * rule that will look for a `Message` containing `hello` and log 'hello world'.
 *
 * Expected Output:
 *
 * ```
 * hello-world
 * ```
 *
 * @return {*|Promise.<null>}
 */
function example1() {
    const session = flow.getSession(new Message({message: 'hello'}));
    return session.match().then(() => session.dispose());
}

module.exports = {
    run() {
        return example1();
    },
};
