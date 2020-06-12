/*
Divide two integers
Brute force solution
Keep subtracting one divisor from dividend as long as possible, increment quotient every time

Solution can be optimized

Time complexity: O(n) where n = quotient
Space complexity: O(1)
 */

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
let divide = function(dividend, divisor) {
    // check for edge case which would cause overflow
    if (dividend === -2147483648 && divisor === -1) {
        return 2147483647;
    }

    let sign = (dividend < 0) ^ (divisor < 0) ? -1 : 1;
    let quotient = 0;
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);

    while (dividend >= divisor) {
        quotient++;
        dividend -= divisor;
    }

    return sign === -1 ? -quotient : quotient;
};

let tests = [
    {params: [10, 3], ans: 3},
    {params: [7, -3], ans: -2},
    {params: [1, 2], ans: 0},
    {params: [2, 2], ans: 1},
];

tests.forEach(test => {
    let res = divide(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
