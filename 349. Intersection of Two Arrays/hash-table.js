/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    let hash = {};
    nums1.forEach(item => {
        hash[item] = true;
    });
    let res = [];
    nums2.forEach(item => {
        if (!hash[item]) {
            return;
        }
        hash[item] = false;
        res.push(item);
    });

    return res;
};

let tests = [
    { nums1: [1,2,2,1], nums2: [2,2], ans: [2] },
    { nums1: [4,9,5], nums2: [9,4,9,8,4], ans: [9,4] },
    {
        nums1: [
            61,24,20,58,95,53,17,32,45,85,70,20,83,62,35,89,5,95,12,86,58,77,30,64,46,13,5,92,67,40,20,38,31,
            18,89,85,7,30,67,34,62,35,47,98,3,41,53,26,66,40,54,44,57,46,70,60,4,63,82,42,65,59,17,98,29,72,1,96,
            82,66,98,6,92,31,43,81,88,60,10,55,66,82,0,79,11,81
        ],
        nums2: [5,25,4,39,57,49,93,79,7,8,49,89,2,7,73,88,45,15,34,92,84,38,85,34,16,6,99,0,2,36,68,52,73,50,77,44,61,48],
        ans: [61,45,85,89,5,77,92,38,7,34,44,57,4,6,88,0,79]
    }
];

tests.forEach(test => {
    let res = intersection(test.nums1, test.nums2);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) return false;
    }
    return true;
}