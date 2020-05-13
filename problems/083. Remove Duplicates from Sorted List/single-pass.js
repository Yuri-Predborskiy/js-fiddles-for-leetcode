/*
Remove duplicates from sorted list - look at next value and remove it its the same value as current value

Time complexity: O(n)
Space complexity: O(1)
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
 * @return {ListNode}
 */
let deleteDuplicates = function(head) {
    let node = head;
    while (node && node.next) {
        if (node.val === node.next.val) {
            node.next = node.next.next;
            continue;
        }
        node = node.next;
    }
    return head;
};

let tests = [
    {params: [1,1,2], ans: '1,2'},
    {params: [1,1,2,3,3], ans: '1,2,3'},
    {params: [1,1,1], ans: '1'},
];

tests.forEach(test => {
    let res = linkedListToString(deleteDuplicates(createLinkedList(test.params)), ',');
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});