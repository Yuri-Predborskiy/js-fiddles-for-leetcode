/*
Calculate n-th ugly number

DP solution - calculate all ugly numbers up to n, return n-th number
Move respective pointers when next number is generated (move all pointers that match current number)

Time complexity: O(n)
Space complexity: O(n) since we store all numbers up to n

Solution inspired by the following discussion:
https://leetcode.com/problems/ugly-number-ii/discuss/69364/
 */

/**
 * @param {number} n
 * @return {number}
 */
let nthUglyNumber = function(n) {
    let index2 = 0, index3 = 0, index5 = 0;
    const dp = [1];
    for (let i = 1; i < n ; i++) {
        let val2 = dp[index2] * 2;
        let val3 = dp[index3] * 3;
        let val5 = dp[index5] * 5;
        let min = Math.min(val2, val3, val5);
        dp[i] = min;
        if (val2 === min) {
            index2++;
        }
        if (val3 === min) {
            index3++;
        }
        if (val5 === min) {
            index5++;
        }
    }
    return dp[n - 1];
};

let tests = [
    {params: [10], ans: 12},
    {params: [1], ans: 1},
    {params: [574], ans: 1953125},
    {params: [1690], ans: 2123366400},
];

tests.forEach(test => {
    let res = nthUglyNumber(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
