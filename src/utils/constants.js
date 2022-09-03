const daysOfTheWeekMap = new Map([
   [0, "Monday"],
   [1, "Tuesday"],
   [2, "Wednesday"],
   [3, "Thursday"],
   [4, "Friday"],
   [5, "Saturday"],
   [6, "Sunday"],
]);

const importanceLevelMap = new Map([
    [0, "High"],
    [1, "Medium"],
    [2, "Low"],
]);

const getDaysOfTheWeekString = (input) => input.map((index) => daysOfTheWeekMap.get(index));
const getImportanceLevelString = (input) => importanceLevelMap.get(input);

export {
    getDaysOfTheWeekString,
    getImportanceLevelString
}