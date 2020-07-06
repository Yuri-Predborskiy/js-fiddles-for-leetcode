/*
Calculate the largest rectangle area in the histogram

Brute force solution
For each starting point, calculate maximum possible rectangle (smallest height * current width)
Keep track of overall max
Optimization: break current inner loop on 0 as all further rectangles will have area of 0

Time complexity can be optimized at the lost of space complexity

Time complexity: O(n^2)
Space complexity: O(1)
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
let largestRectangleArea = function(heights) {
    let max = 0;
    for (let i = 0; i < heights.length; i++) {
        let minHeight = Infinity;
        for (let j = i; j < heights.length; j++) {
            minHeight = Math.min(minHeight, heights[j]);
            if (minHeight === 0) {
                break;
            }
            max = Math.max(minHeight * (j - i + 1), max);
        }
    }
    return max;
};

let tests = [
    {params: [2,1,5,6,2,3], ans: 10},
    {params: [2,0,5,6,2,3], ans: 10},
    {params: [2,1,5,6,2,12], ans: 12},
    {params: [0,1,0], ans: 1},
    {params: [0,1,0,2,1,1,0,1], ans: 3},
    {params: [0,1,0,3,2,0,5], ans: 5},
];



tests.forEach(test => {
    let res = largestRectangleArea(test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});