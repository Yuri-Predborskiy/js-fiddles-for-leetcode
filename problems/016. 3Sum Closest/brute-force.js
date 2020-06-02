/*
Find sum of 3 elements of inputs that, when added up, are closest to target among all possible variants
Brute force: find all possible combinations and return the one closest to target

Time complexity: O(n^3)
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let threeSumClosest = function(nums, target) {
    let closest = Infinity;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                let sum = nums[i] + nums[j] + nums[k];
                if (Math.abs(sum - target) < Math.abs(closest)) {
                    closest = sum - target;
                }
            }
        }
    }
    return closest + target;
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
