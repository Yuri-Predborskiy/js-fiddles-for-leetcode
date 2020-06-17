/*
Iterate over graph (in this case graph is a matrix) and paint over 'O' values with 'X' values
But only if they are not connected to the border (top row, bottom row, edge left and right columns)
Use DFS for graph traversal. Keep track of visited items.
When done traversing, if group of linked nodes does not touch the border, paint over the group

Time complexity: O(nm) where n, m - length and width of matrix
Space complexity: O(nm) for traversal and to keep track of items to paint over
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {string[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
let solve = function(board) {
    function captureRegion(r, c) {
        const stack = [[r, c]];
        let borderReached = false;
        const items = [];
        while (stack.length > 0) {
            const [row, col] = stack.pop();
            const coordinate = row * columns + col;
            if (board[row][col] !== 'O' || visited.has(coordinate)) {
                continue;
            }
            visited.add(coordinate);

            if (row === 0 || col === 0 || row === rows - 1 || col === columns - 1) {
                borderReached = true;
                continue;
            }

            if (!borderReached) {
                items.push([row, col]);
            }
            stack.push([row + 1, col]);
            stack.push([row - 1, col]);
            stack.push([row, col + 1]);
            stack.push([row, col - 1]);
        }

        if (borderReached) {
            return;
        }

        for (let [row, col] of items) {
            board[row][col] = 'X';
        }
    }

    if (board.length < 1) {
        return;
    }

    const rows = board.length;
    const columns = board[0].length;
    const visited = new Set();
    for (let row = 1; row < board.length - 1; row++) {
        for (let col = 1; col < board[1].length - 1; col++) {
            if (board[row][col] === 'O' && !visited.has(row * columns + col)) {
                captureRegion(row, col);
            }
        }
    }
};

let tests = [
    {
        params: [[
            ['X','X','X','X'],
            ['X','O','O','X'],
            ['X','X','O','X'],
            ['X','O','X','X']
        ]],
        ans: [
            ['X','X','X','X'],
            ['X','X','X','X'],
            ['X','X','X','X'],
            ['X','O','X','X']
        ]
    },
    {
        params: [[]],
        ans: []
    },
];

tests.forEach(test => {
    solve(...test.params);
    let correct = compareMatricesStrict(test.params[0], test.ans);
    console.log('expected:', test.ans, '| calculated:', test.params[0], '| result is', correct ? 'CORRECT' : 'WRONG!');
});
