const {compareArrays} = require('../helper');

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
let dailyTemperatures = function(temperatures) {
    let results = new Array(temperatures.length).fill(0), tempStack = [];
    for (let i = 0; i < temperatures.length; i++) {
        while (tempStack.length > 0 && temperatures[i] > tempStack[tempStack.length - 1].temp) {
            let item = tempStack.pop();
            results[item.index] = i - item.index;
        }
        tempStack.push({
            temp: temperatures[i],
            index: i,
        });
    }
    return results;
};

let tests = [
    { params: [[73, 74, 75, 71, 69, 72, 76, 73]], ans: [1, 1, 4, 2, 1, 1, 0, 0] },
];

tests.forEach(test => {
    let res = dailyTemperatures(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
