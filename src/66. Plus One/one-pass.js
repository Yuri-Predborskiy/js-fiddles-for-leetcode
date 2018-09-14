/*
    One pass solution - go over the array and increase the last number by 1.
    If a number overflows (becomes 10), replace it with 0 and increase next number.
    If after finishing iterating over the array we still have a remainder, unshift array.
 */
const compareArrays = require('../helper.js').compareArrays;
/**
 * @param {number[]} digits
 * @return {number[]}
 */
let plusOne = function(digits) {
    let remainder = 1;
    for (let i = digits.length - 1; i >= 0; i--) {
        if (remainder > 0) {
            ++digits[i];
            --remainder;
            if (digits[i] >= 10) {
                digits[i] = 0;
                ++remainder;
            }
        } else {
            return digits;
        }
    }
    if (remainder > 0) {
        digits.unshift(remainder);
    }
    return digits;
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
