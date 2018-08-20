/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    // find intersection
    // 1. binary search
    // pick the smaller array, sort it - O(nlogn)
    // for every item in larger array, search smaller array using binary search - O(mlogn)
    // overall complexity nlogn (sorting) + mlogn (one binary search per element)
    // O(mnlog(min(m,n)) where n is smaller of the two

    function sort(arr) {
        // todo: crea
        return arr.sort();
    }

    function isNumInArr(num, arr) {

        // implement binary search to find an element
        // return true if element was found, false otherwise
        // add a hash table to skip duplicate elements
    }

    // sort smaller array
    let dict = {};
    let smaller = nums1.length < nums2.length ? nums1 : nums2;
    let larger = nums1.length > nums2.length ? nums1 : nums2;
    sort(smaller);
    let left = 0, right = smaller.length - 1;

    larger.forEach(item => {

    })
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
