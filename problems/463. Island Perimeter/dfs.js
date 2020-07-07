/*
Given a grid with a single island, find perimeter of the grid

Solution using DFS
First find a cell that is island, then process it using DFS algorithm
For every cell outside of the map or one that contains water, add to perimeter (because we're visiting it from land)
For every cell that is land, add it to stack and mark as visited
Skip visited cells

Time complexity: O(n*m)
Space complexity: O(n*m)

Solution can be simplified considering limitations of the task
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
let islandPerimeter = function(grid) {
    function visitIsland(startRow, startCol) {
        function visitCell(row, col) {
            if (row < 0 || row === rows || col < 0 || col === columns || grid[row][col] === 0) {
                perimeter++;
            } else if (!visited[row][col]) {
                visited[row][col] = true;
                stack.push([row, col]);
            }
        }

        let perimeter = 0;
        const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const visited = [];
        for (let i = 0; i < rows; i++) {
            visited[i] = new Array(columns);
        }
        const stack = [];
        visitCell(startRow, startCol);

        while (stack.length > 0) {
            const [row, col] = stack.pop();
            for (let [rowChange, colChange] of dirs) {
                visitCell(row + rowChange, col + colChange);
            }
        }

        return perimeter;
    }

    const rows = grid.length;
    const columns = grid[0].length;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (grid[row][col] === 1) {
                return visitIsland(row, col);
            }
        }
    }
    return 0;
};

let tests = [
    {params: [[[0,1,0,0], [1,1,1,0], [0,1,0,0], [1,1,0,0]]], ans: 16},
    {params: [[[1,1],[1,0]]], ans: 8},
    {params: [[[1]]], ans: 4},
];

tests.forEach(test => {
    let res = islandPerimeter(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
