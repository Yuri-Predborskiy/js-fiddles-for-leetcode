/*
Calculate the largest rectangle area in the histogram

Single-pass solution through partitioning
Divide and conquer approach
First, create a stack of column indexes
If input item >= last stack item, push to stack
This way we'll have an ascending order of columns
This means that we can draw a rectangle from any stacked index to current index
Index in the stack decides height, current index (not included) decides width (index - 1)
If current item is smaller than last stack item, process items till you find matching or smaller height

This approach we process every item only once, reducing time complexity
Stack increases space complexity to O(n) from O(1) (brute force)

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
let largestRectangleArea = function(heights) {
    let max = 0;
    const stack = [];
    heights.push(0);
    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            const peakIndex = stack.pop();
            const height = heights[peakIndex];
            const width = stack.length > 0 ? i - stack[stack.length - 1] - 1 : i;
            max = Math.max(max, height * width);
        }
        stack.push(i);
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