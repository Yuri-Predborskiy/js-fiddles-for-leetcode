const {ListNode, compareLinkedLists, createLinkedList, linkedListToString} = require('../helper');

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let mergeTwoLists = function(l1, l2) {
    function addNode(list, donor) {
        if (!list) {
            combined = new ListNode(donor.val);
            head = combined;
        } else {
            combined.next = new ListNode(donor.val);
            combined = combined.next;
        }
        donor = donor.next;
        return donor;
    }

    let combined = null, head = null;
    while (l1 || l2) {
        if ((l1 && l2) && (l1.val <= l2.val) || !l2) {
            l1 = addNode(combined, l1);
        } else if ((l1 && l2) && (l1.val > l2.val) || !l1) {
            l2 = addNode(combined, l2);
        }
    }
    return head;
};

let left = createLinkedList([1,2,4]);
let right = createLinkedList([1,3,4]);
let combined = createLinkedList([1,1,2,3,4,4]);

let tests = [
    { l1: left, l2: right, ans: combined },
];

tests.forEach(test => {
    let res = mergeTwoLists(test.l1, test.l2);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', linkedListToString(test.ans), '| calculated:', linkedListToString(res), '| result is', correct ? 'CORRECT' : 'WRONG!');
});
