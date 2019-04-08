const axios = require('axios');
const devAPIs = require('./dev_api');

const validateInputAddress = ( address ) => {
    if( address.length === 0 ){
        return false;
    }
    return true;
}

const createGeocodeRequest = ( address ) => {
    const requestUrl = `${devAPIs.geocodeAPI.url}?key=${devAPIs.geocodeAPI.key}&address=${encodeURIComponent(address)}`;
    return requestUrl ;
}

const createLocationObject = ( locationDetails ) => {
    return {
        address : locationDetails.formatted_address,
        latitude : locationDetails.geometry.location.lat,
        longitude : locationDetails.geometry.location.lng
    }
}

const geocode = ( address ) => {
    const isValidAddress = validateInputAddress(address);
    return new Promise((resolve,reject)=>{
        if( !isValidAddress ){
            reject('Invalid address.');
        }else{
            const geocodeRequest = createGeocodeRequest( address );
            console.log(`Fetching location results for : ${address}`)
            axios.get(geocodeRequest).then((response) => {
                if ( response.data.status === 'ZERO_RESULTS' ){
                    reject(`Ooops! No locations found for ${address}`)
                }
                if( response.data.status === "REQUEST_DENIED" ){
                    reject('OOPS! Looks like you have an invalid geocode API key.');
                }
                const location = createLocationObject(response.data.results[0]);
                console.log(`Location found for ${address} : ${location.address}`) 
                resolve(location);
            }).catch( (err) => {
                reject('Uh! Oh! Could not connect to location API servers.')
            });
        }
    })
}

module.exports = geocode;