const getGdpForCountry = require('../../api/getGdpForCountry');
const request = require('request-promise-native');
const PromiseMock = require('promise-mock');

describe('getGdpForCountry()', () => {
    beforeAll(() => {
        PromiseMock.install();
    });

    afterAll(() => {
        PromiseMock.uninstall();
    });

    beforeEach(() => {
        spyOn(request, 'get');
    });

    it('calls request with the correct uri and options', () => {
        request.get.and.returnValue(Promise.resolve([]));
        getGdpForCountry('AW');
        expect(request.get).toHaveBeenCalledWith({
            uri: 'http://api.worldbank.org/countries/AW/indicators/NY.GDP.MKTP.CD',
            qs: {
                format: 'json',
                MRV: 1,
            },
            json: true,
        });
    });

    it('returns a Promise that resolves with null if the api gives no results', () => {
        request.get.and.returnValue(Promise.resolve([
            {
                page: 0,
                pages: 0,
                per_page: null,
                total: 0,
            },
            null,
        ]));
        const result = PromiseMock.getResult(getGdpForCountry('TW'));
        expect(result).toBeNull();
    });

    it('returns a Promise that resolves with the GDP if the api gives results', () => {
        request.get.and.returnValue(Promise.resolve([
            {
                page: 1,
                pages: 1,
                per_page: '50',
                total: 1,
            },
            [
                {
                    value: '11514605842.3369',
                },
            ],
        ]));
        const result = PromiseMock.getResult(getGdpForCountry('JG'));
        expect(result).toBe('11514605842.3369');
    });
});
