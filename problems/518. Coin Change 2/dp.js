/*
Figure out how many ways exist to come up with a specific amount using only coins provided (infinite amount of coins)
Solution inspired by Knowledge Center
https://www.youtube.com/watch?v=Nvrhx4lbfLI

Build a 2-d DP table
Columns represent sums from 0 to desired amount
Rows represent coin types
First row stands for "no coins taken", for any amount over 0 dp value is 0 (there is no way to add up to any amount
    if you take no coins, but there is one way to make amount 0 with no coins - to take no coins)
First column is always 1 (there is one way to build sum 0 with any amount of coins - to take no coins)

Each value is calculated as sum of value above the current cell and value at index (sum - coin_type)
If coin type is larger than sum, replace it with 0

-- alternative solution: brute force --
Brute force would be to make a decision at each step:
1. Pop type from coin types. Take that coin away from sum. Recurse.
2. Skip last coin type, and recurse with fewer coin types.
If you have no more coin types, discard this path
If sum is less than 0, discard this path
If sum = 0, increment result counter, stop.

Return result counter.
Drawbacks: exponential time complexity, wasted re-calculations of same paths (dp table aims to solve this)

todo: build brute force recursive solution

Time complexity: O(n*m) where n = sum, m = number of coin types
Space complexity: O(n*m)
 */

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
let change = function(amount, coins) {
    const dp = [];
    // add special row for "no coins". It has 1 in first row and column, 0 everywhere else
    dp[0] = new Array(amount + 1).fill(0);
    dp[0][0] = 1;
    for (let coinType = 0; coinType <= coins.length; coinType++) {
        const coin = coinType + 1;
        dp[coin] = [1];
        for (let sum = 1; sum <= amount; sum++) {
            dp[coin][sum] = dp[coin - 1][sum] + (dp[coin][sum - coins[coinType]] || 0);
        }
    }

    return dp[dp.length - 1][dp[0].length - 1];
};

let tests = [
    {params: [5, [1,2,5]], ans: 4},
    {params: [3, [2]], ans: 0},
    {params: [10, [10]], ans: 1},
    {params: [500, [1,2,5]], ans: 12701},
];

tests.forEach(test => {
    let res = change(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
