/*
Figure out the state of the array after N steps having initial state
Array changes at every step according to simple rules. These rules are such that states will repeat

This problem can be expressed as a recursive problem where solving the problem for step N
    requires state of the input at step N - 1
Since after a certain step the results will start repeating, it makes sense to memorize them
Which makes it possible to solve this problem using Dynamic Programming

First, calculate all possible scenarios that do not repeat and save them to DP table (map)
Early exit: if answer is found before the answers start repeating, return answer
Once steps start repeating, break out of the cycle
Next, calculate the new N (modulo of N divided by number of unique cell states)
Then simply iterate over the map of repeating results till you find new desired step
Edge case: if N is 0, set N to number of combinations (we want the last combo)

Time complexity: O(n) if we don't enter a loop, O(1) if N was greater than loop length
Space complexity: O(m) where m - number of unique combinations of cells
Space complexity can be expressed as O(1) because there is a limited number of unique cell states (14 in this problem)
    which does not depend on inputs

General idea was inspired by the following discussion:
https://leetcode.com/problems/prison-cells-after-n-days/discuss/334367/
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
    const map = new Map();
    let dayCells = cells.slice();
    dayCells[0] = 0;
    dayCells[cells.length - 1] = 0;
    let day = 0;
    for (let i = 1; i < cells.length; i++) {
        dayCells[i] = cells[i - 1] === cells[i + 1] ? 1 : 0;
    }
    let nextDayCells = dayCells.slice();
    const day0string = dayCells.join('');

    while (++day < N) {
        let key = dayCells.join('');
        if (map.has(key)) {
            break;
        }
        for (let i = 1; i < cells.length; i++) {
            nextDayCells[i] = dayCells[i - 1] === dayCells[i + 1] ? 1 : 0;
        }
        map.set(key, nextDayCells.join(''));
        dayCells = nextDayCells.slice();
    }

    if (day === N) {
        return dayCells;
    }

    N = N % map.size;
    if (N === 0) {
        N = map.size;
    }
    let tomorrowCells = day0string;
    for (let i = 1; i < N ; i++) {
        tomorrowCells = map.get(tomorrowCells);
    }
    return tomorrowCells.split('').map(s => parseInt(s, 10));
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
