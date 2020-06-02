/*
Delete node in a linked list, given access to that node only. Node won't be tail.

Simply replace node val with next node's val and set node.next to node.next.next
Basically, replace node with next node and drop next node
In a linked list only the values have meaning, while the "connecting tissue" can be safely discarded
In this case we "move" next value in a linked list into the current node and "unlink" the next node altogether.
Normally you'd expect previous value to be linked to the next node, skipping this node, but it is only possible
    if you have access to the previous node. If you don't, you can still delete a node that is not tail using this trick

Time complexity: O(n)
Space complexity: O(1)
 */

const {createLinkedList, linkedListToString} = require('../helper');

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
let deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

let tests = [
    {
        params: [createLinkedList([4,5,1,9]), 5],
        ans: linkedListToString(createLinkedList([4,1,9]))
    },
];

tests.forEach(test => {
    // unique test setup is required
    const list = test.params[0];
    const nthNode = getListNodeByValue(list, test.params[1]);
    // function does not return result, we have to compare original input with expected result
    deleteNode(nthNode);
    const res = linkedListToString(list);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

function getListNodeByValue(root, val) {
    let node = root;
    while (node && node.val !== val) {
        node = node.next;
    }
    return node;
}