/*
Reverse number by parsing it as a string and then adding one number at a time from the end to an array
If string is long enough, check for overflow. If it overflows, return 0
Parse integer and return it

Time complexity: O(n) where n - number of digits in the number
Space complexity: O(n)
 */

/**
 * @param {number} x
 * @return {number}
 */
let reverse = function(x) {
    /**
     * Check if number in the string overflows the boundaries of 32-bit signed int
     * @param string {string}
     * @param isNegative {boolean}
     * @returns {boolean}
     */
    function isOverflowing(string, isNegative) {
        const max = '2147483647'; // last digit is 7 for positive, 8 for negative
        // skip 1st string because it is 0 or -, but we know it thanks to arguments
        if (string.length > 10) {
            return true;
        }
        for (let i = 0; i < max.length - 1; i++) {
            const charCode = string.charCodeAt(i);
            const maxCharCode = max.charCodeAt(i);
            if (charCode < maxCharCode) {
                return false;
            } else if (charCode > maxCharCode) {
                return true;
            }
        }

        if (isNegative) {
            if (string.charCodeAt(string.length - 1) > '8'.charCodeAt(0)) {
                return true;
            }
        } else {
            if (string.charCodeAt(string.length - 1) > '7'.charCodeAt(0)) {
                return true;
            }
        }
        return false;
    }

    let isNegative = x < 0;
    const string = '' + Math.abs(x);
    const reversed = [];
    for (let i = string.length - 1; i >= 0; i--) {
        reversed.push(string[i]);
    }
    if (reversed.length >= 10) {
        if (isOverflowing(reversed.join(''), isNegative)) {
            return 0;
        }
    }
    return parseInt(reversed.join('')) * (isNegative ? -1 : 1);
};

let tests = [
    {params: [123], ans: 321},
    {params: [-123], ans: -321},
    {params: [2147483647], ans: 0},
    {params: [-2147483648], ans: 0},
    {params: [7463847412], ans: 2147483647},
    {params: [-8463847412], ans: -2147483648},
];

tests.forEach(test => {
    let res = reverse(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
