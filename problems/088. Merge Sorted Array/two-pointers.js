/*
Merge sorted arrays in-place
Given two sorted arrays, where first one has enough buffer to accept values from both arrays and sizes of filled cells
    in both of the arrays, combine arrays in place in sorted manner

Two pointers solution
Looking at last element in each array, copy bigger value into empty space of 1st array, move pointer
Repeat till right pointer is exhausted (left elements are in place already)

Time complexity: O(n) where n = size of the first array (including buffer)
Space complexity: O(1)
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
let merge = function(nums1, m, nums2, n) {
    let left = m - 1, right = n - 1, write = nums1.length - 1;
    while (right >= 0) {
        if (nums1[left] > nums2[right]) {
            nums1[write] = nums1[left];
            left--;
        } else {
            nums1[write] = nums2[right];
            right--;
        }
        write--;
    }
};

let tests = [
    {params: [[1,2,3,0,0,0],3,[2,5,6],3], ans: [1,2,2,3,5,6]},
    {params: [[0],0,[1],1], ans: [1]},
];

tests.forEach(test => {
    merge(...test.params);
    let res = test.params[0];
    let correct = compareArraysStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
