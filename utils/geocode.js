const request = require('request');
const devAPIs = require('./devAPIs');

const validateInputAddress = ( address ) => {
    if( address.length === 0 ){
        console.log('Please enter a valid address.')
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

const handleGeocodeResponse = (error,response,body) => {
    if( error ){
        console.log('Oops! Looks like an error occurred during the request.');
        return;
    }
    const formattedAddress = body.results[0].formatted_address;
    const lat = body.results[0].geometry.location.lat ;
    const lng = body.results[0].geometry.location.lng ;
    console.log(`Address : ${formattedAddress},\nLatitude:${lat}\nLongitude:${lng}`);
}

const fetchAddressLocation = ( address ) => {
    const isValidAddress = validateInputAddress(address);
    if( isValidAddress ){
        const geocodeRequestObject = createGeocodeRequestObject( address );
        request(geocodeRequestObject,handleGeocodeResponse);
    }
}

module.exports = fetchAddressLocation;