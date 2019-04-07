const yargs = require('yargs');
const appCommands = require('./weather-utils/commandValidation');
const geocode = require('./weather-utils/geocode');

const argv = yargs.options(appCommands.appOptions)
    .help()
    .alias('help','h')
    .argv;

geocode.fetchAddressLocation(argv.address);