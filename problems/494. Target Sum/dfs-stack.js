/**
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
let findTargetSumWays = function(nums, targetSum) {
    function getNextValue(sum, index, mod = 1) {
        return {
            sum: sum + (nums[index] * mod),
            index: index + 1
        }
    }

    let paths = 0, stack = [];
    if (nums.length > 0) {
        stack.push(getNextValue(0, 0));
        stack.push(getNextValue(0, 0, -1));
    }

    while (stack.length > 0) {
        let {sum, index} = stack.pop();
        if (index < nums.length) {
            stack.push(getNextValue(sum, index));
            stack.push(getNextValue(sum, index, -1));
        } else if (sum === targetSum) {
            paths++;
        }
    }

    return paths;
};

let tests = [
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
