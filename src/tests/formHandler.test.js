const { generateHTML } = require('../client/js/formHandler.js');

describe('formHandler', () => {
    const testData = {
        imageURL: 'validurl',
        location: 'Amsterdam',
        country: 'the Netherlands',
        departure: '2020-05-20',
        days: '3',
        weather: { high: 18, low: 5, general: 'Intermittent clouds' }
    }
    let result = "";

    beforeEach(() => {
        result = generateHTML(testData);    
    });

    it('HTML contains image URL', () => {
        expect(result).toMatch(/.*img src=\"validurl\"*/)
    })

    it('Location is present', () => {
        expect(result).toMatch(/.*My trip to Amsterdam*/)
    })

    it('Country is present', () => {
        expect(result).toMatch(/.*the Netherlands*/)
    })

    it('Departure date is set', () => {
        expect(result).toMatch(/.*Departing at 2020-05-20*/)
    })

    it('Remaining days until trip is valid', () => {
        expect(result).toMatch(/.*This journey is 3 days away.*/)
    })

    it('Temperature min/max is set', () => {
        expect(result).toMatch(/.*High: 18. Low: 5.*/)
    })

    it('General weather info is present', () => {
        expect(result).toMatch(/.*Intermittent clouds*/)
    })
})