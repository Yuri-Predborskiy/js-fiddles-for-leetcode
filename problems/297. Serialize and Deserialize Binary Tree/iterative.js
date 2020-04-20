const {TreeNode, convertArrayToBinaryTree, convertBinaryTreeToArray, compareArrays} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    const output = [];
    const stack = [];
    const visited = new Set([null]);

    if (root) {
        stack.push(root);
    }

    while (stack.length > 0) {
        const node = stack.pop();

        if (visited.has(node)) {
            output.push(node ? node.val : '#');
            continue;
        }
        visited.add(node);

        stack.push(node.right);
        stack.push(node.left);
        stack.push(node);
    }

    return output.join();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    function addBranch(root, branch) {
        if (index >= array.length) {
            return;
        }
        stack.push({root, branch});
    }

    if (!data.length) {
        return null;
    }
    const array = data.split(',').map(value => value === '#' ? null : Number.parseInt(value));

    let tree = new TreeNode(array[0]), index = 0, stack = [];
    // for stack (LIFO) and binary tree, right branch should be added first
    addBranch(tree, 'right');
    addBranch(tree, 'left');

    while (stack.length && ++index < array.length) {
        let {root, branch} = stack.pop();
        if (array[index] === null) {
            continue;
        }
        root[branch] = new TreeNode(array[index]);
        addBranch(root[branch], 'right');
        addBranch(root[branch], 'left');
    }
    return tree;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

function main(root) {
    return deserialize(serialize(root));
}

const tree = convertArrayToBinaryTree([1,2,3]);

let tests = [
    {
        params: [tree],
        ans: convertBinaryTreeToArray(tree),
    },
    {
        params: [null],
        ans: [],
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToArray(main(...test.params));
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});