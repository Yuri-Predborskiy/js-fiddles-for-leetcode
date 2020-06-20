/*
Create a list of all permutations of input array

Solution using copy-based recursion
The algorithm is similar to backtracking but instead of removing added elements we simply make a copy of temp array
Using a set to keep track of all the elements added previously (to avoid duplicates)

Solution can be improved by reusing the same array for all recursive backtracking calls

Time complexity: O(n!)
Space complexity: O(n!)
 */

const {
    compareMatrices,
} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permute = function(nums) {
    function helper(start, collection, set) {
        if (collection.length >= nums.length) {
            results.push(collection);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            const currentIndex = (i + start) % nums.length;
            if (set.has(nums[currentIndex])) {
                continue;
            }
            const tempCollection = collection.slice();
            tempCollection.push(nums[currentIndex]);
            helper(currentIndex, tempCollection, new Set([...set, nums[currentIndex]]));
        }
    }
    const results = [];
    helper(0, [], new Set());
    return results;
};

let tests = [
    {params: [[1,2,3]], ans: [
            [1,2,3],
            [1,3,2],
            [2,1,3],
            [2,3,1],
            [3,1,2],
            [3,2,1]
        ]},
];

tests.forEach(test => {
    let res = permute(...test.params);
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
