const departments = require('./src/departments');
const quotas = require('./src/quotas');
const users = require('./src/users');

const ruleEngine = require('./src/rule');
const rules = ruleEngine.rules;

function execute() {
    Object.values(rules).forEach((rule) => {
        if (!rule.condition()) {
            rule.action();
        }
    });
}

function printResults() {
    console.log("\n[*] Departments\n", departments);
    console.log("\n[*] Users\n", users);
    console.log("\n[*] Quotas\n", quotas);
}

console.log("Before running rule engine");
printResults();

execute();

console.log("\nAfter running rule engine");
printResults();