const { dateDiffInDays } = require('../server/helper.js');

describe ('dateDiffInDays', () => {
    it ('Computes date difference correctly', () => {
        const date1 = new Date(2020, 1, 5);
        const date2 = new Date(2020, 1, 11);
        expect(dateDiffInDays(date1, date2)).toEqual(6)
    })
})