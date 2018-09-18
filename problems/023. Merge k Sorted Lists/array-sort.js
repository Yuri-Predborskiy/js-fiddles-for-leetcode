const {ListNode, compareLinkedLists, createLinkedList, linkedListToString} = require('../helper');

/*
    Merge arbitrary number of sorted linked lists
    Grab values, put them into array. Sort array
    Time complexity: O(n*log(n)) for sorting the array
    Space complexity: O(n)
    Run time: under 100 ms (fast)
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeKLists = function(lists) {
    if (lists.length === 0) return null;

    let values = [];
    for (let i = 0; i < lists.length; i++) {
        while(lists[i]) {
            values.push(lists[i].val);
            lists[i] = lists[i].next;
        }
    }
    values.sort((a, b) => a - b);
    let node = values.length ? new ListNode(values[0]) : null;
    let head = node;
    for (let i = 1; i < values.length; i++) {
        node.next = new ListNode(values[i]);
        node = node.next;
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
