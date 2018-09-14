const {ListNode, createLinkedList, compareLinkedLists} = require('../helper');

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let oddEvenList = function(head) {
    if (!head || !head.next || !head.next.next) return head;
    let odd = head, even = head.next, evenHead = head.next;
    while (even && even.next) {
        odd.next = even.next;
        even.next = even.next.next;
        odd = odd.next;
        odd.next = evenHead;
        even = even.next;
    }
    return head;
};

let short = createLinkedList([1,2,3,4,5]);
let shortOddEven = createLinkedList([1,3,5,2,4]);
let oneItem = createLinkedList([1]);
let oneItemCheck = createLinkedList([1]);
let empty = null;

let tests = [
    { head: short, ans: shortOddEven },
    { head: oneItem, ans: oneItemCheck },
    { head: empty, ans: null },
];

tests.forEach(test => {
    let res = oddEvenList(test.head);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
