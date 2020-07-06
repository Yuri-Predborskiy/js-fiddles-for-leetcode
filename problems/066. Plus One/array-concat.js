/*
Input array contains integer spread into individual digits, add 1 to that integer

Solution using a single-pass loop
Starting at the back, if any digit is not 9, add 1 to it and return array
If any digit is 9, set it to 0 and move to next digit
This way once we hit a non-9 digit, we'll increase it by 1 and return
If all digits are 9s, we will add 1 at the start of the array using [1].concat(digits)
This solution was significantly faster on LC compared to digits.unshift(1)

Time complexity: O(n)
Space complexity: O(1)
 */

const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number[]} digits
 * @return {number[]}
 */
let plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    return [1].concat(digits);
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
