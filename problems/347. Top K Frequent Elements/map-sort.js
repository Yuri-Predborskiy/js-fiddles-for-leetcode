/*
Find top K most repeating elements in a given array of integers
Should be faster than n*log(n) - sorting original array is not allowed

Solution using hash map of repeats of elements
Sort the repeats collection based on the number of repeats
Then return top k elements's keys (keys represent numbers that repeat, while values - number of repeats)

Time complexity: O(n), number of unique elements is guaranteed to be smaller than number of all elements
    this means k*log(k) is going to be smaller than n (on average)
    Worst case: k*log(k) where k*log(k) is greater than n
Space complexity: O(n) worst case, since we only index unique elements
 */

const {compareArrays} = require('../helper');

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let topKFrequent = function(nums, k) {
    if (nums.length === k) {
        return nums;
    }
    const map = new Map();
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1)
    }
    const repeats = Array.from(map.entries());
    repeats.sort((a, b) => b[1] - a[1]);
    const results = [];
    for (let i = 0; i < k; i++) {
        results.push(repeats[i][0]);
    }
    return results;
};

let tests = [
    { params: [[1,1,1,2,2,3], 2], ans: [1,2] },
    { params: [[1], 1], ans: [1] },
    { params: [[1,2], 2], ans: [1,2] },
];

tests.forEach(test => {
    let res = topKFrequent(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
