/*
Delete *all* duplicate values from sorted singly linked list

Solution using recursion
Check if current value is a duplicate (compare with next and prev)
If it is a duplicate, recursively scan the list till you reach the end
Return the first node with distinct value (different from prev and next) or null

Time complexity: O(n)
Space complexity: O(1)
 */

const {
    createLinkedList,
    linkedListToArray,
    compareArraysStrict
} = require('../helper');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = function(head) {
    function findDistinctNode(node, prev) {
        if (!node) {
            return node;
        }
        if (node.val === prev || (node.next && node.val === node.next.val)) {
            return findDistinctNode(node.next, node.val);
        }
        return node;
    }

    head = findDistinctNode(head, null);
    let node = head;
    while (node) {
        node.next = findDistinctNode(node.next, node.val);
        node = node ? node.next : node;
    }
    return head;
};

let tests = [
    {params: [createLinkedList([1,2,3,3,4,4,5])], ans: [1,2,5]},
    {params: [createLinkedList([1,1,1,2,3])], ans: [2,3]},
    {params: [createLinkedList([])], ans: []},
    {params: [createLinkedList([1])], ans: [1]},
    {params: [createLinkedList([1,2])], ans: [1,2]},
    {params: [createLinkedList([1,1])], ans: []},
    {params: [createLinkedList([1,2,2])], ans: [1]},
];

tests.forEach(test => {
    let res = linkedListToArray(deleteDuplicates(...test.params));
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
