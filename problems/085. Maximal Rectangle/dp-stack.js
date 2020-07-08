/*
Calculate the largest rectangle of '1's in a matrix that only has '1's and '0's

DP solution based on previous solution (maximum rectangle in histogram)
Treat every matrix row as a histogram. If value is 0, keep it 0, otherwise add previous row height
For each column that is not decreasing, add it to stack
When you find a decreasing column, process stack indexes till you find a value that is smaller or equal to last column
When calculating rectangle, height is the item from stack, width is current index - 1 - last index in stack
    If stack is empty, use current index as width (all values between start and current index have at least that height)

This approach simplifies calculations significantly

Time complexity: O(r*c) where r, c - matrix rows, columns
Space complexity: O(r) where r - matrix row
 */

/**
 * @param {string[][]} matrix
 * @return {number}
 */
let maximalRectangle = function(matrix) {
    function processItems(index, items, stack) {
        while (stack.length > 0 && items[index] < items[stack[stack.length - 1]]) {
            const topIndex = stack.pop();
            const height = items[topIndex];
            const width = stack.length > 0 ? index - stack[stack.length - 1] - 1 : index;
            max = Math.max(max, height * width);
        }
    }

    if (matrix.length < 1 || matrix[0].length < 1) {
        return 0;
    }

    let max = 0;
    const cols = matrix[0].length;
    const dp = new Array(cols + 1).fill(0);
    for (let row = 0; row < matrix.length; row++) {
        const stack = [];
        for (let col = 0; col < cols; col++) {
            if (matrix[row][col] === '0') {
                dp[col] = 0;
            } else {
                dp[col] = dp[col] + Number.parseInt(matrix[row][col]);
            }
            processItems(col, dp, stack);
            stack.push(col);
        }
        processItems(matrix[row].length, dp, stack);
    }
    return max;
};

let tests = [
    {params: [[['1','1','1','1'],['1','1','1','1'],['1','1','1','1']]], ans: 12},
    {params: [[['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]], ans: 6},
    {params: [[]], ans: 0},
];

tests.forEach(test => {
    let res = maximalRectangle(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
