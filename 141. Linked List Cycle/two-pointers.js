/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
let hasCycle = function(head) {
    if (!head || !head.next) {
        return false;
    }
    let fast = head.next.next;
    let slow = head.next;
    while (fast && fast.next) {
        if (fast === slow) return true;
        fast = fast.next.next;
        slow = slow.next;
    }
    return false;
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
    { head: listWithCycleShort, ans: true },
    { head: listWithCycle, ans: true },
    { head: listWithoutCycle, ans: false },
];

tests.forEach(test => {
    let res = hasCycle(test.head);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});


