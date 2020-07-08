/*
Partition list
Move all elements smaller than the target before elements >= target

Solution using two linked lists
Create two separate linked lists
One list will contain all nodes below target, the rest goes into second list
When you reach the end of the list, update next pointers:
- small list next points at large list fake head.next
- large list next points at null

This way we simply break down the list and re-position all elements in desired order

Time complexity: O(n)
Space complexity: O(1) since we only need to list heads, regardless of input size
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
 * @param {number} x
 * @return {ListNode}
 */
let partition = function(head, x) {
    if (!head) {
        return head;
    }
    const smallHead = new ListNode(0);
    let smallNode = smallHead;
    const largeHead = new ListNode(0);
    let largeNode = largeHead;
    let node = head;
    while (node) {
        if (node.val < x) {
            smallNode.next = node;
            smallNode = node;
        } else {
            largeNode.next = node;
            largeNode = node;
        }
        node = node.next;
    }
    largeNode.next = null;
    smallNode.next = largeHead.next;
    return smallHead.next;
};

let tests = [
    {params: [createLinkedList([1,4,3,2,5,2]), 3], ans: linkedListToString(createLinkedList([1,2,2,4,3,5]))},
    {params: [createLinkedList([1]), 3], ans: linkedListToString(createLinkedList([1]))},
    {params: [createLinkedList([5,3,4]), 3], ans: linkedListToString(createLinkedList([5,3,4]))},
    {params: [createLinkedList([5,2]), 3], ans: linkedListToString(createLinkedList([2,5]))},
];

tests.forEach(test => {
    let res = linkedListToString(partition(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
