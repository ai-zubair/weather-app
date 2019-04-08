const yargs = require('yargs');
const appCommands = require('./utils/commandValidation');
const fetchWeatherData = require('./utils/weatherData');

const argv = yargs.options(appCommands.appOptions)
    .help()
    .alias('help','h')
    .argv;

fetchWeatherData(argv.address).then((results)=>{
        console.log(JSON.stringify(results,undefined,2));
    }).catch((err)=>{
        console.log(err);
    })