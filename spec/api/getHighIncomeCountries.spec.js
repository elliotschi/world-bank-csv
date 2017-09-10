const getHighIncomeCountries = require('../../api/getHighIncomeCountries');
const request = require('request-promise-native');
const PromiseMock = require('promise-mock');

describe('getHighIncomeCountries()', () => {
    beforeAll(() => {
        PromiseMock.install();
    });

    afterAll(() => {
        PromiseMock.uninstall();
    });

    beforeEach(() => {
        spyOn(request, 'get');
    });

    it('makes an initial request to get total number of results and then makes another request with the per_page set in the querystring', () => {
        request.get.and.returnValues(
            Promise.resolve([
                {total: '75'},
            ]),
            Promise.resolve([]),
        );
        getHighIncomeCountries();
        Promise.runAll();
        expect(request.get).toHaveBeenCalledWith({
            uri: 'http://api.worldbank.org/countries',
            qs: {
                incomeLevel: 'HIC',
                format: 'json',
            },
            json: true,
        });
        expect(request.get).toHaveBeenCalledTimes(2);
        expect(request.get).toHaveBeenCalledWith(jasmine.objectContaining({
            qs: jasmine.objectContaining({
                per_page: '75',
            }),
        }));
    });

    it('returns a Promise that resolves with a list of countries', () => {
        request.get.and.returnValues(
            Promise.resolve([
                {total: '1'},
            ]),
            Promise.resolve([
                {
                    page: 1,
                    pages: 1,
                    per_page: '1',
                    total: '1',
                },
                [{
                    id: 'ABW',
                    iso2Code: 'AW',
                    name: 'Aruba',
                    longitude: '-70.0167',
                    latitude: '12.5167',
                }],
            ])
        );
        const result = PromiseMock.getResult(getHighIncomeCountries());
        expect(result).toEqual([
            {
                id: 'ABW',
                iso2Code: 'AW',
                name: 'Aruba',
                longitude: '-70.0167',
                latitude: '12.5167',
            },
        ]);
    });
});
