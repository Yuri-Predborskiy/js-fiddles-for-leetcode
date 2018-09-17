// 4. Median of Two Sorted Arrays
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
let findMedianSortedArrays = function(nums1, nums2) {
    // new algorithm, memory inefficient but faster
    // idea - push half of elements into array, return last element
    // or half of sum of last two elements (if number of elements is even)
    let total = nums1.length + nums2.length;
    log('inputs', nums1, nums2);
    log('total is', total);

    let left = 0, right = 0, res = [];
    for (let i = 0; i <= Math.floor(total / 2); i++) {
        if (left === nums1.length || nums1[left] > nums2[right]) {
            log('adding right', right);
            res[i] = nums2[right++];
        } else {
            log('adding left', left);
            res[i] = nums1[left++];
        }
    }

    return total % 2 === 0 ? (res[res.length - 1] + res[res.length - 2]) / 2 : res[res.length - 1];
};

function log(...rest) {
    if (!logEnabled) return;
    console.log(rest.join(' '));
}

let logEnabled = false;
let tests = [
    { a: [1], b: [2], ans: 1.5 },
    { a: [1, 3], b: [2], ans: 2 },
    { a: [1, 2], b: [3, 4], ans: 2.5 },
    { a: [], b: [1,2,3,4], ans: 2.5 },
    { a: [1], b: [1], ans: 1 },
    { a: [2,2,2,2], b: [2,2,2], ans: 2 },
    { a: [1,2,3,4], b: [5,6,7], ans: 4 },
    { a: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22], b: [0,6], ans: 10.5 }
];

tests.forEach((item) => {
    let res = findMedianSortedArrays(item.a, item.b);
    if (res !== item.ans) {
        logEnabled = true;
        console.log('expected', item.ans, 'calculated', findMedianSortedArrays(item.a, item.b));
        logEnabled = false;
    }
});

console.log('all done');

/*
Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
*/

/*

old solution - slow but memory-efficient
idea:
iterate over array till you find middle
find middle by using left and right indexes and last index (total number of processed elements)

var findMedianSortedArrays = function(nums1, nums2) {
    let len = (nums1.length + nums2.length - 1) / 2;
    let range = [0, 1];
    if (len === 0) {
        range = [0];
    } else if (len >= 1) {
        if (len % 1 === 0 || len === 1) {
            range = [len];
        } else {
            range = [Math.floor(len), Math.ceil(len)];
        }
    }

    let left = 0, right = 0, last = 0, res = [];
    while (range.length) {
        if (last === range[0]) {
            if (nums1[left] <= nums2[right] || !nums2[right]) {
                res.push(nums1[left++]);
            } else if (nums1[left] > nums2[right] || !nums1[left]) {
                res.push(nums2[right++]);
            }
            range.shift();
        } else if (nums1[left] <= nums2[right] || right > nums2.length - 1) {
            left++;
        } else if (nums1[left] > nums2[right] || left > nums1.length - 1) {
            right++;
        }
        last++;
        if (last > nums1.length + nums2.length) throw Error('input size limit exceeded');
    }

    return res.length > 1 ? (res[0] + res[1]) / 2 : res[0];
};

 */