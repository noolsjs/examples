'use strict';

const nools = require('nools');

class Message {
    constructor(message) {
        this.message = message;
    }
}

const flow = nools.flow('Hello World', (builder) => {
    // find any message that starts with hello
    builder.rule('Hello', [Message, 'm', 'm.message == "hello"'], (facts) => {
        console.log(`${facts.m.message} world`);
    });
});

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
    const session = flow.getSession(new Message('hello'));
    return session.match().then(() => session.dispose());
}

module.exports = {
    run() {
        return example1();
    },
};
