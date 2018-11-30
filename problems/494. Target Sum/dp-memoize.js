/*
    Dynamic programming with memoization
    idea: memorize the number of paths that leads to a certain number at certain index
    initially we have 1 path to nums[0] and 1 path to -nums[0]
 */
/**
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
let findTargetSumWays = function(nums, targetSum) {
    let max = 1000; // task limit - sum of all elements cannot exceed this number
    if (targetSum > max) return 0;

    // the sum of all numbers is either odd or even, regardless of operation (add or subtract)
    // target is odd and sum is even (or vice versa), we will have 0 results
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    if (targetSum % 2 !== total % 2) return 0;

    let memo = {};
    memo[nums[0]] = 1;
    memo[-nums[0]] = (memo[-nums[0]] + 1) || 1; // NaN is false

    // number of paths to reach a certain sum. sum = index
    let nPathsToSum = new Array(max * 2 + 1).fill(0);
    nPathsToSum[ nums[0] + max] += 1;
    nPathsToSum[-nums[0] + max] += 1;

    for (let i = 1; i < nums.length; i++) {
        // let nextMemo = {};
        let next = new Array(max * 2 + 1).fill(0);
        for (let sum = 0; sum < max * 2; sum++) {
            if (nPathsToSum[sum] > 0) {
                next[sum + nums[i]] += nPathsToSum[sum];
                next[sum - nums[i]] += nPathsToSum[sum];
            }
        }
        nPathsToSum = next;
        // memo = nextMemo;
    }

    for (let i = 0; i < nPathsToSum.length; i++) {
        if (nPathsToSum[i] !== 0) {
            console.log(`nPathsToSum[${i}] = ${nPathsToSum[i]}`);
        }
    }
    return nPathsToSum[targetSum + max];
};

let tests = [
    {
        params: [[1, 1, 1, 1, 1], 4],
        ans: 0,
    },
    {
        params: [[1, 1, 1, 1, 1], 3],
        ans: 5,
    },
    {
        params: [[1, 1, 1, 1, 1], 5],
        ans: 1,
    },
];

tests.forEach(test => {
    let res = findTargetSumWays(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
