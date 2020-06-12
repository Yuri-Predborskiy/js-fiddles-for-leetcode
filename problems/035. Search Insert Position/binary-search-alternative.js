/*
Find target or index where you'd insert target to keep the sorted order of the array
Using overlapping indexes we can solve this problem without doing any extra checks.
If target is not found in the array, index we want is left
This is because left will always point at an element that is right after the largest element smaller than target
If left was pointing at value less than target and right was the same, we will move left to next index
If right was pointing at the value greater than target and left was the same, we will move right to previous index

Because of this left will always point at an index right after target, if target is not present.
Because of this no extra checks are necessary, we can return left index.

We can add extra optimizations at the start:
- check if target is greater than the last value
- check if target is smaller than the first value
These will allow early exit for edge cases.

Time complexity: O(log(n))
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1;
    if (target > nums[right]) {
        return nums.length;
    }
    if (target < nums[left]) {
        return 0;
    }
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
};

let tests = [
    {params: [[1,3,5,6], 5], ans: 2},
    {params: [[1,3,5,6], 2], ans: 1},
    {params: [[1,3,5,6], 7], ans: 4},
    {params: [[1,3,5,6], 0], ans: 0},
];

tests.forEach(test => {
    let res = searchInsert(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
