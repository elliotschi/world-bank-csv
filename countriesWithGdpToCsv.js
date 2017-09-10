const csvWriter = require('csv-write-stream');
const fs = require('fs');

const countriesWithGdpToCsv = (countriesWithGdp) => {
    const writer = csvWriter();
    writer.pipe(fs.createWriteStream('output.csv'));
    for (country of countriesWithGdp) {
        writer.write(country);
    }
    writer.end();
};

module.exports = countriesWithGdpToCsv;
