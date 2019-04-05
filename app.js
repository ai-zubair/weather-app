var request = require('request');

var urlString='https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCGuNZA83IRGZxd8LVqhCT5aYv9oc8cIC0&address=1301%20lombard%20street%20philadelphia'
request({
    url :urlString,
    json:true
},(err,res,body)=> {
    console.log(body)
});