/*
Search for a value in a matrix
All matrix rows are sorted, all columns are sorted
End of one row is NOT the start of the next row

Solution:
First scan the matrix and scratch out the columns that start with value > target, end with value < target
These will become base left-right cases
Then perform binary search on rows
Skip rows that end with value smaller than target
Stop when first value in a row is larger than target

Time complexity: O(n*log(m)) we scan all rows and perform binary search in each
Space complexity: O(1)
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
let searchMatrix = function(matrix, target) {
    function binarySearch(arr, left, right) {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                return true;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }

    if (matrix.length < 1) {
        return false;
    }

    const rows = matrix.length;
    const columns = matrix[0].length;
    let baseLeft = 0;
    let baseRight = columns - 1;
    for (let col = 0; col < columns; col++) {
        if (matrix[rows - 1][col] < target) {
            baseLeft++;
            continue;
        }
        break;
    }
    for (let col = columns - 1; col >= 0; col--) {
        if (matrix[0][col] > target) {
            baseRight--;
            continue;
        }
        break;
    }
    for (let row = 0; row < rows; row++) {
        if (matrix[row][columns - 1] < target) {
            continue;
        } else if (matrix[row][0] > target) {
            break;
        }
        if (binarySearch(matrix[row], baseLeft, baseRight)) {
            return true;
        }
    }
    return false;
};

let tests = [
    {params: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5], ans: true},
    {params: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20], ans: false},
];

tests.forEach(test => {
    let res = searchMatrix(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
