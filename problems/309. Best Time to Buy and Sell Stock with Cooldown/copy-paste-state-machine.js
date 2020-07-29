/*
Best time to buy and sell stocks with cooldown

State machine solution
Solution copied from discussions:
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/discuss/75928/
Basic idea is to check which action will bring the most profit:
- buy now to sell later
- sell now and wait
- hold your purchase to sell later
Solution approach is to use state machine
Come was simplified into oblivion for the sake of brevity
None of the explanations do a good job in writing in plain English, so solution was simply copied

The idea was supposed to be to figure out what is the most profitable action at each point
But at some point we started subtracting current price from previous state
No explanation was given to this behavior, everyone just copied each other.

Brute force would require going from each point to see max possible profit if we bought at that point and
    held on forever
And then calculating the best possible combination of buying and waiting
But this solution would be horribly inefficient

TODO: write inefficient human-readable brute-force solution

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function(prices) {
    let sell = 0, hold = -Infinity, rest = 0;
    for (let price of prices) {
        hold = Math.max(hold, rest - price);
        rest = Math.max(rest, sell);
        sell = hold + price;
    }
    return Math.max(sell, rest);
};

let tests = [
    { params: [[1,2,3,0,2]], ans: 3 },
    { params: [[2,1]], ans: 0 },
];

tests.forEach(test => {
    let res = maxProfit(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
