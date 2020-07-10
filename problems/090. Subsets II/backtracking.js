/*
Given collection of integers, return the power set (all possible subsets)

Solution using backtracking with sorting
First, sort the inputs
Then perform backtracking:
    - add an item
    - perform recursive function with added item
    - remove added item
    - repeat with next item
    - at the start of each recursive function add current collection to array of subsets

Sorting the input makes it easy to handle duplicates
If current item is the same as previous item, and we have processed previous item, skip current item
This way we won't process repeating numbers as individual numbers
We will only process them the first time we find them

Time complexity: O(2^n)
Space complexity: O(2^n)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let subsetsWithDup = function(nums) {
    function process(array, index) {
        result.push(array.slice());
        for (let i = index; i < nums.length; i++) {
            if (i > index && nums[i] === nums[i - 1]) {
                continue;
            }
            array.push(nums[i]);
            process(array, i + 1);
            array.pop();
        }
    }

    nums.sort((a, b) => a - b);
    const result = [];
    process([], 0);
    return result;
};

let tests = [
    {params: [[1,2,2]], ans: [[],[1],[1,2],[1,2,2],[2],[2,2]]},
    {
        params: [[1,2,3,3,3]],
        ans: [
            [],[1],[1,2],[1,2,3],[1,2,3,3],[1,2,3,3,3],[1,3],[1,3,3],[1,3,3,3],
            [2],[2,3],[2,3,3],[2,3,3,3],
            [3],[3,3],[3,3,3]
        ]
    },
    {params: [[]], ans: [[]]},
    {params: [[1]], ans: [[],[1]]},
    {params: [[4,4,4,1,4]], ans: [[],[1],[1,4],[1,4,4],[1,4,4,4],[1,4,4,4,4],[4],[4,4],[4,4,4],[4,4,4,4]]},
];

tests.forEach(test => {
    let res = subsetsWithDup(...test.params);
    let correct = compareMatricesStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
