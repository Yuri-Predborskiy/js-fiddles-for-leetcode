/*
Write a function that converts string into number, without overflowing 32-bit signed int memory size

Skip white space at the start, if present
Parse first symbol if it is a sign
Parse all digits after white space and sign (+ or -)
Return max number without causing overflow if string number is too large (same with min number)
Return 0 if no digits are found directly after write space and/or sign symbol

Time complexity: O(n) where n - number of digits in the number
Space complexity: O(n)
 */

/**
 * @param {string} str
 * @return {number}
 */
let myAtoi = function(str) {
    const digits = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9};
    const maxNumber = 214748364;
    let isNegative = false;

    let index = 0;
    while (str[index] === ' ') {
        index++;
    }
    if (str[index] === '+') {
        index++;
    } else if (str[index] === '-') {
        isNegative = true;
        index++;
    }

    let number = 0;
    let digit = digits[str[index++]];
    while (number < maxNumber && typeof digit !== 'undefined') {
        number = number * 10 + digit;
        digit = digits[str[index++]];
    }
    // prevent overflow
    if (typeof digit !== 'undefined') {
        if (number < maxNumber) {
            return number * 10 + digit * (isNegative ? -1 : 1);
        } else if (number === maxNumber) {
            if (isNegative) {
                if (digit >= 8) {
                    return -2147483648;
                } else {
                    return -(number * 10 + digit);
                }
            } else {
                if (digit >= 7) {
                    return 2147483647;
                } else {
                    return number * 10 + digit;
                }
            }
        } else { // number > maxNumber and digit exists = overflow, return max number
            return (maxNumber * 10 + (isNegative ? 8 : 7)) * (isNegative ? -1 : 1);
        }
    }

    return number * (isNegative ? -1 : 1);
};

let tests = [
    {params: ['42'], ans: 42},
    {params: ['   -42'], ans: -42},
    {params: ['4193 with words'], ans: 4193},
    {params: ['words and 987'], ans: 0},
    {params: ['-91283472332'], ans: -2147483648},
    {params: ['-2147483647'], ans: -2147483647},
];

tests.forEach(test => {
    let res = myAtoi(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
