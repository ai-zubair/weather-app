const geocode = require('./geocode');
const axios = require('axios');
const devAPIs = require('./dev_api');

const createWeatherRequest = ( latitude,longitude ) => {
    const queryString = 'units=si';
    const requestUrl = `${devAPIs.weatherAPI.url}/${devAPIs.weatherAPI.key}/${latitude},${longitude}?${queryString}`;
    return requestUrl;
}

const weatherData = ( location ) => {
    const latitude = location.latitude;
    const longitude = location.longitude;
    const weatherDataRequest = createWeatherRequest( latitude,longitude );
    console.log(`Fetching weather for : ${location.address}`)
    return new Promise((resolve,reject)=>{
        axios.get( weatherDataRequest ).then(( response )=>{
            resolve( response.data.currently );
        }).catch(( err )=>{
            reject('Ah! Snap! Something went wrong while fetching the weather.');
        })
    })
}

const fetchWeatherData = ( address ) => {
    return new Promise((resolve,reject)=>{
        geocode( address ).then(( location )=>{
            return weatherData( location ) ;
        }).then(( weather )=>{
            resolve( weather )
        }).catch(( err )=>{
            reject( err )
        })
    })
}

module.exports = fetchWeatherData;