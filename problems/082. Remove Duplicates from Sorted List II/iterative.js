const {
    createLinkedList,
    linkedListToArray,
    compareArraysStrict
} = require('../helper');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = function(head) {
    function findNextDistinct(node) {
        if (!node || !node.next || node.next.val !== node.val) {
            return node;
        }
        let prev = node.val;
        node = node.next;
        let next = node.next ? node.next.val : node.next;
        while (node.val === prev || node.val === next) {
            prev = node.val;
            node = node.next;
            if (!node) {
                break;
            }
            next = (node && node.next) ? node.next.val : node;
        }
        return node;
    }
    head = findNextDistinct(head);
    let node = head;
    while (node) {
        node.next = findNextDistinct(node.next);
        node = node ? node.next : node;
    }
    return head;
};

let tests = [
    {params: [createLinkedList([1,2,3,3,4,4,5])], ans: [1,2,5]},
    {params: [createLinkedList([1,1,1,2,3])], ans: [2,3]},
    {params: [createLinkedList([])], ans: []},
    {params: [createLinkedList([1])], ans: [1]},
    {params: [createLinkedList([1,2])], ans: [1,2]},
    {params: [createLinkedList([1,1])], ans: []},
    {params: [createLinkedList([1,2,2])], ans: [1]},
];

tests.forEach(test => {
    let res = linkedListToArray(deleteDuplicates(...test.params));
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
