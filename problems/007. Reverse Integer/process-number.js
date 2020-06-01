/*
Reverse number by saving remainder of the number via deleting it by 10
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
        const max = '02147483647'; // last digit is 7 for positive, 8 for negative
        // skip 1st string because it is 0 or -, but we know it thanks to arguments
        if (string.length > 11) { // guaranteed to overflow
            return true;
        }
        for (let i = 1; i < max.length - 1; i++) {
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

    let negative = x < 0;
    x = Math.abs(x);
    let reversed = negative ? '-' : '0';
    while (x > 0) {
        reversed += x % 10;
        x = Math.floor(x / 10);
        if (reversed.length === 11) {
            if (isOverflowing(reversed, negative)) {
                return 0;
            }
        }
    }
    return parseInt(reversed);
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
