'use strict';

const nools = require('nools');

class Message {
    constructor(name) {
        this.name = name;
    }
}

const flow = nools.flow('agenda-group example', (builder) => {
    builder.rule(
        'Agenda Group 1',
        {agendaGroup: 'ag1'},
        [Message, 'm', "m.name == 'hello'"],
        (facts, session) => {
            facts.m.name = 'goodbye';
            session.modify(facts.m);
        });

    builder.rule(
        'Agenda Group 2',
        {agendaGroup: 'ag2'},
        [Message, 'm', "m.name == 'goodbye'"],
        (facts, session) => {
            facts.m.name = 'hello';
            session.modify(facts.m);
        });
});

/**
 * In this example only the `ag1` agenda group is focused so
 * only one rule will fire ('Agenda Group 1').
 *
 * Expected output:
 * ```
 * agenda-programmatic-example: Example 1 [ 'Agenda Group 1' ]
 * ```
 * @return {*|Promise.<TResult>}
 */
function example1() {
    const fired = [];
    return flow.getSession(new Message('hello'))
        .focus('ag1')
        .on('fire', ruleName => fired.push(ruleName))
        .match()
        .then(() => console.log('agenda-programmatic-example: Example 1', fired));
}

/**
 * In this example only the `ag2` agenda group is focused so
 * only one rule will fire ('Agenda Group 2').
 *
 * Expected output:
 * ```
 * agenda-programmatic-example: Example 2 [ 'Agenda Group 2' ]
 * ```
 * @return {*|Promise.<TResult>}
 */
function example2() {
    const fired = [];
    return flow.getSession(new Message('goodbye'))
        .focus('ag2')
        .on('fire', ruleName => fired.push(ruleName))
        .match()
        .then(() => console.log('agenda-programmatic-example: Example 2', fired));
}

/**
 * In this example `ag2` is focused first then `ag1` is focused immediately after.
 *
 * Agenda groups are stack based so `Agenda Group 1` will fire first because
 * its agenda-group is `ag1` then `Agenda Group 2` will fire.
 *
 * Expected output:
 * ```
 * agenda-programmatic-example: Example 3 [ 'Agenda Group 1', 'Agenda Group 2' ]
 * ```
 * @return {*|Promise.<TResult>}
 */
function example3() {
    const fired = [];
    return flow.getSession(new Message('hello'))
        .focus('ag2')
        .focus('ag1')
        .on('fire', ruleName => fired.push(ruleName))
        .match()
        .then(() => console.log('agenda-programmatic-example: Example 3', fired));
}

/**
 * In this example `ag1` is focused first then `ag2` is focused immediately after.
 *
 * Agenda groups are stack based so `Agenda Group 2` will fire first because
 * its agenda-group is `ag2` then `Agenda Group 1` will fire.
 *
 * Expected output:
 * ```
 * agenda-programmatic-example: Example 4 [ 'Agenda Group 2', 'Agenda Group 1' ]
 * ```
 * @return {*|Promise.<TResult>}
 */
function example4() {
    const fired = [];
    return flow.getSession(new Message('goodbye'))
        .focus('ag1')
        .focus('ag2')
        .on('fire', ruleName => fired.push(ruleName))
        .match()
        .then(() => console.log('agenda-programmatic-example: Example 4', fired));
}

module.exports = {
    run() {
        return example1()
            .then(() => example2())
            .then(() => example3())
            .then(() => example4());
    },
};
