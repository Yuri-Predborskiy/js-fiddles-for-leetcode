const {convertArrayToBinaryTree} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let diameterOfBinaryTree = function(root) {
    if (!root) {
        return 0;
    }
    let maxDepth = 0;
    const stack = [root], dict = new Map();
    dict.set(null, -1); // depth of null is -1, depth of node with null as children is {max(-1, -1) + 1 = 0}
    while (stack.length) {
        let node = stack.pop();
        if (!dict.has(node)) {
            stack.push(node);
        }
        if (!dict.has(node.right)) {
            stack.push(node.right);
        }
        if (!dict.has(node.left)) {
            stack.push(node.left);
        }
        if (dict.has(node.left) && dict.has(node.right)) {
            const left = dict.get(node.left),
                right = dict.get(node.right),
                nodeMaxDepth = left + 1 + right + 1;
            if (nodeMaxDepth > maxDepth) {
                maxDepth = nodeMaxDepth;
            }
            dict.set(node, Math.max(left, right) + 1);
        }
    }

    return maxDepth;
};
let tests = [
    {
        params: [convertArrayToBinaryTree([1,2,3,null,null,4,5])],
        ans: 3,
    },
    {
        params: [convertArrayToBinaryTree([1])],
        ans: 0,
    },
    {
        params: [convertArrayToBinaryTree([1,2,3])],
        ans: 2,
    },
    {
        params: [convertArrayToBinaryTree([1,2])],
        ans: 1,
    },
    {
        params: [convertArrayToBinaryTree([1,2,3,null,4,5,null,null,null,6,null,7,8,null,null,null,9])],
        ans: 6,
    },
];

tests.forEach(test => {
    let res = diameterOfBinaryTree(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
