/*
    Time complexity: O(n)
    Space complexity: O(n) (sort of, we keep a collection of pointers looking at every index)
 */
const ListNode = require('../helper').ListNode;

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let removeNthFromEnd = function(head, n) {
    if (!head.next) {
        return null;
    }
    let nodes = [], node = head;
    while (node) {
        nodes.push(node);
        node = node.next;
    }
    if (n === nodes.length) {
        return nodes[1];
    } else {
        nodes[nodes.length - n - 1].next = nodes[nodes.length - n].next;
    }
    return head;
};

let list = new ListNode('1');
list.next = new ListNode('2');
list.next.next = new ListNode('3');
list.next.next.next = new ListNode('4');
list.next.next.next.next = new ListNode('5');

let tests = [
    { head: list, n: 2, ans: list },
];

tests.forEach(test => {
    let res = removeNthFromEnd(test.head, test.n);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
