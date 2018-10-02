/*
    Brute force, naive solution:
    find all possible pairs, write them into hash table
    this saves memory as we don't write same distance number twice, we increment a number in hash table

    problem: slow, time complexity is high
    Time complexity: O(n^2) (approximate) to calculate all possible distances
    Space complexity: O(n) in the worst case, much smaller than brute force using array since it only saves unique distances
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let smallestDistancePair = function(nums, k) {
    let distances = {}, max = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let d = Math.abs(nums[i] - nums[j]);
            distances[d] = (distances[d] || 0) + 1;
            max = Math.max(d, max);
        }
    }
    for (let i = 0; i <= max; i++) {
        k = k - (distances[i] || 0);
        if (k <= 0) {
            return i;
        }
    }
};

let tests = [
    { nums: [1,3,1], k: 1, ans: 0 },
    { nums: [1,6,1], k: 3, ans: 5 },
];

tests.forEach(test => {
    let res = smallestDistancePair(test.nums, test.k);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
