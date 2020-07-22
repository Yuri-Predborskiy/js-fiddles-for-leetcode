/*
Collect values of all nodes in a binary tree using zigzag level order traversal
Zigzag means every even level (1-indexed) should contain values in reverse order

Solution using BFS-like level order traversal
First, collect level children into array
Then, process children for output in valid order
Then, replace level with children array and repeat till there are no children left

Time complexity: O(n), all nodes are visited twice - once to collect, once to save value
Space complexity: O(n)
 */

const {
    TreeNode,
    convertArrayToBinaryTreeLevelOrderTraversal,
    compareMatricesStrict,
} = require('../helper');

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
let zigzagLevelOrder = function(root) {
    if (!root) {
        return [];
    }
    let level = [root];
    const output = [[root.val]];
    let reversed = true;
    while (level.length > 0) {
        const children = [];
        for (let node of level) {
            if (node.left) {
                children.push(node.left);
            }
            if (node.right) {
                children.push(node.right);
            }
        }
        const levelOutput = [];
        if (children.length > 0) {
            if (reversed) {
                for (let i = children.length - 1; i >= 0; i--) {
                    levelOutput.push(children[i].val);
                }
            } else {
                for (let i = 0; i < children.length; i++) {
                    levelOutput.push(children[i].val);
                }
            }
            output.push(levelOutput);
        }
        level = children;
        reversed = !reversed;
    }
    return output;
};

let tests = [
    {
        params: [convertArrayToBinaryTreeLevelOrderTraversal([3,9,20,null,null,15,7])],
        ans: [[3], [20,9], [15,7]]
    },
];

tests.forEach(test => {
    let res = zigzagLevelOrder(...test.params);
    let correct = compareMatricesStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
