/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    // find intersection
    // 2. hash table
    // 1st array - hash with all values set to true
    // iterate over 2nd array, for every element present in hash, set hash to false, push to result
    // return result
    // complexity O(mn) for iterating over both arrays + O(1) for picking elements

    function makeHash(items) {
        let set = {};
        items.forEach(item => {
            set[item] = true;
        });
        return set;
    }

    let hash = makeHash(nums1);


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
