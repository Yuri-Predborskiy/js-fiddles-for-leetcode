const {ListNode, createLinkedList, compareLinkedLists} = require('../helper');

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
let removeElements = function(head, val) {
    if (!head) return head;
    let prev = head, next = head.next;
    while(next) {
        if (next && next.val === val) {
            prev.next = prev.next.next;
            next = prev.next;
        } else {
            prev = next;
            next = next.next;
        }
    }

    if (head.val === val) {
        if (head.next) {
            return head.next;
        } else {
            return null;
        }
    }

    return head;
};

let list = createLinkedList([1,8,2,8,3,8,4,8,5]);
let short = createLinkedList([1,2,3,4,5]);
let oneItem = createLinkedList([1]);

let tests = [
    { head: list, val: 8, ans: short },
    { head: oneItem, val: 1, ans: null },
];

tests.forEach(test => {
    let res = removeElements(test.head, test.val);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
