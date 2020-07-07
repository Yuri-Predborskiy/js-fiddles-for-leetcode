/*
Given a grid with a single island, find perimeter of the grid

Solution using pure Math
When you find an island, add 4 perimeter items
If island is not the top row, look up. If above it is another island, subtract 2 from perimeter
If island is not at the first column, look left. If left is an island, subtract 2 from perimeter

This approach allows us to simplify perimeter calculation significantly.
We simply find all island tiles and treat them as surrounded by water at all sides.
If we were wrong and there is a land tile above or to the left of current tile, subtract 2 from perimeter.
One for the tile we're looking at, another for the neighbour tile, since they both have 1 side that is not water.

This improves performance compared to graph traversal algorithms as we limit the number of neighbors we visit by half
Big-O time complexity doesn't change
This approach also removes the need for marking cells as "visited", improving space complexity

Time complexity: O(n*m)
Space complexity: O(1)

Solution can be simplified considering limitations of the task
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
let islandPerimeter = function(grid) {
    let perimeter = 0;
    const rows = grid.length;
    const columns = grid[0].length;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (grid[row][col] === 0) {
                continue;
            }
            perimeter += 4;
            if (grid[row][col - 1] === 1) {
                perimeter -= 2;
            }
            if (row && grid[row - 1][col] === 1) {
                perimeter -= 2;
            }
        }
    }
    return perimeter;
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
