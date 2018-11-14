/**
 * @param {string[][]} grid
 * @return {number}
 */
let numIslands = function(grid) {
    function processIsland(startIndex) {
        islands++;
        let lands = [];
        lands.push(startIndex);
        visited[startIndex] = true;
        while (lands.length > 0) {
            let i = lands.pop();
            let {row, col} = indexToRowCol(i);
            if (isUnvisitedLand(row, col - 1)) { // left
                lands.push(i - 1);
                visited[i - 1] = true;
            }
            if (isUnvisitedLand(row - 1, col)) { // up
                lands.push(i - columnLength);
                visited[i - columnLength] = true;
            }
            if (isUnvisitedLand(row, col + 1)) { // right
                lands.push(i + 1);
                visited[i + 1] = true;
            }
            if (isUnvisitedLand(row + 1, col)) { // down
                lands.push(i + columnLength);
                visited[i + columnLength] = true;
            }
        }
    }


    function indexToRowCol(i) {
        return {row: Math.floor(i / columnLength), col: i % columnLength};
    }

    function isUnvisitedLand(row, col) {
        return (
            row < grid.length &&
            row >= 0 &&
            col < grid[0].length &&
            col >= 0 &&
            !visited[col + row * columnLength] &&
            grid[row][col] === '1'
        );
    }

    if (grid.length === 0) {
        return 0;
    }

    let visited = [], islands = 0;
    let columnLength = grid[0].length, maxLength = grid.length * columnLength;
    for (let i = 0; i < maxLength; i++) {
        let {row, col} = indexToRowCol(i);
        if (isUnvisitedLand(row, col)) {
            processIsland(i);
        }
    }

    return islands;
};

let tests = [
    {
        params: [
            [
                ['1', '1', '1', '1'],
                ['1', '1', '1', '1'],
                ['1', '1', '0', '0'],
                ['1', '1', '0', '1'],
            ]
        ],
        ans: 2,
    },
    {
        params: [
            [
                ['1','0','0','1','1','1','0','1','1','0','0','0','0','0','0','0','0','0','0','0'],
                ['1','0','0','1','1','0','0','1','0','0','0','1','0','1','0','1','0','0','1','0'],
                ['0','0','0','1','1','1','1','0','1','0','1','1','0','0','0','0','1','0','1','0'],
                ['0','0','0','1','1','0','0','1','0','0','0','1','1','1','0','0','1','0','0','1'],
                ['0','0','0','0','0','0','0','1','1','1','0','0','0','0','0','0','0','0','0','0'],
                ['1','0','0','0','0','1','0','1','0','1','1','0','0','0','0','0','0','1','0','1'],
                ['0','0','0','1','0','0','0','1','0','1','0','1','0','1','0','1','0','1','0','1'],
                ['0','0','0','1','0','1','0','0','1','1','0','1','0','1','1','0','1','1','1','0'],
                ['0','0','0','0','1','0','0','1','1','0','0','0','0','1','0','0','0','1','0','1'],
                ['0','0','1','0','0','1','0','0','0','0','0','1','0','0','1','0','0','0','1','0'],
                ['1','0','0','1','0','0','0','0','0','0','0','1','0','0','1','0','1','0','1','0'],
                ['0','1','0','0','0','1','0','1','0','1','1','0','1','1','1','0','1','1','0','0'],
                ['1','1','0','1','0','0','0','0','1','0','0','0','0','0','0','1','0','0','0','1'],
                ['0','1','0','0','1','1','1','0','0','0','1','1','1','1','1','0','1','0','0','0'],
                ['0','0','1','1','1','0','0','0','1','1','0','0','0','1','0','1','0','0','0','0'],
                ['1','0','0','1','0','1','0','0','0','0','1','0','0','0','1','0','1','0','1','1'],
                ['1','0','1','0','0','0','0','0','0','1','0','0','0','1','0','1','0','0','0','0'],
                ['0','1','1','0','0','0','1','1','1','0','1','0','1','0','1','1','1','1','0','0'],
                ['0','1','0','0','0','0','1','1','0','0','1','0','1','0','0','1','0','0','1','1'],
                ['0','0','0','0','0','0','1','1','1','1','0','1','0','0','0','1','1','0','0','0']
            ],
        ],
        ans: 58
    },
    {
        params: [
            [
                ["1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","0","1","0","1","1"],
                ["0","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","0"],
                ["1","0","1","1","1","0","0","1","1","0","1","1","1","1","1","1","1","1","1","1"],
                ["1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
                ["1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
                ["1","0","1","1","1","1","1","1","0","1","1","1","0","1","1","1","0","1","1","1"],
                ["0","1","1","1","1","1","1","1","1","1","1","1","0","1","1","0","1","1","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
                ["0","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
                ["1","1","1","1","1","0","1","1","1","1","1","1","1","0","1","1","1","1","1","1"],
                ["1","0","1","1","1","1","1","0","1","1","1","0","1","1","1","1","0","1","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","0"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","0"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
                ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]
            ],
        ],
        ans: 1
    },
    {
        params: [
            [
                ['0','1','0'],
                ['1','0','1'],
                ['0','1','0'],
            ],
        ],
        ans: 4
    },
    {
        params: [
            [
                ['1','1','1','1','0'],
                ['1','1','0','1','0'],
                ['1','1','0','0','0'],
                ['0','0','0','0','0'],
            ],
        ],
        ans: 1
    },
    {
        params: [
            [
                ['1','1','1','1','0'],
                ['1','1','0','1','0'],
                ['1','1','0','0','1'],
                ['0','0','1','1','1'],
            ],
        ],
        ans: 2
    },
    {
        params: [
            [
                ['1','1','0','0','0'],
                ['1','1','0','0','0'],
                ['0','0','1','0','0'],
                ['0','0','0','1','1'],
            ],
        ],
        ans: 3 // 3 separate groups of 1s that have 0 around them (up left right bottom)
    },
];

tests.forEach(test => {
    let res = numIslands(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
