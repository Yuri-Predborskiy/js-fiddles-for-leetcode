/*
Flatten multilevel doubly linked list

Recursive solution
When encountering a node with a child node, pull out linked list tail from child list
Insert pulled list between current node and next node in-place by updating next-prev pointers
Recursively check children for children and repeat procedure

Note: the program does not have cycle protection
In case of cycle, it will crash when it runs out of recursion stack calls

Time complexity: O(n), single-pass
Space complexity: O(1) outside of recursion stack
 */

const {createMultiLevelLinkedList, linkedListToString} = require('../helper');

/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
let flatten = function(head) {
    function getTail(node) {
        let prev = node;
        while (node) {
            if (node.child) {
                flattenChild(node);
            }
            prev = node;
            node = node.next;
        }
        return prev;
    }

    function flattenChild(node) {
        const newTail = getTail(node.child);
        const oldTail = node.next;
        node.next = node.child;
        node.child = null;
        node.next.prev = node;
        newTail.next = oldTail;
        if (oldTail) {
            oldTail.prev = newTail;
        }
    }

    getTail(head);
    return head;
};

let tests = [
    {
        params: [createMultiLevelLinkedList([1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12])],
        ans: [1,2,3,7,8,11,12,9,10,4,5,6].join('->')
    },
];

tests.forEach(test => {
    let res = linkedListToString(flatten(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
