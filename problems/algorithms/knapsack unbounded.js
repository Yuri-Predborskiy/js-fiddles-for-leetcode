/*
Knapsack unbounded problem solution
You can fill the sack with any number of repeating items, aiming to maximize value within limited weight
You cannot shard items, but you can insert any number of them
 */
let knapsackUnbounded = function(weightLimit, values, weights) {
    const dp = new Array(weightLimit + 1).fill(0);
    for (let i = 0; i <= weightLimit; i++) {
        for (let j = 0; j < weights.length; j++) {
            if (weights[j] <= i) {
                dp[i] = Math.max(dp[i], dp[i - weights[j]] + values[j]);
            }
        }
    }
    return dp[weightLimit];
};

const testsKnapsack = [
    {inputs: [11, [140, 400], [4, 5]], output: 960},
    {inputs: [8, [10, 40, 50, 70], [7, 3, 4, 5]], output: 110},
    {inputs: [100, [1, 30], [1, 50]], output: 100},
];

for (let i = 0; i < testsKnapsack.length; i++) {
    const {inputs, output} = testsKnapsack[i];
    const res = knapsackUnbounded(...inputs);
    const correct = res === output;
    console.log(`test ${i}, calculated ${res}, expected ${output}, answer is ${correct ? 'CORRECT' : 'WRONG!!!'}`);
}
