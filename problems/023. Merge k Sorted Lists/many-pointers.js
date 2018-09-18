const {ListNode, compareLinkedLists, createLinkedList, linkedListToString} = require('../helper');

/*
    Merge arbitrary number of sorted linked lists
    Time complexity: O(n) (there will be O(n) comparisons)
    Space complexity: O(n) (to combine all linked lists into a single linked list without destroying inputs)
    Run time: 700ms (abysmally slow)
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeKLists = function(lists) {
    function findMinVal() {
        let min = { val: Infinity };
        for (let i = 0; i < lists.length; i++) {
            if (lists[i] && lists[i].val < min.val) {
                min = lists[i];
            }
        }
        return min.val < Infinity ? min : null;
    }
    function addNode(donor) {
        if (!combined) {
            combined = new ListNode(donor.val);
            head = combined;
        } else {
            combined.next = new ListNode(donor.val);
            combined = combined.next;
        }
        lists[lists.indexOf(donor)] = donor.next;
        return donor;
    }

    let combined = null, head = null;
    while (lists.length > 0) {
        let min = findMinVal();
        if (!min) {
            lists.splice(lists.indexOf(min), 1);
        } else {
            min = addNode(min);
        }
    }
    return head;
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
