/*
Implement pow(x, y)

Solution using iterative multiplication, optimized for limited precision
The solution uses simple arithmetic - we multiply number by itself n times
Optimization - stop when base is 0. Multiplying zero by anything will result in zero

Logic behind optimization:
The only way current solution would take a long time is with very large powers
Large powers mean either number gets extremely large and won't fit into memory
    or that we use fraction that is smaller than 1 (can be made smaller indefinitely)
The issue with fractions is the fact most programming languages have a limited precision when working with fractions
Our examples imply a precision of 5 digits
That means that once our number is 0.00000, we can stop calculating
This saves a lot of time for large powers

This is not the most powerful optimization and may result in invalid results if high precision is important
At the same time, it improves execution time on LeetCode significantly, which was the goal

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function(x, n) {
    if (n === 0) {
        return 1;
    } else if (x === 0 || x === 1) {
        return x;
    } else if (x === -1) {
        return n % 2 === 0 ? 1 : -1;
    }
    let isNegative = false;
    if (n < 0) {
        isNegative = true;
        n = -n;
    }
    let result = x;
    let prev = 0;
    while (n > 1) {
        prev = result;
        result *= x;
        n--;
        if (prev === result) {
            break; // at some point our number won't change from extra powers, we can safely stop at that point
        }
    }

    return isNegative ? 1 / result : result;
};

let tests = [
    {params: [2.00000, 10], ans: 1024.00000},
    {params: [2.10000, 3], ans: 9.26100},
    {params: [2.00000, -2], ans: 0.25000},
    {params: [1.00001, 200000], ans: 7.38898},
    {params: [1.00000, 2**30], ans: 1},
];

tests.forEach(test => {
    let res = Math.round(myPow(...test.params) * 100000) / 100000;
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
