/*
Find biggest area given an array of vertical lines.
Area = (right line index - left line index) * (height of the shorter vertical line)
Use sliding window technique. Starting window is entire array.
Move the smaller line to the next index (left goes forward, right goes backward).
Keep track of biggest area.
Stop when indexes meet.

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number[]} height
 * @return {number}
 */
let maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let max = 0;
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        if (area > max) {
            max = area;
        }
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return max;
};

let tests = [
    {params: [[1,8,6,2,5,4,8,3,7]], ans: 49},
];

tests.forEach(test => {
    let res = maxArea(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
