/*
Given an array where all numbers repeat exactly one, find two numbers that do not repeat
Do it in linear time

Set-based solution
For each number, if it exists in set, remove it from set
If it doesn't exist in set - add it to set
Since numbers repeat exactly once, they will be added and then removed
The two unique numbers will remain in the set
Return Array from Set

Time complexity: O(n), we go over the array once
Space complexity: O(n), in the worst case we need to store half of the array + 2 unique elements
 */

const {compareArrays} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let singleNumber = function(nums) {
    const uniques = new Set();
    for (let num of nums) {
        if (uniques.has(num)) {
            uniques.delete(num);
        } else {
            uniques.add(num);
        }
    }
    return Array.from(uniques);
};

let tests = [
    {params: [[1,2,1,3,2,5]], ans: [3,5]},
    {params: [[1,2,1,3,3,2,5,6]], ans: [6,5]},
    {params: [[1,2]], ans: [1,2]},
];

tests.forEach(test => {
    let res = singleNumber(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
