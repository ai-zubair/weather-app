var request = require('request');

var urlString='https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBXksvM0qgO-vKhQ-Z9siG5dAIdav7hI5U&address=1301%20lombard%20street%20philadelphia'
request({
    url :urlString,
    json:true
},(err,res,body)=> {
    // console.log(JSON.stringify(body,undefined,2))
    // console.log(res)
    console.log(`Address : ${body.results[0].formatted_address},\nLatitude:${body.results[0].geometry.location.lat}\nLongitude:${body.results[0].geometry.location.lng}`);
});