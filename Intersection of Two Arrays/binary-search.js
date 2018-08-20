/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    function sort(arr) {
        // todo: write a quicksort algorithm
        return arr.sort();
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
    let smaller = nums1.length < nums2.length ? nums1 : nums2;
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
];

tests.forEach(test => {
    let res = intersection(test.nums1, test.nums2);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.forEach(item => {
        if (!arr2.includes(item)) return false;
    });
    return true;
}