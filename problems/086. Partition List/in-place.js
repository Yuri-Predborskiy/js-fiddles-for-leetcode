/*
Partition list
Move all elements smaller than the target before elements >= target

Solution via moving items in-place
Find first element larger than or equal to target, firstBig
Move every element smaller than target before the firstBig

Solution moves one element at a time
It can be optimized by moving entire lists at a time (we would need to find the next big element after a small element)

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
 * @param {number} x
 * @return {ListNode}
 */
let partition = function(head, x) {
    if (!head) {
        return head;
    }
    let fakeHead = new ListNode(-Infinity);
    fakeHead.next = head;
    let node = fakeHead;
    while (node.next && node.next.val < x) {
        node = node.next;
    }
    if (node.next) {
        let tailSmall = node;
        let headLarge = node.next;

        while (node && node.next) {
            while (node.next && node.next.val >= x) {
                node = node.next;
            }
            const nextSmall = node.next;
            if (!node.next) {
                break;
            }
            node.next = node.next.next;
            tailSmall.next = nextSmall;
            nextSmall.next = headLarge;
            tailSmall = nextSmall;
        }
    }

    return fakeHead.next;
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
