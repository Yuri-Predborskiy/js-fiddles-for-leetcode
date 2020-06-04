/*
Solution based on shifting bits of divisor
Shifting bits of divisor by 1 bit to the left is the same as multiplying it by 2
Find the biggest shift we can do at each step and subtract it from divisor, add "power" to quotient
Repeat till divisor becomes bigger than dividend

Time complexity: O(log(n))
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
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);

    let quotient = 0;
    while (dividend >= divisor) {
        let doubles = 0;
        let accDivisor = divisor;
        while (accDivisor <= dividend - accDivisor - accDivisor) {
            doubles++;
            accDivisor <<= 1;
        }
        dividend -= accDivisor;
        quotient += (1 << doubles);
    }

    return sign === -1 ? -quotient : quotient;
};

let tests = [
    {params: [10, 3], ans: 3},
    {params: [7, -3], ans: -2},
    {params: [1, 2], ans: 0},
    {params: [2, 2], ans: 1},
    {params: [200, 2], ans: 100},
    {params: [200, -2], ans: -100},
    {params: [203, -2], ans: -101},
    {params: [2147483647, 2], ans: 1073741823},
    {params: [-2147483648, 2], ans: -1073741824},
];

tests.forEach(test => {
    let res = divide(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
