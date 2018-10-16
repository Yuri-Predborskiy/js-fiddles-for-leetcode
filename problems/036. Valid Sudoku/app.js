/**
 * @param {string[][]} board
 * @return {boolean}
 */
let isValidSudoku = function(board) {
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

    for (let i = 0; i < 81; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        if (board[row][col] === '.') continue;
        if (!isValid(board, row, col)) {
            return false;
        }
    }

    return true;
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
        ans: true,
    },
    {
        board: [
            ['8','3','.','.','7','.','.','.','.'],
            ['6','.','.','1','9','5','.','.','.'],
            ['.','9','8','.','.','.','.','6','.'],
            ['8','.','.','.','6','.','.','.','3'],
            ['4','.','.','8','.','3','.','.','1'],
            ['7','.','.','.','2','.','.','.','6'],
            ['.','6','.','.','.','.','2','8','.'],
            ['.','.','.','4','1','9','.','.','5'],
            ['.','.','.','.','8','.','.','7','9']
        ],
        ans: false,
    }
];

tests.forEach(test => {
    let res = isValidSudoku(test.board);
    let correct = res === test.ans; // updated in place
    console.log('expected', test.ans, 'calculated', res, 'result is', correct ? 'CORRECT' : 'WRONG!');
});
