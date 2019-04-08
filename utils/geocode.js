const request = require('request');
const devAPIs = require('./dev_api');

const validateInputAddress = ( address ) => {
    if( address.length === 0 ){
        return false;
    }
    return true;
}

const createGeocodeRequestObject = ( address ) => {
    const requestUrl = `${devAPIs.geocodeAPI.url}?key=${devAPIs.geocodeAPI.key}&address=${encodeURIComponent(address)}`
    return {
        url: requestUrl,
        json :true
    }
}
const handleLocationRequest = ( error, responseBody ,responseCallback,address ) => {
    if( error ){
        responseCallback('Oops! Looks like an error occurred connecting with the Google servers.');
    }else if( responseBody.status === "ZERO_RESULTS" ){
        responseCallback('OOPS! No such address was found.');
    }else if( responseBody.status === "REQUEST_DENIED" ){
        responseCallback('OOPS! Looks like you have an invalid geocode API key.');
    }else if( responseBody.status === "OK" ){
        console.log(`Location found for ${address} : ${responseBody.results[0].formatted_address}`)
        responseCallback(undefined,{
            address :responseBody.results[0].formatted_address,
            latitude:responseBody.results[0].geometry.location.lat ,
            longitude:responseBody.results[0].geometry.location.lng 
        });
    }
}

const fetchAddressLocation = ( address , responseCallback ) => {
    const isValidAddress = validateInputAddress(address);
    if( !isValidAddress ){
        responseCallback('Invalid address.');
        return;
    }
    const geocodeRequestObject = createGeocodeRequestObject( address );
    console.log(`Fetching location results for : ${address}`)
    request(geocodeRequestObject,(error,response,body) => {
        handleLocationRequest( error, body ,responseCallback,address )
    });
}

module.exports = fetchAddressLocation;