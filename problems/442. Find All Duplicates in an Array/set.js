/*
Find all duplicates in an array
Array contains numbers, some appear once, others appear twice. Find those that appear twice

Solution using dictionary
Add every item into dictionary.
If item is already in the dictionary, add it to results

Time complexity: O(n), where n - number of items in the array
Space complexity: O(n)
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let findDuplicates = function(nums) {
    const dict = new Set();
    const results = [];
    for (let num of nums) {
        if (dict.has(num)) {
            results.push(num);
        } else {
            dict.add(num);
        }
    }
    return results;
};

let tests = [
    {params: [[4,3,2,7,8,2,3,1]], ans: [2,3]},
];

tests.forEach(test => {
    let res = findDuplicates(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
