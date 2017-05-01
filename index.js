'use strict';

const agendaExamples = require('./agenda-examples');

const examples = {
    agenda: agendaExamples,
};

function runExample(group, example) {
    if (!(group in examples)) {
        throw new Error(`Unknown example ${group} ${example}`);
    }
    const exampleGroup = examples[group];
    if (!(example in exampleGroup)) {
        throw new Error(`Unknown example ${group} ${example}`);
    }
    return exampleGroup[example].run()
        .then(null, (err) => {
            console.error(err.stack);
            process.exit(1);
        });
}

runExample(...process.argv.slice(2));

