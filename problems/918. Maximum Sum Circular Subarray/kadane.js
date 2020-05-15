/*
Solution using Kadane's algorithm with a twist
First calculate max subarray using Kadane's algorithm
Next, calculate total and min subarray sum
if (total === minSum) { return maxSum }
else { return Math.max(maxSum, total - minSum); }

The idea behind this code is that there may be two cases:
1. Normal max sum, in this case Kadane's algorithm will give us an answer
2. Max sum is found by excluding a minimum sum from the sum of all elements
    (max sum is calculated as left and right edge of the array, minus the negative middle part)

If you want to visualize this algorithm, imagine an apple that looks good on the outside but started rotting in
    the middle. Cutting out the rotting middle will allow us to save the outer part (instead of chopping either left
    or right side). Same with this algorithm: we pick the part that is the biggest negative in the middle,
    and cut it out, keeping both of the sides. This works thanks to the fact the sub-array is circular.

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number[]} A
 * @return {number}
 */
let maxSubarraySumCircular = function(A) {
    let total = 0;
    let maxSum = -Infinity;
    let minSum = Infinity;
    let maxSoFar = new Array(A.length);
    let minSoFar = new Array(A.length);
    for (let i = 0; i < A.length; i++) {
        total += A[i];
        maxSoFar[i] = Math.max((maxSoFar[i - 1] || 0) + A[i], A[i]);
        minSoFar[i] = Math.min((minSoFar[i - 1] || 0) + A[i], A[i]);
        maxSum = Math.max(maxSoFar[i], maxSum);
        minSum = Math.min(minSoFar[i], minSum);
    }
    if (total === minSum) {
        return maxSum;
    }
    return Math.max(maxSum, total - minSum);
};

let tests = [
    {
        params: [[-2]],
        ans: -2,
    },
    {
        params: [[1,-2,3,-2]],
        ans: 3,
    },
    {
        params: [[5,-3,5]],
        ans: 10,
    },
    {
        params: [[3,-1,2,-1]],
        ans: 4,
    },
    {
        params: [[3,-2,2,-3]],
        ans: 3,
    },
    {
        params: [[-2,-3,-1]],
        ans: -1,
    },
];

tests.forEach(test => {
    let res = maxSubarraySumCircular(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
