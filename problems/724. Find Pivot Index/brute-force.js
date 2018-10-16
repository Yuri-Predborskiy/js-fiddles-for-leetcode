/*
    Brute force approach. Slow but works. Time limit exceeded in LeetCode.
    Time complexity: O(n^2)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
let pivotIndex = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let leftSum =  nums.reduce((sum, item, index) => index <= i ? sum + item : sum);
        let rightSum = nums.reduceRight((sum, item, index) => index >= i ? sum + item : sum);
        if (rightSum === leftSum) {
            return i;
        }
    }

    return -1;
};

let tests = [
    { nums: [1, 7, 3, 6, 5, 6] , ans: 3 },
    { nums: [1, 2, 3], ans: -1 },
    { nums: [1,2,3,3], ans: 2 },
    { nums: [1,2,3,4], ans: -1 },
    { nums: [-1,-1,-1,-1,0,1], ans: 1 },
    { nums: [-1,-1,-1,0,1,1], ans: 0, },
    { nums: [-1,-1,0,1,0,-1], ans: 4 },
    { nums: [-1,-1,1,-1,-1,0], ans: 1 },
];

tests.forEach(test => {
    let res = pivotIndex(test.nums);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
