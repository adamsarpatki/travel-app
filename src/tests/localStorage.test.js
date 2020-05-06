const { getItem } = require('../client/js/localStorage.js');

describe ('getItem', () => {
    it ('It gets HTML content from localStorage', () => {
        const htmlContent = "<div></div>"
        localStorage.setItem('travelApp.htmlContent', htmlContent);
        const result = getItem();
        expect(result).toEqual(htmlContent);
    })
})