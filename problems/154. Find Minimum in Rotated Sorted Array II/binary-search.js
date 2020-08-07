/*
Find smallest element in sorted rotated array that can contain duplicates

Use binary search algorithm to exclude parts of the input that are sorted
The whole idea: search till you have two elements left (left and right) and return smaller one
When mid = right, decrement right by one

Time complexity: O(log(n)) average, O(n) worst case
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let findMin = function(nums) {
    let left = 0, right = nums.length - 1;

    while (left + 1 < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid;
        } else if (nums[mid] < nums[left]) {
            right = mid;
        } else {
            right--;
        }
    }

    return Math.min(nums[left], nums[right]);
};

let tests = [
    { nums: [3,4,5,1,2] , ans: 1 },
    { nums: [4,5,6,7,0,1,2], ans: 0 },
    { nums: [1], ans: 1 },
    { nums: [5,1,2], ans: 1 },
    { nums: [1,3,5], ans: 1 },
    { nums: [2,2,2,0,1], ans: 0 },
    { nums: [2,2,2,2,2,3,4,5,6,1], ans: 1 },
    { nums: [4,1,4], ans: 1 },
    { nums: [3,3,1,2,3,3,3,3,3,3,3], ans: 1 },
    { nums: [3,3,1,3], ans: 1 },
];

tests.forEach(test => {
    let res = findMin(test.nums);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
