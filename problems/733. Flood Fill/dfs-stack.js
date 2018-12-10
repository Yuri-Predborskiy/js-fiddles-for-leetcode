const {compareArrays} = require('../helper');

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
let floodFill = function(image, sr, sc, newColor) {
    function isSameColor(row, col) {
        return (
            row < image.length &&
            row >= 0 &&
            col < image[0].length &&
            col >= 0 &&
            !visited[row*rowLen + col] &&
            image[row][col] === originalColor
        );
    }

    let originalColor = image[sr][sc], stack = [[sr, sc]], visited = {}, rowLen = image[0].length;
    while (stack.length > 0) {
        let [row, col] = stack.pop();
        image[row][col] = newColor;
        visited[row*rowLen + col] = true;
        if (isSameColor(row, col - 1)) { // left
            stack.push([row, col - 1]);
            visited[row*rowLen + col] = true;
        }
        if (isSameColor(row - 1, col)) { // up
            stack.push([row - 1, col]);
            visited[row*rowLen + col] = true;
        }
        if (isSameColor(row, col + 1)) { // right
            stack.push([row, col + 1]);
            visited[row*rowLen + col] = true;
        }
        if (isSameColor(row + 1, col)) { // down
            stack.push([row + 1, col]);
            visited[row*rowLen + col] = true;
        }
    }
    return image;
};

let tests = [
    {
        params: [
            [
                [1,1,1],
                [1,1,0],
                [1,0,1],
            ],
            1,
            1,
            2,
        ],
        ans: [
            [2,2,2],
            [2,2,0],
            [2,0,1]
        ],
    },
];

tests.forEach(test => {
    let res = floodFill(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
