/*
DFS:
Iterate over all possible paths and save the smaller sum into hash table (index: path)
Use stack to iterate over elements. BFS + queue would make more sense but queue = linked list = custom data structure
Since problem conditions prevent loops (moving only down or right), we can use either BFS and DFS interchangeably.
Time complexity O(n^2) (checking every route possible)
Space complexity: O(n) (to store minimum path sum for each point
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
let minPathSum = function(grid) {
    const map = new Map();
    const stack = [{row: 0, col: 0, pathSum: 0}];
    while (stack.length > 0) {
        let {row, col, pathSum} = stack.pop();
        let index = row * grid[0].length + col;
        pathSum = pathSum + grid[row][col];
        let sumAtIndex = map.get(index) || Infinity;
        if (pathSum >= sumAtIndex) {
            continue;
        }
        map.set(index, pathSum);
        if (col < grid[0].length - 1) {
            stack.push({row, col: col + 1, pathSum});
        }
        if (row < grid.length - 1) {
            stack.push({row: row + 1, col, pathSum});
        }
    }
    return map.get(grid.length * grid[0].length - 1);
};

let tests = [
    {
        params: [[
            [5,0,1,1,2,1,0,1,3,6,3,0,7,3,3,3,1],
            [1,4,1,8,5,5,5,6,8,7,0,4,3,9,9,6,0],
            [2,8,3,3,1,6,1,4,9,0,9,2,3,3,3,8,4],
            [3,5,1,9,3,0,8,3,4,3,4,6,9,6,8,9,9],
            [3,0,7,4,6,6,4,6,8,8,9,3,8,3,9,3,4],
            [8,8,6,8,3,3,1,7,9,3,3,9,2,4,3,5,1],
            [7,1,0,4,7,8,4,6,4,2,1,3,7,8,3,5,4],
            [3,0,9,6,7,8,9,2,0,4,6,3,9,7,2,0,7],
            [8,0,8,2,6,4,4,0,9,3,8,4,0,4,7,0,4],
            [3,7,4,5,9,4,9,7,9,8,7,4,0,4,2,0,4],
            [5,9,0,1,9,1,5,9,5,5,3,4,6,9,8,5,6],
            [5,7,2,4,4,4,2,1,8,4,8,0,5,4,7,4,7],
            [9,5,8,6,4,4,3,9,8,1,1,8,7,7,3,6,9],
            [7,2,3,1,6,3,6,6,6,3,2,3,9,9,4,4,8]
        ]],
        ans: 83,
    },
    {
        params: [[
            [1,3,1],
            [1,5,1],
            [4,2,1]
        ]],
        ans: 7,
    },
];

tests.forEach(test => {
    let res = minPathSum(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
