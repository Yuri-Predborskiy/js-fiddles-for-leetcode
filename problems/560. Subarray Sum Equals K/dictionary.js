// Idea: store sums that have happened before the current index
// if you subtract previous sum from current sum, you'll have a sum of a sub-array
// if result is k, increase count
// formula is sum(j) - sum(i) = k, sum(i) = sum(j) - k
// sum(i) should be saved at every step of the calculations
// time complexity: O(n) (single pass through all elements)
// space complexity: O(n) (storing a sum at each index from the start)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let subarraySum = function(nums, k) {
    let count = 0, sum = 0;
    const sums = new Map(); // key - sum of elements from the start, value - number of occurrences of this sum
    sums.set(0, 1);
    for (let num of nums) {
        sum += num;
        if (sums.has(sum - k)) {
            count += sums.get(sum - k);
        }
        sums.set(sum, (sums.get(sum) || 0) + 1);
    }
    return count;
};

let tests = [
    {
        params: [[1,1,1], 2],
        ans: 2,
    },
    {
        params: [[3,4,7,2,-3,1,4,2], 7],
        ans: 4,
    },
    {
        params: [[0,0,0,0,0,0,0,0,0,0], 0],
        ans: 55,
    },
];

tests.forEach(test => {
    let res = subarraySum(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
