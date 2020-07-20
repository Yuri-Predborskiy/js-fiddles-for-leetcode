/*
Remove elements from linked list

Remove elements by updating next pointers
If undesired element is at the head, update head pointer
Otherwise update next pointer

Time complexity: O(n)
Space complexity: O(1)
 */

const {ListNode, createLinkedList, linkedListToString} = require('../helper');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
let removeElements = function(head, val) {
    while (head && head.val === val) {
        head = head.next;
    }
    if (!head) {
        return head;
    }
    let node = head.next;
    let prev = head;
    while (node) {
        while (node && node.val === val) {
            prev.next = node.next;
            node = node.next;
        }
        if (node) {
            prev = node;
            node = node.next;
        }
    }
    return head;
};

let tests = [
    {params: [createLinkedList([1,2,6,3,4,5,6]), 6], ans: [1,2,3,4,5].join('->')},
    {params: [createLinkedList([1]), 1], ans: [].join('->')},
];

tests.forEach(test => {
    let res = linkedListToString(removeElements(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
