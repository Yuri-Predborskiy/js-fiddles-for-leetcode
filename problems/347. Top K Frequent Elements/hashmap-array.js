/*
Find top K most repeating elements in a given array of integers
Should be faster than n*log(n) - sorting original array is not allowed

Solution using hash map of repeats of elements
Also using an array of repeats
The idea is to create an array of repeats
Index = number of repeats
Value = array of elements that repeat this number of times
Then go over the array of repeats from the end and find K last elements
The set of most repeating elements is guaranteed to be unique

Time complexity: O(n)
Space complexity: O(n) worst case, since we only index unique elements
 */

const {compareArrays} = require('../helper');

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let topKFrequent = function(nums, k) {
    const repeatMap = new Map();
    for (let num of nums) {
        repeatMap.set(num, (repeatMap.get(num) || 0) + 1);
    }

    const repeatsArray = [];
    for (let [key, value] of repeatMap.entries()) {
        repeatsArray[value] ? repeatsArray[value].push(key) : repeatsArray[value] = [key];
    }
    const results = [];
    let index = repeatsArray.length - 1;
    while (k > 0) {
        while (!repeatsArray[index]) {
            index--;
        }
        results.push(...repeatsArray[index]);
        k -= repeatsArray[index].length;
        index--;
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
