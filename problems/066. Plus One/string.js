/*
    String manipulation - join array into a number, add 1, split it back into items.
    Will not work with numbers too large for JS max integer.
 */
const compareArrays = require('../helper.js').compareArrays;
/**
 * @param {number[]} digits
 * @return {number[]}
 */
let plusOne = function(digits) {
    let num = 1 + Number(digits.join(''));
    let arr = ('' + num).split('');
    return arr.map(s => Number(s));
};

let tests = [
    { nums: [1,2,3] , ans: [1,2,4] },
    { nums: [4,3,2,1], ans: [4,3,2,2] },
    { nums: [9,9,9,9], ans: [1,0,0,0,0] },
];

tests.forEach(test => {
    let res = plusOne(test.nums);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
