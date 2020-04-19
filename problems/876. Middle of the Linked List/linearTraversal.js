const {ListNode, compareLinkedLists, createLinkedList} = require('../helper');

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let middleNode = function(head) {
    let listLength = 1, node = head, position = 1, middle;
    while (node.next) {
        node = node.next;
        listLength++;
    }
    middle = Math.floor(listLength / 2) + 1;
    console.log('node is', node, 'length is', listLength, 'middle is', middle);
    node = head;
    while (position++ < middle) {
        node = node.next;
    }
    return node;
};

const listOne = createLinkedList([1]);
const listShort = createLinkedList([1,2,3,4,5]);
const listLong = createLinkedList([1,2,3,4,5,6]);
let tests = [
    {
        params: [listOne],
        ans: listOne,
    },
    {
        params: [listShort],
        ans: listShort.next.next,
    },
    {
        params: [listLong],
        ans: listLong.next.next.next,
    },
];

tests.forEach(test => {
    let res = middleNode(...test.params);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', test.ans.val, '| calculated:', res.val, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
