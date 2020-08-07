/*
Find all duplicates in an array
Array contains numbers, some appear once, others appear twice. Find those that appear twice

Solution using sorting
Sort the array
If any item is the same as previous item, add it to results

Time complexity: O(n*log(n)) sorting
Space complexity: O(1)
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let findDuplicates = function(nums) {
    nums.sort((a, b) => a - b);
    const results = [];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] === nums[i]) {
            results.push(nums[i]);
            i++;
        }
    }
    return results;
};

let tests = [
    {params: [[2,2]], ans: [2]},
    {params: [[4,3,2,7,8,2,3,1]], ans: [2,3]},
];

tests.forEach(test => {
    let res = findDuplicates(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
