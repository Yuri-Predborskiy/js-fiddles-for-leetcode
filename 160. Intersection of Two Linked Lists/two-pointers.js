const ListNode = require('../helper').ListNode;

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
let getIntersectionNode = function(headA, headB) {
    function getLength(node) {
        let len = 0;
        while (node.next) {
            node = node.next;
            len++;
        }
        return len;
    }

    function getListNodeByIndex(node, index) {
        let i = 0;
        while (i++ < index) {
            node = node.next;
        }
        return node;
    }

    if (!headA || !headB) return null;

    let lenLeft = getLength(headA), lenRight = getLength(headB);
    let left = getListNodeByIndex(lenLeft > lenRight ? headA : headB, Math.abs(lenLeft - lenRight));
    let right = lenLeft > lenRight ? headB : headA;
    while (left) {
        if (left === right) return right;
        left = left.next;
        right = right.next;
    }
    return null;
};

let listZero = new ListNode('zero');

let listOne = new ListNode('k');
listOne.next = new ListNode('j');
listOne.next.next = new ListNode('common1');
listOne.next.next.next = new ListNode('common2');

let listTwo = new ListNode('a');
listTwo.next = new ListNode('b');
listTwo.next.next = listOne.next.next;

let listThree = new ListNode(1);
listThree.next = new ListNode(2);
listThree.next.next = new ListNode(3);

let tests = [
    { head1: listZero, head2: listZero, ans: listZero },
    { head1: listOne, head2: listTwo, ans: listOne.next.next },
    { head1: listOne, head2: listThree, ans: null },
];

tests.forEach(test => {
    let res = getIntersectionNode(test.head1, test.head2);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
