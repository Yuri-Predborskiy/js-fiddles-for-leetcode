/*
Calculate number of ways to solve a problem

Use fibonacci sequence calculation
Current number is the sum of the last two numbers
Last number is kept in memory
Next number is sum of last and current
Swapping and addition is performed via destructuring
Classic approach would be:
temp = last; last = current; current += temp;

Time complexity: O(n), bottom up loop
Space complexity: O(1)
 */

/**
 * @param {number} n
 * @return {number}
 */
let climbStairs = function(n) {
    let last = 0, current = 1;
    while (n-- > 0) {
        [last, current] = [current, current + last];
    }
    return current;
};

let tests = [
    {params: [1], ans: 1},
    {params: [2], ans: 2},
    {params: [3], ans: 3},
    {params: [4], ans: 5},
    {params: [5], ans: 8},
    {params: [6], ans: 13},
];

tests.forEach(test => {
    let res = climbStairs(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
