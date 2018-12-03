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

    let paths = new Map();
    paths.set(nums[0], 1);
    paths.set(-nums[0], (paths.get(-nums[0]) || 0) + 1);

    for (let i = 1; i < nums.length; i++) {
        let nextPaths = new Map();
        paths.forEach((value, path) => {
            nextPaths.set(path + nums[i], (nextPaths.get(path + nums[i]) || 0) + value);
            nextPaths.set(path - nums[i], (nextPaths.get(path - nums[i]) || 0) + value);
        });
        paths = nextPaths;
    }

    return paths.get(targetSum) || 0;
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
    {
        params: [[0,0,0,0,0,0,0,0,1], 1],
        ans: 256,
    }
];

tests.forEach(test => {
    let res = findTargetSumWays(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
