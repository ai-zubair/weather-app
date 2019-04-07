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
const handleLocationRequest = ( error, responseBody ,responseCallback ) => {
    if( error ){
        responseCallback('Oops! Looks like an error occurred during the request.');
    }else if( responseBody.status === "ZERO_RESULTS" ){
        responseCallback('OOPS! No such address was found.');
    }else if( responseBody.status === "OK" ){
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
    request(geocodeRequestObject,(error,response,body) => {
        handleLocationRequest( error, body ,responseCallback )
    });
}

module.exports = fetchAddressLocation;