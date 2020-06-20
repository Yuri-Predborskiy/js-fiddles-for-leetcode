/*
Create a list of all unique permutations of input array where input may contain duplicates
Permutations should all be unique

First, sort inputs to allow tracking of duplicates
Solution using backtracking with recursion
At each step, add one number to temp collection. Keep track of indexes you added already
If current item is the same as previous item, and previous item is in use, you may add current item at any step
If previous item is not in use, you may not add current item
This avoids duplicate results where you swap two identical numbers in place

When collection is full, add it to results and exit recursion
After recursion finishes, remove added number, run recursive function again with next number
Addition is done in a loop to allow backtracking and to keep track of elements we've tried to add already

Time complexity: O(n!), as there are O(n!) permutations total
Space complexity: O(n) extra space (reusing same arrays) on top of O(n!) results

Duplicate detection algorithm found in the following post:
https://leetcode.com/problems/permutations/discuss/18239/
 */

const {
    compareMatrices,
} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permuteUnique = function(nums) {
    function helper(array, indexesInUse) {
        if (array.length === nums.length) {
            results.push(array.slice());
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (indexesInUse[i] || (!indexesInUse[i - 1] && nums[i] === nums[i - 1])) {
                continue;
            }
            array.push(nums[i]);
            indexesInUse[i] = 1;
            helper(array, indexesInUse);
            array.pop();
            indexesInUse[i] = 0;
        }
    }

    nums.sort((a, b) => a - b);
    const results = [];
    const indexesInUse = new Array(nums.length).fill(0);
    helper([], indexesInUse);
    return results;
};

let tests = [
    {
        params: [[1,1,2]],
        ans: [
            [1,1,2],
            [1,2,1],
            [2,1,1]
        ]
    },
    {
        params: [[1,2,3,4]],
        ans: [
            [ 1, 2, 3, 4 ], [ 1, 2, 4, 3 ], [ 1, 3, 2, 4 ], [ 1, 3, 4, 2 ], [ 1, 4, 2, 3 ], [ 1, 4, 3, 2 ],
            [ 2, 1, 3, 4 ], [ 2, 1, 4, 3 ], [ 2, 3, 1, 4 ], [ 2, 3, 4, 1 ], [ 2, 4, 1, 3 ], [ 2, 4, 3, 1 ],
            [ 3, 1, 2, 4 ], [ 3, 1, 4, 2 ], [ 3, 2, 1, 4 ], [ 3, 2, 4, 1 ], [ 3, 4, 1, 2 ], [ 3, 4, 2, 1 ],
            [ 4, 1, 2, 3 ], [ 4, 1, 3, 2 ], [ 4, 2, 1, 3 ], [ 4, 2, 3, 1 ], [ 4, 3, 1, 2 ], [ 4, 3, 2, 1 ]
        ]
    },
];

tests.forEach(test => {
    let res = permuteUnique(...test.params);
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
