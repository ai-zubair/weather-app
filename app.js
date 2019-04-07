const yargs = require('yargs');
const appCommands = require('./utils/commandValidation');
const fetchWeatherData = require('./utils/weatherData');

const argv = yargs.options(appCommands.appOptions)
    .help()
    .alias('help','h')
    .argv;

fetchWeatherData(argv.address,(error,results)=>{
    if( error ){
        console.log(error);
    }else{
        console.log(JSON.stringify(results,undefined,2));
    }
})
