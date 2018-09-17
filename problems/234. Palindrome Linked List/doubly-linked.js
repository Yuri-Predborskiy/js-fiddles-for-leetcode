const {ListNode, createLinkedList} = require('../helper');

/*
    Add a "back" link to linked list, making it doubly linked list.
    Definition of the problem requires the following:
    1. Singly linked list
    2. Is palindrome
    3. O(n) time, O(1) space

    Solution: add "prev" link, making this doubly linked list.
    Then, reach the middle of the list and then check if it is palindrome by going forward and back at the same time.
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
let isPalindrome = function(head) {
    if (!head || !head.next) {
        return true;
    }

    function addBackLinkAndReturnLength() {
        let item = head,  prev = null, len = 0;
        while (item) {
            item.prev = prev;
            prev = item;
            item = item.next;
            len++;
        }
        return len;
    }

    let len = addBackLinkAndReturnLength();
    let left = head, right = null;
    for (let i = 0; i < len; i++) {
        if (i < Math.floor(len / 2)) {
            left = left.next;
            continue;
        }
        if (i === Math.floor(len / 2)) {
            if (len % 2 === 1) {
                right = left.prev;
                left = left.next;
                continue;
            } else {
                right = left.prev;
            }
        }
        if (left.val !== right.val) return false;
        right = right.prev;
        left = left.next;
    }
    return true;
};


let listTrue = createLinkedList([1,2,2,1]);
let listFalse = createLinkedList([1,2]);

let tests = [
    { head: createLinkedList([]), ans: true },
    { head: listTrue, ans: true },
    { head: listFalse, ans: false },
];

tests.forEach(test => {
    let res = isPalindrome(test.head);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
