// This is the BinaryMatrix's API interface.
// You should not implement it, or speculate about its implementation
//
// But then you can't test it locally if you don't implement it at all
/**
Special API / data type for this problem
 */
function BinaryMatrix(data) {
    this.calls = 0;
    this.data = data;
    /**
     * Get a number from the data, increment number of calls, should not exceed the limit
     * @param x
     * @param y
     * @returns {number}
     */
    this.get = function(x, y) {
        this.calls++;
        if (this.calls > 1000) {
            throw new Error('Call count exceeded limit of 1000!');
        }
        return data[x][y];
    };
    /**
     * Get matrix dimensions, increments number of calls
     * @returns {[number, number]}
     */
    this.dimensions = function() {
        this.calls++;
        if (this.calls > 1000) {
            throw new Error('Call count exceeded limit of 1000!');
        }
        return [data.length, data[0].length];
    };
}

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
let leftMostColumnWithOne = function(binaryMatrix) {
    const dimensions = binaryMatrix.dimensions();
    let left = 0, right = dimensions[1], row = 0, min = 100, rows = dimensions[0];

    // use binary search to find left-most 1 in the row, repeat for each row
    while (row < rows) {
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            const num = binaryMatrix.get(row, mid);
            if (num === 1) {
                min = Math.min(mid, min);
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        row++;
        left = 0;
        right = Math.min(min, rows);
    }
    return min === 100 ? -1 : min;
};

const rowPrototype = new Array(100).fill(0);
const bigMatrix = new Array(100).fill(rowPrototype);

const badMatrix = [];
for (let i = 0; i < 100; i++) {
    badMatrix[i] = badMatrix[i] || rowPrototype.slice();
    for (let j = 99; j >= 99 - i; j--) {
        badMatrix[i][j] = 1;
    }
}

let tests = [
    {
        params: [new BinaryMatrix([[0,0,0,1],[0,0,1,1],[0,1,1,1]])],
        ans: 1,
    },
    {
        params: [new BinaryMatrix(badMatrix)],
        ans: 0,
    },
    {
        params: [new BinaryMatrix([[0,0,0,1],[0,0,1,1],[0,1,1,1]])],
        ans: 1,
    },
    {
        params: [new BinaryMatrix([[0,0],[0,0]])],
        ans: -1,
    },
    {
        params: [new BinaryMatrix(bigMatrix)],
        ans: -1,
    }
];

tests.forEach(test => {
    let res = leftMostColumnWithOne(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
