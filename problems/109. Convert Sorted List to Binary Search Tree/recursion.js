/*
Convert sorted linked list to binary search tree, with balanced height

Solution using recursion by converting linked list to array and splitting the array in the middle
Middle becomes root
Left tree is built recursively from elements before middle
Right tree is built recursively from elements after middle
Return root at each step, building the tree recursively, DFS-like algorithm

Time complexity: O(n) - linked list items are visited once to create array and then once again in array
Space complexity: O(n)
 */

const {
    TreeNode,
    convertArrayToBinaryTreeLevelOrderTraversal,
    convertBinaryTreeToString,
    createLinkedList
} = require('../helper');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
let sortedListToBST = function(head) {
    function makeTree(start, end) {
        if (start > end) {
            return null;
        }
        const index = Math.floor((start + end) / 2);
        const root = new TreeNode(array[index]);
        root.left = makeTree(start, index - 1);
        root.right = makeTree(index + 1, end);
        return root;
    }

    const array = [];
    let node = head;
    while (node) {
        array.push(node.val);
        node = node.next;
    }
    return makeTree(0, array.length - 1);
};

let tests = [
    {
        params: [createLinkedList([])],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                []
            )
        )
    },
    {
        params: [createLinkedList([1])],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                [1]
            )
        )
    },
    {
        params: [createLinkedList([1,2,3])],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                [2,1,3]
            )
        )
    },
    {
        params: [createLinkedList([-10,-3,0,5,9])],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                [0,-10,5,null,-3,null,9]
            )
        )
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToString(sortedListToBST(...test.params));
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
