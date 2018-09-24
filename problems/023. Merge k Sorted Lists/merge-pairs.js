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

    if (!l1) return l2;
    if (!l2) return l1;

    let combined = null, head = null;
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            l1 = addNode(combined, l1);
        } else {
            l2 = addNode(combined, l2);
        }
    }
    if (l2) {
        combined.next = l2;
    } else if (l1) {
        combined.next = l1;
    }
    return head;
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeKLists = function(lists) {
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];

    let results = [];
    while (lists.length > 1) {
        for (let i = 0; i < lists.length; i += 2) {
            let merged = i + 1 < lists.length ? mergeTwoLists(lists[i], lists[i + 1]) : lists[i];
            results.push(merged);
        }
        lists = results;
        results = [];
    }

    return lists[0];
};

let lists = [
    createLinkedList([1,4,5]),
    createLinkedList([1,3,4]),
    createLinkedList([2,6,9,9]),
    null,
];
let combined = createLinkedList([1,1,2,3,4,4,5,6,9,9]);

let tests = [
    { lists, ans: combined },
];

tests.forEach(test => {
    let res = mergeKLists(test.lists);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', linkedListToString(test.ans), '| calculated:', linkedListToString(res), '| result is', correct ? 'CORRECT' : 'WRONG!');
});
