/*
Calculate number of ways to solve a problem

Use recursion and memoization (dynamic programming)
At each step we move one or two steps down from the top
If we reached the goal, increment number of ways to reach this step (dp) by 1
If we stepped too far, do not count

Time complexity: O(n) thanks to memoization (we do not re-calculate steps)
Space complexity: O(n)
 */

/**
 * @param {number} n
 * @return {number}
 */
let climbStairs = function(n) {
    function climb(n) {
        if (n === 0) {
            return 1;
        } else if (n < 0) {
            return 0;
        }
        if (typeof dp[n] === 'undefined') {
            dp[n] = climb(n - 1) + climb(n - 2)
        }
        return dp[n];
    }
    const dp = [];
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
