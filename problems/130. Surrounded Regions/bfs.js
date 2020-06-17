/*
Iterate over graph (in this case graph is a matrix) and paint over 'O' values with 'X' values
But only if they are not connected to the border (top row, bottom row, edge left and right columns)
Use BFS for graph traversal (array and index, use push and increment index).
Keep track of visited items via set and coordinate (columns * row + col).
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
        const queue = [[r, c]];
        let index = 0;
        let borderReached = false;
        const items = [];
        while (index < queue.length) {
            const [row, col] = queue[index++];
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
            queue.push([row + 1, col]);
            queue.push([row - 1, col]);
            queue.push([row, col + 1]);
            queue.push([row, col - 1]);
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
