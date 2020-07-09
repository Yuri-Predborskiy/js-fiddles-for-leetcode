/*
Write grey code sequence for a specified number of bits

Solution using Wikipedia algorithm on splitting the existing array of numbers and
    adding 0 at the start of original numbers in original order
    adding 1 at the start of original numbers in reversed order
Wikipedia article about gray code:
https://en.wikipedia.org/wiki/Gray_code

Original simplified solution using simple math
Take current row of numbers (starting with 0)
Calculate 2 to the power of current index (1..n)
Add resulting number to every existing number in reverse order
Basically, skip first part of the algorithm - adding 0 bit to existing numbers, since they will repeat
Only perform second part - adding 1 to each number in reverse order (the mirrored part)

Time complexity: O(2^n) this is the number of calculations we will need to perform
Space complexity: O(2^n) this is the number of results we will have
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number} n
 * @return {number[]}
 */
let grayCode = function(n) {
    const results = [0];
    for (let i = 0; i < n; i++) {
        const len = results.length;
        const pow = Math.pow(2, i);
        for (let j = 0; j < len; j++) {
            results[len + j] = results[len - j - 1] + pow;
        }
    }
    return results;
};

let tests = [
    {params: [0], ans: [0]},
    {params: [1], ans: [0,1]},
    {params: [2], ans: [0,1,3,2]},
    {params: [3], ans: [0,1,3,2,6,7,5,4]},
    {params: [4], ans: [0,1,3,2,6,7,5,4,12,13,15,14,10,11,9,8]},
];

tests.forEach(test => {
    let res = grayCode(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
