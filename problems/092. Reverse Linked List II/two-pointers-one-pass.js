/*
Reverse part of the linked list. Do it in one pass

Solution using multiple pointers
Find the first node that should be reversed. Skip nodes before it
Update node's next to point at previous node for all nodes from m to n
Update node before first reversed node to point at last reversed node
    If we reversed from the start, we will create a loop here
Update last reversed node to point at next node after reversal
    If we reversed from the start, we will close the loop here, as last.next will become null
If we reversed from the start (m === 1), return prev (last updated node will become head)
Otherwise simply return head as it wasn't affected by reverse

Time complexity: O(n), we only pass over nodes once
Space complexity: O(1), all nodes reversed in place
 */

const {createLinkedList, linkedListToString} = require('../helper');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
let reverseBetween = function(head, m, n) {
    let node = head;
    let prev = node;
    let index = 1;

    while (index < m) {
        prev = node;
        node = node.next;
        index++;
    }
    let tempHead = prev; // first node before reverse (or head if m === 1)
    let tempTail = node; // last node of the reversed portion (first reversed node)
    while (index <= n) {
        let tempNextNode = node.next;
        node.next = prev;
        prev = node;
        node = tempNextNode;
        index++;
    }
    tempHead.next = prev; // last node before reversed portion should point at the last reversed node
    tempTail.next = node; // first node in reversed portion should point at the next node after reverse
    // if we reverse from the first node till the last node, we will update tail.next to null here

    if (m === 1) {
        return prev;
    }
    return head;
};

let tests = [
    {params: [createLinkedList([1,2,3,4,5]), 2, 4], ans: [1,4,3,2,5].join('->')},
    {params: [createLinkedList([1,2,3,4,5]), 1, 5], ans: [5,4,3,2,1].join('->')},
    {params: [createLinkedList([1,2,3,4,5]), 3, 5], ans: [1,2,5,4,3].join('->')},
    {params: [createLinkedList([1,2,3,4,5]), 1, 3], ans: [3,2,1,4,5].join('->')},
    {params: [createLinkedList([1,2,3,4,5]), 1, 1], ans: [1,2,3,4,5].join('->')},
    {params: [createLinkedList([1]), 1, 1], ans: [1].join('->')},
    {params: [createLinkedList([1,2]), 2, 2], ans: [1,2].join('->')},
];

tests.forEach(test => {
    let res = linkedListToString(reverseBetween(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
