/*
Preorder traversal puts root of every node in the first place
So take the first item as root and iterate over the remaining items in the array, putting each next item into new root
Starting limits are -Inf, +Inf, starting root is first element, starting index is 1. Put it all into stack
If current preorder element is smaller than root, put it into the left sub-tree, set upper limit to root, keep lower
If current preorder element is bigger than root, put it into the right sub-tree, set lower limit to root, keep upper
Push node and current limits into the stack (revisit this node after processing the child)
Push new child and new limits into the stack
If next element in preorder array does not fit into stack, continue (take next element from stack and try again)
At some point we'll find an element we can push into either left or right tree

Drawbacks compared to recursion: harder to implement
Benefits compared to recursion: no recursion stack overflow

Time complexity: O(n), nodes are revisited up to 3 times - adding left child, adding right child, skipping node
Space complexity: O(n) for stack
 */

const {TreeNode, convertArrayToBinaryTree, convertBinaryTreeToString} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
let bstFromPreorder = function(preorder) {
    if (preorder.length < 1) {
        return null;
    }

    const root = new TreeNode(preorder[0]);
    const stack = [[root, -Infinity, Infinity]];
    let index = 1;
    while (stack.length > 0 && index < preorder.length) {
        const [node, lower, upper] = stack.pop();
        if (preorder[index] > upper || preorder[index] < lower) {
            continue;
        }
        if (preorder[index] < node.val) {
            node.left = new TreeNode(preorder[index]);
            stack.push([node, lower, upper]);
            stack.push([node.left, lower, node.val]);
        } else {
            node.right = new TreeNode(preorder[index]);
            stack.push([node, lower, upper]);
            stack.push([node.right, node.val, upper]);
        }
        index++;
    }
    return root;
};

let tests = [
    {
        params: [[8,5,1,7,10,12]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree([8,5,1,null,null,7,null,null,10,null,12])),
    },
    {
        params: [[8,5,1,0,3,7,6,10,9,12,11,18]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree(
            [8,5,1,0,null,null,3,null,null,7,6,null,null,null,10,9,null,null,12,11,null,null,18]
        )),
    },
    {
        params: [[1]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree([1])),
    },
    {
        params: [[1,2]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree([1,null,2])),
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToString(bstFromPreorder(...test.params));
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
