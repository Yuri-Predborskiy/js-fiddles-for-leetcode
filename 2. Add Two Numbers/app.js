const {compareLinkedLists, ListNode, makeListNode} = require('../helper');

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let res = new ListNode(null), item = res, remainder = 0, prev;
    while (l1 || l2) {
        item.val = (l1.val || 0) + (l2.val || 0) + remainder;
        if (remainder > 0) remainder = 0;
        if (item.val >= 10) {
            item.val -= 10;
            remainder = 1;
        }
        item.next = new ListNode(null);
        prev = item;
        item = item.next;
        l1 = l1.next;
        l2 = l2.next;
    }
    prev.next = null;
    return res;
};


let tests = [
    { l1: makeListNode([2, 4, 3]), l2: makeListNode([5, 6, 4]), ans: makeListNode([7, 0, 8]) },
];

tests.forEach(test => {
    let res = addTwoNumbers(test.l1, test.l2);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
