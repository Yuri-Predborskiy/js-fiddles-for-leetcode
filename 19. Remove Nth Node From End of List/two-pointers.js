/*
    Time complexity: O(n)
    Space complexity: O(1) (only need space for 2 pointers)
 */
const ListNode = require('../helper').ListNode;

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let removeNthFromEnd = function(head, n) {
    let fast = head, slow = head;

    for (let i = 0; i < n; i++) { // move fast pointer n steps ahead
        fast = fast.next;
    }

    if (!fast) { // remove first node
        return head.next;
    }

    while (fast.next) { // find the end of the list and a node n nodes behind the end
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next; // move previous next to next-next, effectively deleting 'slow.next' node
    return head;
};

let list = new ListNode('1');
list.next = new ListNode('2');
list.next.next = new ListNode('3');
list.next.next.next = new ListNode('4');
list.next.next.next.next = new ListNode('5');

let tests = [
    { head: list, n: 2, ans: list },
];

tests.forEach(test => {
    let res = removeNthFromEnd(test.head, test.n);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
