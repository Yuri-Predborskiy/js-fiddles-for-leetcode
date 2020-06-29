/*
Check if you can build from individual characters by moving over a 2D board (grid)
From every cell you can move up/down/left/right
You cannot revisit cells

Solution using DFS with backtracking.
Backtracking allows us to reuse the same "visited" array instead of creating copies
DFS allows us to find matching word before checking every possible combination
Algorithm:
Starting at each cell, if cell = start of word
    check every adjacent cell to see if character matches word letter at respective index
Early exit if cell is visited or if character does not match
If we find a full match, return true
If no match is found, continue scanning the board
If board is scanned and no positive match is found, return false

Time complexity: O(n*m) where n = number of items in the board (rows * cols), m - word length
Space complexity: O(n) where n - board size (rows * cols)
 */

/**
 * @param {string[][]} board
 * @param {string} word
 * @return {boolean}
 */
let exist = function(board, word) {
    function checkItem(row, col, chars) {
        if (
            row >= rows || col >= columns || row < 0 || col < 0 ||
            visited[row][col] ||
            word[chars.length] !== board[row][col]
        ) {
            return false;
        }
        visited[row][col] = true;
        if (dfs(row, col, chars + board[row][col])) {
            return true;
        }
        visited[row][col] = false;
    }

    function dfs(row, col, chars) {
        if (chars === word) {
            return true;
        } else if (chars.length >= word.length) {
            return false;
        }

        if (
            checkItem(row, col + 1, chars) ||
            checkItem(row, col - 1, chars) ||
            checkItem(row + 1, col, chars) ||
            checkItem(row - 1, col, chars)
        ) {
            return true;
        }
    }

    if (board.length < 1) {
        return false;
    }
    const rows = board.length, columns = board[0].length;
    const visited = [];
    for (let row = 0; row < rows; row++) {
        visited[row] = new Array(columns).fill(false);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (board[row][col] === word[0]) {
                visited[row][col] = true;
                if (dfs(row, col, board[row][col])) {
                    return true;
                }
                visited[row][col] = false;
            }
        }
    }
    return false;
};

let tests = [
    {
        params: [
            [
                ['A','B','C','E'],
                ['S','F','C','S'],
                ['A','D','E','E']
            ],
            'ABCCED'
        ],
        ans: true
    },
    {
        params: [
            [
                ['A','B','C','E'],
                ['S','F','C','S'],
                ['A','D','E','E']
            ],
            'SEE'
        ],
        ans: true
    },
    {
        params: [
            [
                ['A','B','C','E'],
                ['S','F','C','S'],
                ['A','D','E','E']
            ],
            'ABCB'
        ],
        ans: false
    },
    {params: [[], 'A'], ans: false},
    {params: [[[]], 'A'], ans: false},
];

tests.forEach(test => {
    let res = exist(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
