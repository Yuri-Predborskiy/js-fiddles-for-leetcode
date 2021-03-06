const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
let intersection = function(nums1, nums2) {
    function sort(arr) {
        // todo: write a quicksort algorithm
        return arr.sort((a, b) => a > b ? 1 : -1);
    }

    function arrIncludesTarget(arr, target) {
        // if dictionary includes target - return false to skip duplicates
        if (dict[target]) {
            return false;
        }
        dict[target] = true;
        let left = 0, right = arr.length - 1;

        // binary search, template 1
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                // target found
                return true;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // target not found
        return false;
    }

    let dict = {}, res = [];
    let smaller = nums1.length <= nums2.length ? nums1 : nums2;
    let larger = nums1.length > nums2.length ? nums1 : nums2;
    sort(smaller);

    larger.forEach(item => {
        if (arrIncludesTarget(smaller, item)) {
            res.push(item);
        }
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
