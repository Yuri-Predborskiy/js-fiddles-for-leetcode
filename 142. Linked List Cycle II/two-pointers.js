const ListNode = require('../helper').ListNode;

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let detectCycle = function(head) {
    if (!head || !head.next) {
        return null;
    }

    let hasCycle = false;
    let fast = head.next.next;
    let slow = head.next;

    while (fast && fast.next) {
        if (fast === slow) {
            hasCycle = true;
            break;
        }
        fast = fast.next.next;
        slow = slow.next;
    }

    if (!hasCycle) {
        return null;
    }

    slow = head;
    while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
};

let listWithCycle = new ListNode(1);
listWithCycle.next = new ListNode(2);
listWithCycle.next.next = new ListNode(3);
listWithCycle.next.next.next = listWithCycle.next;

let listWithCycleShort = new ListNode(1);
listWithCycleShort.next = listWithCycleShort;

let listWithoutCycle = new ListNode(1);
listWithoutCycle.next = new ListNode(2);
listWithoutCycle.next.next = new ListNode(3);

let tests = [
    { head: listWithCycleShort, ans: listWithCycleShort },
    { head: listWithCycle, ans: listWithCycle.next },
    { head: listWithoutCycle, ans: null },
];

tests.forEach(test => {
    let res = detectCycle(test.head);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
