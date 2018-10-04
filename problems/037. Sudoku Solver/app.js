/*
    Sudoku solver!
    Solves sudoku using primitive sudoku rules
    Only solves the most simple puzzles that have no ambiguity
    Does not check if the puzzle is valid (can be added)
    May enter infinite loop if it can't solve the puzzle using primitive solution rules

    After this I will only need a sudoku puzzle generator using Sudoku patterns or formula to make a Sudoku JS game
 */

/**
 * @param {string[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
let solveSudoku = function(board) {
    console.log(board);

    function findNumber(board, number, type, rowPos, colPos) {
        let rowMin = 0, rowMax = 9, colMin = 0, colMax = 9;
        if (type === 'block') {
            rowMin = Math.floor(rowPos / 3) * 3;
            rowMax = rowMin + 3;
            colMin = Math.floor(colPos / 3) * 3;
            colMax = colMin + 3;
        } else if (type === 'row') {
            rowMin = rowPos;
            rowMax = rowMin + 1;
        } else if (type === 'col') {
            colMin = colPos;
            colMax = colMin + 1;
        } else {
            console.log('incorrect area type', type); // should never happen
        }

        for (let row = rowMin; row < rowMax; row++) {
            for (let col = colMin; col < colMax; col++) {
                // todo: change behavior if this is possibility board
                // or add 9 possibility boards for each number so that you can put '1..9' or '.' in it
                if ('' + board[row][col] === number) {
                    return { found: true, row, col };
                }
            }
        }
        return { found: false };
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
                console.log('BOOM! incorrect update type', type);
            }

            for (let r = rowMin; r < rowMax; r++) {
                for (let c = colMin; c < colMax; c++) {
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

    for (let num = 1; num <= 9; num++) {
        for (let row = 0; row < 9; row += 3) {
            for (let col = 0; col < 9; col += 3) {
                let res = findNumber(board, num, 'block', row, col);
                if (res.found) {
                    update(possible, res.row, res.col, num, 'block', 'found');
                    update(possible, res.row, res.col, num, 'row', 'found');
                    update(possible, res.row, res.col, num, 'col', 'found');
                }
            }
        }
    }
    console.log('possible:', possible);
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
];

tests.forEach(test => {
    let res = solveSudoku(test.board);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
