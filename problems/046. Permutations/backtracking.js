/*
Create a list of all permutations of input array

Solution using backtracking with recursion
At each step, add one number to temp collection. Keep track of indexes you added already
When collection is full, add it to results and exit recursion
After recursion finishes, remove added number, run recursive function again (without previously added number)
Addition is done in a loop to allow backtracking and to keep track of elements we've tried to add already

Time complexity: O(n!), as there are O(n!) permutations total
Space complexity: O(n) extra space (reusing same arrays) on top of O(n!) results
 */

const {
    compareMatrices,
} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permute = function(nums) {
    function helper(array, isIndexUsedArray) {
        if (array.length === nums.length) {
            results.push(array.slice());
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (isIndexUsedArray[i]) {
                continue;
            }
            isIndexUsedArray[i] = 1;
            array.push(nums[i]);
            helper(array, isIndexUsedArray);
            array.pop();
            isIndexUsedArray[i] = 0;
        }
    }

    const isIndexUsedArray = new Array(nums.length).fill(0);
    const results = [];
    helper([], isIndexUsedArray);
    return results;
};

let tests = [
    {
        params: [[1,2,3]],
        ans: [
            [1,2,3],
            [1,3,2],
            [2,1,3],
            [2,3,1],
            [3,1,2],
            [3,2,1]
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
    let res = permute(...test.params);
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
