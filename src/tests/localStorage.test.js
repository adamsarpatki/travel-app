const { getItem } = require('../client/js/localStorage.js');

describe ('getItem', () => {
    it ('blabla', () => {
        localStorage.setItem('travelApp.htmlContent', 'kacsa');
        const result = getItem();
        expect(result).toEqual("kacsa");
    })
})