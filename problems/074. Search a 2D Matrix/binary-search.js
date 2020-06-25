/*
Search for item in a sorted 2D matrix

Solution using binary search
Since matrix is basically a split-up array, we can use binary search algorithm
The only complexity is getting 2d coordinates from left and right pointers
They can be converted using a reusable function for converting index into row and column

Time complexity: O(log(n))
Space complexity: O(1)
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
let searchMatrix = function(matrix, target) {
    function getAtIndex(index) {
        const row = Math.floor(index / columns);
        const col = index - row * columns;
        return matrix[row][col];
    }

    if (matrix.length < 1) {
        return false;
    }
    const columns = matrix[0].length;
    let left = 0;
    let right = matrix.length * columns - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const val = getAtIndex(mid);
        if (val === target) {
            return true;
        } else if (val > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return false;
};

let tests = [
    {params: [[[1,3,5,7],[10,11,16,20],[23,30,34,50]], 3], ans: true},
    {params: [[[1,3,5,7],[10,11,16,20],[23,30,34,50]], 13], ans: false},
];

tests.forEach(test => {
    let res = searchMatrix(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
