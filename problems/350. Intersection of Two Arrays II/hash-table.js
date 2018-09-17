const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let hash = {};
    nums1.forEach(item => {
        hash[item] = (hash[item] || 0) + 1;
    });
    let res = [];
    nums2.forEach(item => {
        if (!hash[item]) {
            return;
        }
        hash[item]--;
        res.push(item);
    });

    return res;
};

let tests = [
    { nums1: [1,2,2,1], nums2: [2,2], ans: [2,2] },
    { nums1: [4,9,5], nums2: [9,4,9,8,4], ans: [9,4] },
    { nums1: [2,1], nums2: [1,2], ans: [1,2] },
];

tests.forEach(test => {
    let res = intersect(test.nums1, test.nums2);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
