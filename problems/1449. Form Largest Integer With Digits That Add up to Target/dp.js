// todo: improve solution

/**
 * @param {number[]} cost
 * @param {number} target
 * @return {string}
 */
let largestNumber = function(cost, target) {
    const items = [];
    const dp = [];
    const foundItems = new Set();
    for (let i = cost.length - 1; i >= 0; i--) {
        if (!foundItems.has(cost[i])) {
            foundItems.add(cost[i]);
            items.push({cost: cost[i], digit: i + 1});
        }
    }

    for (let currentCost = 0; currentCost <= target; currentCost++) {
        dp[currentCost] = dp[currentCost] || {items: [], total: 0};
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            if (items[itemIndex].cost <= currentCost) {
                const prev = dp[currentCost - items[itemIndex].cost];
                if (prev.total + items[itemIndex].cost !== currentCost) {
                    continue;
                }
                if (dp[currentCost].items.length < prev.items.length + 1) {
                    dp[currentCost] = {
                        items: prev.items.slice(),
                        total: prev.total + items[itemIndex].cost
                    };
                    dp[currentCost].items.push(items[itemIndex]);
                }
            }
        }
    }
    return dp[target].items.sort((a, b) => b.digit - a.digit).map(x => x.digit).join('') || '0';
};

const tests = [
    {params: [[5,6,7,3,4,6,7,4,8], 29], ans: '884444444'},
    {params: [[4,3,2,5,6,7,2,5,5], 9], ans: '7772'},
    {params: [[7,6,5,5,5,6,8,7,8], 12], ans: '85'},
    {params: [[2,4,6,2,4,6,4,4,4], 5], ans: '0'},
    {params: [[6,10,15,40,40,40,40,40,40], 47], ans: '32211'},
];

for (let test of tests) {
    const res = largestNumber(...test.params);
    const correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
