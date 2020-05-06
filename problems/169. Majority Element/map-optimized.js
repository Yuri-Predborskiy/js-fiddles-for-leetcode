/*
Make a map of counts for each element
Check number of repeats on each step and return immediately once an element is majority element (there can be only one)

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let majorityElement = function(nums) {
    const map = new Map();
    for (let num of nums) {
        const repeats = map.get(num) + 1 || 1;
        if (repeats > nums.length / 2) {
            return num;
        }
        map.set(num, repeats ? repeats : 1);
    }
};

let tests = [
    { params: [[3,2,3]], ans: 3 },
    { params: [[2,2,1,1,1,2,2]], ans: 2 },
    { params: [[1]], ans: 1 },
];

tests.forEach(test => {
    let res = majorityElement(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
