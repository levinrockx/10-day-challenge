const java = require("java");

java.classpath.push('./java');

const Main = java.import('Main');

const mainInstance = new Main();

mainInstance.getMyStr((err, result) => {
    console.log(result);
});