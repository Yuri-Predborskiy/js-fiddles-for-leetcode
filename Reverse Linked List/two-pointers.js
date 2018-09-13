const ListNode = require('../helper').ListNode;

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head || !head.next) {
        return head;
    }
    // go over the linked list, making each node the new head node, setting each node's next node to previous head
    // todo: fix bugs
    let node = head.next, last = head;
    while (node) {
        head = node;
        node = node.next;
        last.next = last.next.next;
        head.next = last;
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
    let res = reverseList(test.head);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
