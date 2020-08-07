/*
Build vertical order traversal of a binary tree
Vertical order traversal means tree starts at root (0:0)
    and at every level Y coordinate goes down (-1, -2)
    while X coordinate is calculated as parent's X + direction
    meaning, left child is at parent's X - 1, right child is at parent's X + 1
    if two nodes hold the same coordinate, they should come in ascending order
Limitations: there are up to 1000 nodes, each holding number from 0 to 1000

Solution using recursive DFS tree traversal
Use recursion to iterate the tree and visit every node, while passing along current coordinates
Collect every value from every coordinate into an array of results
Since root is 0 and number of nodes is up to 1000, leftmost node will be at most -1000
So if we add 1000 to every X coordinate, we will have all nodes starting at coordinate 1 at least
This allows us to use X coordinate in an array to naturally sort vertical "slices" of the tree
Next, we need to collect actual values from coordinates, and they should be sorted in case several nodes are
    in the same coordinate
Naive algorithm would be to sort the resulting sub-arrays, but this takes O(n*log(n)) time
A more optimal solution is to use limitations of the task - numbers in nodes are limited to values from 0 to 1000
So we can use each number as an index in an array and set the value to the number of repeats of the value
Then, we can go over these numbers and simply write them down into results in O(n) time
Alternative to both approaches is to use a stack to insert number at the right position, like so:
    pop from stack till next number at the top is smaller than current number, insert, put all elements back
But this would result in O(n^2) time complexity if numbers go in the opposite order
Using array as a hash table we can have O(n) time complexity (each insert takes O(1) time)

Since the algorithm is rather complex, I break down time complexity into parts
Time complexity:
    iterate over the tree to collect all node values: O(n)
    collect node values while keeping valid value ordering: O(1) for each number, O(n) total
    iterate over temp table with sorted node values: O(h + w) where h - height of the tree, w - width of the tree
Total time complexity: O(h + w) in the worst case, O(n) best case (where n - number of nodes in the tree)
Worst case: there are only left-most branch and right-most branch and nothing in between
Best case: most of the nodes are at the same X coordinates

Space complexity: O(h*w) where h - height of the tree, w - width of the tree in the widest part
 */

const {compareMatricesStrict, convertArrayToBinaryTreeLevelOrderTraversal} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let verticalTraversal = function(root) {
    function processNode(node, x, y) {
        data[x] = data[x] || [];
        data[x][y] = data[x][y] || [];
        data[x][y][node.val] = (data[x][y][node.val] || 0) + 1;
        if (node.left) {
            min = Math.min(x - 1, min);
            processNode(node.left, x - 1, y + 1);
        }
        if (node.right) {
            processNode(node.right, x + 1, y + 1);
        }
    }
    const data = [];
    let min = 1000;
    processNode(root, 1000, 0);
    const result = [];

    for (let x = min; x < data.length; x++) {
        if (!data[x]) {
            continue;
        }
        const dataAtX = data[x];
        const index = x - min;
        for (let y = 0; y < dataAtX.length; y++) {
            if (!dataAtX[y]) {
                continue;
            }
            result[index] = result[index] || [];
            const nodeValues = dataAtX[y];
            for (let i = 0; i < nodeValues.length; i++) {
                while (nodeValues[i]) {
                    result[index].push(i);
                    nodeValues[i]--;
                }
            }
        }
    }
    return result;
};

const tests = [
    {
        params: [convertArrayToBinaryTreeLevelOrderTraversal([3,9,20,null,null,15,7])],
        ans: [[9],[3,15],[20],[7]]
    },
    {
        params: [convertArrayToBinaryTreeLevelOrderTraversal([1,2,3,4,5,6,7])],
        ans: [[4],[2],[1,5,6],[3],[7]]
    },
];

for (let test of tests) {
    const res = verticalTraversal(...test.params);
    const correct = compareMatricesStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
