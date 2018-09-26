const {RandomListNode, compareRandomLinkedLists, createRandomLinkedList, randomLinkedListToString} = require('../helper');

/*
    Create a copy of a random linked list "in place". This approach does not require a separate hash table, but is slower.
    Trading Time complexity for Space complexity
    Time complexity: O(3n) = O(n)
    Space complexity: O(n) (for the new list)
 */

/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
let copyRandomList = function(head) {
    if (!head) return null;

    let original = head;
    let copy = null;

    //1st pass - create copies of every node
    while (original) {
        copy = new RandomListNode(original.label);
        copy.next = original.next;
        original.next = copy;
        original = copy.next;
    }
    let copyHead = head.next;

    // 2nd pass - copy random pointers
    original = head;
    while (original) {
        copy = original.next;
        if (original.random) {
            copy.random = original.random.next;
        }
        original = original.next.next;
    }

    // 3rd pass - separate original and copy into two separate lists
    original = head;
    while (original) {
        copy = original.next;
        let temp = original.next.next;
        copy.next = temp ? copy.next.next : null;
        original.next = temp;
        original = original.next;
    }
    copy.next = null;

    return copyHead;
};


let list = createRandomLinkedList([1,2,3,4]);
list.random = list.next.next;
list.next.random = list.next.next.next;
list.next.next.random = list;
list.next.next.next.random = list.next;
let anotherList = createRandomLinkedList([1,2,3,4]);
anotherList.random = anotherList.next.next;
anotherList.next.random = anotherList.next.next.next;
anotherList.next.next.random = anotherList;
anotherList.next.next.next.random = anotherList.next;

let listWithNull = createRandomLinkedList([-1,1]);
let oneMoreListWithNull = createRandomLinkedList([-1,1]);

let tests = [
    { head: list, ans: anotherList },
    { head: listWithNull, ans: oneMoreListWithNull },
];

tests.forEach(test => {
    // test random pointers manually via debugging
    let res = copyRandomList(test.head);
    let correct = compareRandomLinkedLists(res, test.ans);
    console.log('expected:', randomLinkedListToString(test.ans), '| calculated:', randomLinkedListToString(res), '| result is', correct ? 'CORRECT' : 'WRONG!');
});
