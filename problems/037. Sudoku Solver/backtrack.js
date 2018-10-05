const helper = require('../helper');
/*
    Sudoku solver using backtracking algorithm
    inspired by the following stackoverflow.com question and answer:
    https://stackoverflow.com/questions/19969978/sudoku-solving-algorithm-with-back-tracking
 */

/**
 * @param {string[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
let solveSudoku = function(board) {
    // check if board is valid after updating number at row-col
    function isValid(board, row, col) {
        let num = board[row][col];
        // check if row / column / block already has current number
        return !(
            boardHasNumberInSection(board, num, {
                rowStart: 0, rowEnd: 9, rowInc: 1,
                colStart: col, colEnd: col + 1, colInc: 1,
            }, {row, col})
            || boardHasNumberInSection(board, num, {
                rowStart: row, rowEnd: row + 1, rowInc: 1,
                colStart: 0, colEnd: 9, colInc: 1
            }, {row, col})
            || boardHasNumberInSection(board, num, {
                rowStart: Math.floor(row / 3) * 3, rowEnd: Math.floor(row / 3) * 3 + 3, rowInc: 1,
                colStart: Math.floor(col / 3) * 3, colEnd: Math.floor(col / 3) * 3 + 3, colInc: 1
            }, {row, col})
        );
    }

    function boardHasNumberInSection(board, num, section, skip) {
        for (let row = section.rowStart; row < section.rowEnd; row += section.rowInc) {
            for (let col = section.colStart; col < section.colEnd; col += section.colInc) {
                if (row === skip.row && col === skip.col) continue;
                if (board[row][col] === num) return true;
            }
        }
        return false;
    }

    let isSolved = [[],[],[], [],[],[], [],[],[]]; // boolean board that contains "solved" flags
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let num = Number.parseInt(board[row][col]);
            isSolved[row][col] = !!Number.parseInt(board[row][col]);
            board[row][col] = num || 0;
        }
    }
    let row, col, index = 0, direction = 1;

    while (index >= 0 && index < 81) {
        row = Math.floor(index / 9);
        col = index % 9;

        if (!isSolved[row][col]) {
            // increase the next item because last try didn't succeed
            ++board[row][col];

            // increase the number till it fits into the picture
            while (board[row][col] <= 9 && !isValid(board, row, col)) {
                ++board[row][col];
            }

            // intentional fail point: number can be 10. in this case reset number to 0 and backtrack
            if (board[row][col] > 9) {
                board[row][col] = 0;
                direction = -1;
            } else {
                direction = 1;
            }
        }
        index += direction;
    }
    if (index < 0) {
        throw new Error(`Catastrophic failure! Couldn't solve the puzzle`);
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col] = '' + board[row][col];
        }
    }
};

let tests = [
    {
        board: [
            ['5','3','.','.','7','.','.','.','.'],
            ['6','.','.','1','9','5','.','.','.'],
            ['.','9','8','.','.','.','.','6','.'],
            ['8','.','.','.','6','.','.','.','3'],
            ['4','.','.','8','.','3','.','.','1'],
            ['7','.','.','.','2','.','.','.','6'],
            ['.','6','.','.','.','.','2','8','.'],
            ['.','.','.','4','1','9','.','.','5'],
            ['.','.','.','.','8','.','.','7','9']
        ],
        ans: [
            ['5','3','4','6','7','8','9','1','2'],
            ['6','7','2','1','9','5','3','4','8'],
            ['1','9','8','3','4','2','5','6','7'],
            ['8','5','9','7','6','1','4','2','3'],
            ['4','2','6','8','5','3','7','9','1'],
            ['7','1','3','9','2','4','8','5','6'],
            ['9','6','1','5','3','7','2','8','4'],
            ['2','8','7','4','1','9','6','3','5'],
            ['3','4','5','2','8','6','1','7','9']
        ],
    },
    {
        board: [
            [".",".","9","7","4","8",".",".","."],
            ["7",".",".",".",".",".",".",".","."],
            [".","2",".","1",".","9",".",".","."],
            [".",".","7",".",".",".","2","4","."],
            [".","6","4",".","1",".","5","9","."],
            [".","9","8",".",".",".","3",".","."],
            [".",".",".","8",".","3",".","2","."],
            [".",".",".",".",".",".",".",".","6"],
            [".",".",".","2","7","5","9",".","."],
        ],
        ans: [
            ["5","1","9","7","4","8","6","3","2"],
            ["7","8","3","6","5","2","4","1","9"],
            ["4","2","6","1","3","9","8","7","5"],
            ["3","5","7","9","8","6","2","4","1"],
            ["2","6","4","3","1","7","5","9","8"],
            ["1","9","8","5","2","4","3","6","7"],
            ["9","7","5","8","6","3","1","2","4"],
            ["8","3","2","4","9","1","7","5","6"],
            ["6","4","1","2","7","5","9","8","3"]
        ],
    }
];

tests.forEach(test => {
    solveSudoku(test.board);
    let res = test.board;
    let correct = helper.compareArrays(res, test.ans); // updated in place
    console.log('expected\n', test.ans, '\ncalculated\n', res, '\nresult is', correct ? 'CORRECT' : 'WRONG!');
});
