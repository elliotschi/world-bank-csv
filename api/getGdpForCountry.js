const request = require('request-promise-native');

const getUriForCountry = (countryCode) => `http://api.worldbank.org/countries/${countryCode}/indicators/NY.GDP.MKTP.CD`;

const getGdpForCountry = (countryCode) => {
    const options = {
        uri: getUriForCountry(countryCode),
        qs: {
            format: 'json',
            // Most recent value.
            MRV: 1,
        },
        json: true,
    };
    return request.get(options).then(response => response[1] ? response[1][0].value : null);
};

module.exports = getGdpForCountry;
