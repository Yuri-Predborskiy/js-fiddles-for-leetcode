/*
Sort list
Sort singly linked list using constant space within O(n*log(n)) time complexity
The solution is using a merge sort
Typically merge sort would require O(log(n)) space for recursion.
Current solution merges list items iteratively by rebuilding linked list from existing nodes, no recursion used
This requires O(log(n)) passes over input, performing O(n) operations at each step
Total time complexity is O(n * log(n))
This allows us to keep space complexity at O(1) compared to recursive algorithm's O(log(n)) space complexity

Time complexity: O(n*log(n))
Space complexity: O(1)

Inspired by stupidbird911's java solution:
https://leetcode.com/problems/sort-list/discuss/46723/Super-easy-to-understand-Java-iterative-merge-sort-using-O(1)-space
I made small modifications in the algorithm to facilitate code reuse
 */

const {
    ListNode,
    createLinkedList,
    linkedListToString,
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
let sortList = function(head) {
    function mergeSortLists(left, right) {
        const tempHead = new ListNode(0);
        let mergedTail = tempHead;
        while (left && right) {
            if (left.val < right.val) {
                mergedTail.next = left;
                left = left.next;
            } else {
                mergedTail.next = right;
                right = right.next;
            }
            mergedTail = mergedTail.next;
        }
        mergedTail.next = left ? left : right;
        return tempHead.next;
    }

    function getTail(head, length = Infinity) {
        let counter = 1;
        while (head.next && counter < length) {
            head = head.next;
            counter++;
        }
        return head;
    }

    function sortAndMergeParts(head, length) {
        let tempHead = new ListNode(0);
        let mergeTail = tempHead;
        while (head) {
            let left = head;
            let leftTail = getTail(left, length);
            let right = leftTail.next;
            if (!right) {
                mergeTail.next = left;
                break;
            }
            let rightTail = getTail(right, length);
            head = rightTail.next;

            leftTail.next = null;
            rightTail.next = null;
            mergeTail.next = mergeSortLists(left, right);
            mergeTail = getTail(mergeTail.next);
        }
        return tempHead.next;
    }

    if (!head || !head.next) {
        return head;
    }

    let length = 0;
    for (let node = head; node !== null; node = node.next) {
        length++;
    }

    let partLength = 1;
    while (partLength < length) {
        head = sortAndMergeParts(head, partLength);
        partLength *= 2;
    }

    return head;
};

let tests = [
    {
        params: [createLinkedList([4,2,1,3])],
        ans: linkedListToString(createLinkedList([1,2,3,4]))
    },
    {
        params: [createLinkedList([-1,5,3,4,0])],
        ans: linkedListToString(createLinkedList([-1,0,3,4,5]))
    },
];

tests.forEach(test => {
    let res = linkedListToString(sortList(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
