// Function to get the difference between current date and the travel date
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// currentDate and targetDate are javascript Date objects
function dateDiffInDays(currentDate, targetDate) {
  const utc1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const utc2 = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

module.exports = { dateDiffInDays }