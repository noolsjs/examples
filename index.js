'use strict';

const agendaExamples = require('./agenda-examples');
const counterExample = require('./counter-example');

const examples = {
    agenda: agendaExamples,
    'counter-example': counterExample,
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

