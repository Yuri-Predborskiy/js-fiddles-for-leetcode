const {ListNode, compareLinkedLists} = require('../helper');

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let reverseList = function(head) {
    if (!head || !head.next) {
        return head;
    }
    let first = head, prev = head;
    while (head.next) {
        first = head.next;
        head.next = head.next.next;
        first.next = prev;
        prev = first;
    }
    return first;
};

let list = new ListNode('1');
list.next = new ListNode('2');
list.next.next = new ListNode('3');
list.next.next.next = new ListNode('4');
list.next.next.next.next = new ListNode('5');

let listReversed = new ListNode('5');
listReversed.next = new ListNode('4');
listReversed.next.next = new ListNode('3');
listReversed.next.next.next = new ListNode('2');
listReversed.next.next.next.next = new ListNode('1');

let tests = [
    { head: list, ans: listReversed },
];

tests.forEach(test => {
    let res = reverseList(test.head);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
