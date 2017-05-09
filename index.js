'use strict';

const agendaExamples = require('./agenda-examples');
const counterExample = require('./counter-example');
const fibonacciExample = require('./fibonacci-example');
const helloWorldExample = require('./hello-world-example')
const validatorExample = require('./validator-example');

const examples = {
    agenda: agendaExamples,
    'counter-example': counterExample,
    fibonacci: fibonacciExample,
    'hello-world': helloWorldExample,
    'validator-example': validatorExample,
};

function runExample(group, example) {
    const args = [...arguments].slice(1);
    if (!(group in examples)) {
        throw new Error(`Unknown example ${group} ${args.join(' ')}`);
    }
    let runner = examples[group];
    if (!runner.run) {
        runner = runner[args.shift()];
    }
    if (!runner.run) {
        throw new Error(`Unknown example ${group} ${args.join(' ')}`);
    }
    return runner.run(...args)
        .then(null, (err) => {
            console.error(err.stack);
            process.exit(1);
        });
}

runExample(...process.argv.slice(2));

