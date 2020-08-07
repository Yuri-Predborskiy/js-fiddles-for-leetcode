/*
Find minimum in Rotated Sorted Array II (contains duplicate numbers)
Basically, find the first item

Solution by finding a target, where target is the smallest element in the array
Using binary search to search for the start of the array (or any element that is the same as start)
We look at mid and compare it to the next element
If mid is the same as next element, look right till you find a different element (or index = right)
If num at mid is larger than num at index, return num at index (target found)
If num at index is larger than num at right, move left pointer to index (target is between index and right)
If num at index is smaller than num at right, move right pointer to mid (target is between left and mid)

Time complexity: O(log(n)) average, O(n) worst case (all numbers are duplicates, we will end up checking all numbers)
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    if (nums[left] < nums[right]) {
        return nums[left];
    }
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        let index = mid + 1;
        while (index < right && nums[mid] === nums[index]) {
            index++;
        }
        if (nums[mid] > nums[index]) {
            return nums[index];
        }
        if (nums[index] > nums[right]) {
            left = index;
        } else {
            right = mid;
        }
    }
    return nums[left];
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
