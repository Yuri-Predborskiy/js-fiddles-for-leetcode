const {ListNode, createLinkedList, linkedListToString} = require('../helper');

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
let removeElements = function(head, val) {
    if (!head) return head;
    let prev = head, next = head.next;
    while(next) {
        if (next && next.val === val) {
            prev.next = prev.next.next;
            next = prev.next;
        } else {
            prev = next;
            next = next.next;
        }
    }

    if (head.val === val) {
        if (head.next) {
            return head.next;
        } else {
            return null;
        }
    }

    return head;
};

let tests = [
    {params: [createLinkedList([1,2,6,3,4,5,6]), 6], ans: [1,2,3,4,5].join('->')},
    {params: [createLinkedList([1]), 1], ans: [].join('->')},
];

tests.forEach(test => {
    let res = linkedListToString(removeElements(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
