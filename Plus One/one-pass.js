/*
    One pass brute force - find largest and second largest element
    If Math.floor(largest) / 2 >= 2nd largest, return largest element index, otherwise return -1
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
];

tests.forEach(test => {
    let res = plusOne(test.nums);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
