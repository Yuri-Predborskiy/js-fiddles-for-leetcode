const helper = require('../helper');
/*
    Sudoku solver using pure logical approach.
    If logical approach fails, downgrade to backtracking algorithm (brute force).
    Backtracking is slow, so it should be faster if you solve it partially first.

    logic solution algorithms explained here:
    https://www.kristanix.com/sudokuepic/sudoku-solving-techniques.php

    more algorithms can be found in wikipedia:
    https://en.wikipedia.org/wiki/Sudoku_solving_algorithms
 */

/**
 * @param {string[][]} mainBoard
 * @return {void} Do not return anything, modify board in-place instead.
 */
let solveSudoku = function(mainBoard) {
    // use backtracking if simple solution fails
    function solveSudokuUsingBacktracking(board) {
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
    }
    // end of backtracking

    function getLastNumber(board, row, col) {
        let last = 0, cnt = 0, sum = 0;
        for (let n = 1; n <= 9; n++) {
            if (board[row][col][n] === 'found') {
                cnt++;
                sum += n;
            }
        }
        if (cnt === 8) {
            last = 45 - sum; // 45 is the sum of all numbers 1..9, if there are 8 numbers, 45 - sum = missing number
        }
        return last;
    }

    function isSingleNumberInBlock(board, row, col, num) {
        if (board[row][col][num] === 'found') return false;
        let rowStart = Math.floor(row / 3) * 3, colStart = Math.floor(col / 3) * 3, foundCount = 0;
        for (let r = rowStart; r < rowStart + 3; r++) {
            for (let c = colStart; c < colStart + 3; c++) {
                if (r === row && c === col) continue;
                if (board[r][c].taken || board[r][c][num] === 'found') foundCount++;
            }
        }
        return foundCount === 8;
    }

    function update(board, row, col, number, type, state) {
        if (board === possible) {
            let rowMin = 0, rowMax = 9, colMin = 0, colMax = 9;
            if (type === 'block') {
                rowMin = Math.floor(row / 3) * 3;
                rowMax = rowMin + 3;
                colMin = Math.floor(col / 3) * 3;
                colMax = colMin + 3;
            } else if (type === 'row') {
                rowMin = row;
                rowMax = rowMin + 1;
            } else if (type === 'col') {
                colMin = col;
                colMax = colMin + 1;
            } else {
                console.log('fail: unknown type ' + type);
                return;
            }

            for (let r = rowMin; r < rowMax; r++) {
                for (let c = colMin; c < colMax; c++) {
                    if (board[r][c].taken) continue;
                    board[r][c][number] = state;
                }
            }
        } else {
            board[row][col] = number;
        }
    }

    let possible = [
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{}],
    ]; // board with possible numbers, to access: possible[row, col].number = bool or undefined

    let repeat = false, repeatCount = 0;
    do {
        repeat = false;
        let bigChanges = false;
        for (let num = 1; num <= 9; num++) {
            // fill in taken spots, update rows and columns and blocks
            let changes = false;
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (Number.parseInt(mainBoard[row][col]) === num) {
                        if (!possible[row][col].taken) {
                            possible[row][col] = { taken: true };
                            bigChanges = true;
                        }
                        update(possible, row, col, num, 'block', 'found');
                        update(possible, row, col, num, 'row', 'found');
                        update(possible, row, col, num, 'col', 'found');
                    }
                    if (mainBoard[row][col] !== '.') continue;
                    let last = getLastNumber(possible, row, col);
                    let single = isSingleNumberInBlock(possible, row, col, num);
                    if (!last && single) {
                        last = num;
                    }
                    if (last) {
                        mainBoard[row][col] = '' + last;
                        possible[row][col] = { taken: true };
                        update(possible, row, col, last, 'block', 'found');
                        update(possible, row, col, last, 'row', 'found');
                        update(possible, row, col, last, 'col', 'found');
                        changes = true;
                        bigChanges = true;
                    }
                    if (mainBoard[row][col] === '.') {
                        repeat = true;
                    }
                }
            }
        }
        if (!bigChanges) {
            solveSudokuUsingBacktracking(mainBoard); // will modify mainBoard, should solve it
            break;
        }
        repeatCount++;
    } while (repeat && repeatCount < 1000);
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
