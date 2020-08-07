/*
Find all duplicates in an array
Array contains numbers, some appear once, others appear twice. Find those that appear twice

Solution using input as hash (destroys input!)
Use input array as a hash table
Since numbers are from 1 to n (where n - length of the array), we can input array as a hash table
If element at nums[math.abs(element)] is not negative, make it negative
Otherwise, add current element to results

Time complexity: O(n)
Space complexity: O(1) (not counting memory for result)
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let findDuplicates = function(nums) {
    const results = [];
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]);
        if (nums[index - 1] < 0) {
            results.push(index);
        } else {
            nums[index - 1] *= -1;
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
