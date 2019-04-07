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

const weatherData = ( addressResults , handleWeatherData ) => {
    const latitude = addressResults.latitude;
    const longitude = addressResults.longitude;
    const weatherDataRequest = createWeatherRequestObject( latitude,longitude );
    request(weatherDataRequest,(err,res,body)=>{
        if(!err && res.statusCode === 200){
            handleWeatherData(undefined,(body.currently));
        }else{
            handleWeatherData(`Could not fetch the weather for ${addressResults.address}.`)
        }
    })
}

const fetchWeatherData = ( locationAddress, handleWeatherData ) => {
    geocode(locationAddress,(error,addressResults)=>{
        if( error ){
            handleWeatherData(error);
        }else{
            weatherData( addressResults, handleWeatherData );
        }
    }); 
    
}

module.exports = fetchWeatherData;