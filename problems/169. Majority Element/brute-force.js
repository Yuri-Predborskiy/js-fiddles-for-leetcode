/*
Brute force. Count number of times each element repeats. Return once majority element is found
Time complexity: O(n^2) - iterate over the entire loop for every element
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let majorityElement = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let repeats = 0;
        for (let j = i; j < nums.length; j++) {
            if (nums[j] === nums[i]) {
                repeats++;
            }
            if (repeats > nums.length / 2) {
                return nums[i];
            }
        }
    }
};

let tests = [
    { params: [[3,2,3]], ans: 3 },
    { params: [[2,2,1,1,1,2,2]], ans: 2 },
    { params: [[1]], ans: 1 },
    { params: [[6,5,5]], ans: 5 },
];

tests.forEach(test => {
    let res = majorityElement(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
