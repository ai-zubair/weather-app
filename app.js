// const yargs = require('yargs');
// const appCommands = require('./utils/commandValidation');
// const geocode = require('./utils/geocode');

// const argv = yargs.options(appCommands.appOptions)
//     .help()
//     .alias('help','h')
//     .argv;

// geocode(argv.address,(error,results)=>{
//     if( error ){
//         console.log(error);
//     }else{
//         console.log(JSON.stringify(results,undefined,2));
//     }
// }); 

const request =require('request');
request({
    url:'https://api.darksky.net/forecast/8992c13e95905a7d65bd64978f8fcbe5/28.4499613, 77.0657347',
    json : true
},(err,res,body)=>{
    console.log(`${((((body.currently.temperature)-32)*5)/9).toFixed(2) }\u00B0C`);
})