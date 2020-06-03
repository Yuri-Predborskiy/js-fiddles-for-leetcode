/*
Swap linked list nodes in place, without changing values
Start at the end, swap left and right pointers using temp for next pointer
Return new head
New head becomes next pair's next value, which is swapped in the same manner, recursively
Since the next pair is observed before the current pair is swapped, we build recursion chain towards the end
Then, we work from the last pair back to the first pair, swapping elements in place
In the end, we return new head (same as with each pair)

Edge case: last node in the list has no pair, in this case node is not swapped, return what came in same as with null

Time complexity: O(n)
Space complexity: O(1) not counting extra space for recursion stack
 */

const {createLinkedList, linkedListToString} = require('../helper');

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
let swapPairs = function(head) {
    if (!head || !head.next) {
        return head;
    }
    let newHead = head.next;
    head.next = swapPairs(head.next.next);
    newHead.next = head;
    return newHead;
};

let tests = [
    {
        params: [createLinkedList([1, 2, 3, 4])],
        ans: linkedListToString(createLinkedList([2,1,4,3]))
    },
    {
        params: [createLinkedList([1])],
        ans: linkedListToString(createLinkedList([1]))
    },
];

tests.forEach(test => {
    let res = linkedListToString(swapPairs(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
