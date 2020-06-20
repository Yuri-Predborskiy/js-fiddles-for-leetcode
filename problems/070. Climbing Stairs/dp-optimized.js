/*
Calculate number of ways to solve a problem

Use dynamic programming, top down approach
Optimizations:
pre-defined numbers for a few base cases (numbers match fibonacci sequence)
This way we never reach negative steps and exit early.

Time complexity: O(n) thanks to memoization (we do not re-calculate steps)
Space complexity: O(n)
 */

/**
 * @param {number} n
 * @return {number}
 */
let climbStairs = function(n) {
    function climb(n) {
        if (typeof dp[n] === 'undefined') {
            dp[n] = climb(n - 1) + climb(n - 2);
        }
        return dp[n];
    }
    const dp = [1, 1, 2, 3, 5, 8, 13];
    return climb(n);
};

let tests = [
    {params: [1], ans: 1},
    {params: [2], ans: 2},
    {params: [3], ans: 3},
    {params: [4], ans: 5},
];

tests.forEach(test => {
    let res = climbStairs(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
