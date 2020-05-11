/*
Fill the image with new color
Simply iterate over neighbors and check if their color matches base color (start point color)
If it does, update it to new color

This implementation uses an array instead of a queue. Instead of removing an item from queue, we increment read index
Benefit: faster to implement
Drawback: array will be as large as input itself

Edge case: replacing color with itself. There's no point, so if new color = base color, exit immediately.

Time complexity: O(n), reading the whole image to find all matching elements, but not more than once
Space complexity: O(n), need enough space to keep a copy of every coordinate
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
let floodFill = function(image, sr, sc, newColor) {
    const baseColor = image[sr][sc];
    if (baseColor === newColor) {
        return image;
    }
    const queue = [[sr, sc]];
    let insertIndex = 1;
    let readIndex = 0;
    while(readIndex < queue.length) {
        const [row, col] = queue[readIndex];
        readIndex++;
        image[row][col] = newColor;
        if (image[row][col + 1] === baseColor) {
            queue[insertIndex] = [row, col + 1];
            insertIndex++;
        }
        if (image[row + 1]) {
            if (image[row + 1][col] === baseColor) {
                queue[insertIndex] = [row + 1, col];
                insertIndex++;
            }
        }
        if (image[row][col - 1] === baseColor) {
            queue[insertIndex] = [row, col - 1];
            insertIndex++;
        }
        if (image[row - 1]) {
            if (image[row - 1][col] === baseColor) {
                queue[insertIndex] = [row - 1, col];
                insertIndex++;
            }
        }
    }
    return image;
};

let tests = [
    {
        params: [[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2],
        ans: [[2,2,2],[2,2,0],[2,0,1]],
    },
    {
        params: [[[0,0,0],[0,1,1]], 1, 1, 1],
        ans: [[0,0,0],[0,1,1]],
    },
];

tests.forEach(test => {
    let res = floodFill(...test.params);
    let correct = compareMatricesStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});