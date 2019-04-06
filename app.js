const request = require('request');
const yargs = require('yargs');

const argv = yargs.options({
        a : {
            describe : 'Address of the location to fetch weather for.',
            demand : 'true',
            alias : 'address',
            string : true
        }
    })
    .help()
    .alias('help','h')
    .argv;

const address = argv.address;

if(address.length === 0) {
    console.log('Please provide a valid address!')
    return;
}
console.log(address)
console.log(argv)
var encodedAddress = encodeURIComponent(address)

var urlString=`https://maps.googleapis.com/maps/api/geocode/json?key=[YOU_API_KEY]&address=${encodedAddress}`


request({
    url :urlString,
    json:true
},(err,res,body)=> {
    // console.log(JSON.stringify(body,undefined,2))
    // console.log(res)
    console.log(`Address : ${body.results[0].formatted_address},\nLatitude:${body.results[0].geometry.location.lat}\nLongitude:${body.results[0].geometry.location.lng}`);
});