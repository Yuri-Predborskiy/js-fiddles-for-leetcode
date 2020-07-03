/*
Figure out the state of the array after N steps having initial state
Array changes at every step according to simple rules. These rules are such that states will repeat

Optimized solution based on knowledge that there is exactly 14 unique states of cells
If N % 14 is 0, set it to 14 (we want state number 14, not zero-th state)

Time complexity: O(1) because it doesn't grow beyond N = 14
Space complexity: O(1) because it does not grow beyond N = 14
 */

const {
    compareArraysStrict
} = require('../helper');

/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
let prisonAfterNDays = function(cells, N) {
    N = N % 14 === 0 ? 14 : N % 14;
    let dayCells = cells.slice();
    for (let day = 0; day < N; day++) {
        for (let i = 0; i < cells.length; i++) {
            dayCells[i] = cells[i - 1] === cells[i + 1] ? 1 : 0;
        }
        cells = dayCells.slice();
    }
    return cells;
};

let tests = [
    {params: [[0,1,0,1,1,0,0,1], 7], ans: [0,0,1,1,0,0,0,0]},
    {params: [[1,0,0,1,0,0,1,0], 1000000000], ans: [0,0,1,1,1,1,1,0]},
    {params: [[0,0,0,1,1,0,1,0], 574], ans: [0,0,0,1,1,0,1,0]},
];

tests.forEach(test => {
    let res = prisonAfterNDays(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
