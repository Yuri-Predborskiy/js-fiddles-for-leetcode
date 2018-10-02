/*
    Brute force, naive solution:
    find all possible pairs, sort them in ascending order, return distances[k - 1]

    problem: memory limit exceeded
    Time complexity: O(n^2) (loop in loop, approximate since 2nd loop is made on remainder of the array)
    Space complexity: O(n^2) approximate
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let smallestDistancePair = function(nums, k) {
    let distances = [];
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            distances.push(Math.abs(nums[i] - nums[j]));
        }
    }
    distances.sort((a, b) => a - b);
    return distances[k - 1];
};

let tests = [
    { nums: [1,3,1], k: 1, ans: 0 },
];

tests.forEach(test => {
    let res = smallestDistancePair(test.nums, test.k);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
