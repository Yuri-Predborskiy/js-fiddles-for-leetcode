// calculate best times to buy and sell stocks, AKA maximum potential profit

/**
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function(prices) {
    let buyPrice = Infinity;
    let profit = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < prices[i - 1]) {
            profit += prices[i - 1] - buyPrice;
            buyPrice = prices[i];
        }
        if (prices[i] < buyPrice) {
            buyPrice = prices[i];
        }
    }
    if (prices[prices.length - 1] > buyPrice) {
        profit += prices[prices.length - 1] - buyPrice;
    }
    return profit;
};

let tests = [
    {
        params: [[7,1,5,3,6,4]],
        ans: 7,
    },
    {
        params: [[1,2,3,4,5]],
        ans: 4,
    },
    {
        params: [[7,6,4,3,1]],
        ans: 0,
    },
];

tests.forEach(test => {
    let res = maxProfit(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
