const {ListNode, compareLinkedLists, createLinkedList, linkedListToString} = require('../helper');

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
let rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) {
        return head;
    }

    let fast = head, tail, len = 1;
    while (fast.next) {
        len++;
        fast = fast.next;
    }
    tail = fast;
    if (len <= k) {
        k = k % len;
        if (k === 0) return head;
    }
    k = len - k;

    fast = head.next;
    let slow = head;
    for (let i = 1; i < k; i++) {
        slow = fast;
        fast = fast.next;
    }
    tail.next = head;
    head = fast;
    slow.next = null;
    return head;
};

let tests = [
    { head: createLinkedList([1,2,3,4,5]), k: 2, ans: createLinkedList([4,5,1,2,3]) },
    { head: createLinkedList([1,2]), k: 2, ans: createLinkedList([1,2]) },
    { head: createLinkedList([1,2]), k: 1, ans: createLinkedList([2,1]) },
    { head: createLinkedList([0,1,2]), k: 4, ans: createLinkedList([2,0,1]) },
];

tests.forEach(test => {
    let res = rotateRight(test.head, test.k);
    let correct = compareLinkedLists(res, test.ans);
    console.log('expected:', linkedListToString(test.ans), '| calculated:', linkedListToString(res), '| result is', correct ? 'CORRECT' : 'WRONG!');
});
