const request = require('request-promise-native');

const COUNTRIES_URI = 'http://api.worldbank.org/countries';

const getHighIncomeCountries = () => {
    const options = {
        uri: COUNTRIES_URI,
        qs: {
            incomeLevel: 'HIC',
            format: 'json',
        },
        json: true,
    };
    return request.get(options)
        .then(response => {
            const [metadata,] = response;
            return metadata.total;
        })
        .then(per_page => request.get(Object.assign({}, options, {
            qs: Object.assign({}, options.qs, {
                per_page,
            }),
        })))
        .then(response => response[1]);
};

module.exports = getHighIncomeCountries;
