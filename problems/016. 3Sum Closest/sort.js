/*
Find sum of 3 elements of inputs that, when added up, are closest to target among all possible variants
Sort elements and then, starting at each point, move either left or right pointer towards each other to find best match

Time complexity: O(n^2)
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);
    let bestMatch = Infinity;
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum === target) {
                return sum;
            }
            if (Math.abs(sum - target) < Math.abs(bestMatch)) {
                bestMatch = sum - target;
            }
            if (sum > target) {
                right--;
            } else {
                left++;
            }
        }
    }
    return bestMatch + target;
};

let tests = [
    {params: [[1,1,-1,-1,3], 3], ans: 3},
    {params: [[1,1,1,0], -100], ans: 2},
    {params: [[-1,2,1,-4], 1], ans: 2},
];

tests.forEach(test => {
    let res = threeSumClosest(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
