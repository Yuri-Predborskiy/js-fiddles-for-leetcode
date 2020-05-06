/*
Make a map of counts for each element
Then work through all elements and find the one that repeats the most (there can be only one by definition)

Time complexity: O(2n) = O(n)
Space complexity: O(n)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let majorityElement = function(nums) {
    const map = new Map();
    let max = 0, maxElement = 0;
    for (let num of nums) {
        map.set(num, map.has(num) ? map.get(num) + 1 : 1);
    }
    for (let entry of map.entries()) {
        if (entry[1] > max) {
            max = entry[1];
            maxElement = entry[0];
        }
    }
    return maxElement;
};

let tests = [
    { params: [[3,2,3]], ans: 3 },
    { params: [[2,2,1,1,1,2,2]], ans: 2 },
];

tests.forEach(test => {
    let res = majorityElement(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
