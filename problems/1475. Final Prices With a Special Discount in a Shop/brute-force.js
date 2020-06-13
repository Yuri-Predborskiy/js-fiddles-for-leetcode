/*
Calculate final price of each item applying special discount, if possible.
Look ahead and see whether there is a smaller price ahead

Time complexity: O(n^2)
Space complexity: O(1)
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number[]} prices
 * @return {number[]}
 */
let finalPrices = function(prices) {
    let results = [];
    for (let i = 0; i < prices.length; i++) {
        results[i] = prices[i];
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[j] <= prices[i]) {
                results[i] = prices[i] - prices[j];
                break;
            }
        }
    }
    return results;
};

let tests = [
    {params: [[8,4,6,2,3]], ans: [4,2,4,2,3]},
    {params: [[1,2,3,4,5]], ans: [1,2,3,4,5]},
    {params: [[10,1,1,6]], ans: [9,0,1,6]},
];

tests.forEach(test => {
    let res = finalPrices(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
