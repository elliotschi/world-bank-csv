const getHighIncomeCountries = require('./api/getHighIncomeCountries');
const getGdpForCountry = require('./api/getGdpForCountry');
const countriesWithGdpToCsv = require('./countriesWithGdpToCsv');

const main = async () => {
    try {
        const countries = await getHighIncomeCountries();
        const gdps = await Promise.all(countries.map(country => getGdpForCountry(country.iso2Code)));
        const countriesWithGdp = countries.map((country, index) => ({
            country: country.name,
            long: country.longitude,
            lat: country.latitude,
            GDP: gdps[index],
        }));
        countriesWithGdpToCsv(countriesWithGdp);
    } catch (e) {
        console.error(e);
    }
};

if (require.main === module) {
    main();
}
