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
let oddEvenList = function(head) {
    if (!head) {
        return head;
    }

    let odd = head;
    let even = head.next;
    let evenFirst = even;
    while (even && even.next) {
        odd.next = even.next;
        even.next = even.next.next;
        even = even.next;
        odd = odd.next;
    }

    odd.next = evenFirst;
    return head;
};

let tests = [
    {
        params: [1,2,3,4,5],
        ans: [1,3,5,2,4],
    },
    {
        params: [1,2,3,4],
        ans: [1,3,2,4],
    },
    {
        params: [1,2,3],
        ans: [1,3,2],
    },
    {
        params: [1,2],
        ans: [1,2],
    },
    {
        params: [1],
        ans: [1],
    },
    {
        params: [],
        ans: [],
    },
];

tests.forEach(test => {
    let res = linkedListToString(oddEvenList(createLinkedList(test.params)), ',');
    let correct = res === test.ans.join(',');
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});