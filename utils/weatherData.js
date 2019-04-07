const geocode = require('./geocode');
const request = require('request');
const devAPIs = require('./dev_api');

const createWeatherRequestObject = ( latitude,longitude ) => {
    const queryString = 'units=si';
    const requestUrl = `${devAPIs.weatherAPI.url}/${devAPIs.weatherAPI.key}/${latitude},${longitude}?${queryString}`;
    return {
        url: requestUrl,
        json :true
    }
}

const weatherData = ( addressResults , weatherCallback ) => {
    const latitude = addressResults.latitude;
    const longitude = addressResults.longitude;
    const weatherDataRequest = createWeatherRequestObject( latitude,longitude );
    request(weatherDataRequest,(err,res,body)=>{
        if(!err && res.statusCode === 200){
            weatherCallback(undefined,(body.currently));
        }else{
            weatherCallback('Could not fetch the weather.')
        }
    })
}

const fetchWeatherData = ( address, callback ) => {
    geocode(address,(error,results)=>{
        if( error ){
            callback(error);
        }else{
            weatherData( results, callback );
        }
    }); 
    
}

module.exports = fetchWeatherData;