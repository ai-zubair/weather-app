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

const fetchAddressLocation = ( address , responseCallback ) => {
    const isValidAddress = validateInputAddress(address);
    if( !isValidAddress ){
        responseCallback('Invalid address.');
        return;
    }
    const geocodeRequestObject = createGeocodeRequestObject( address );
    request(geocodeRequestObject,(error,response,body) => {
        if( error ){
            responseCallback('Oops! Looks like an error occurred during the request.');
        }else if( body.status === "ZERO_RESULTS" ){
            responseCallback('OOPS! No reults were found for that address.');
        }else if( body.status === "OK" ){
            responseCallback(undefined,{
                address :body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat ,
                longitude:body.results[0].geometry.location.lng 
            });
        }
    });
}

module.exports = fetchAddressLocation;