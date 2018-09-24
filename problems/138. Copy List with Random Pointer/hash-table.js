const {RandomListNode, compareRandomLinkedLists, createRandomLinkedList, randomLinkedListToString} = require('../helper');

/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
let copyRandomList = function(head) {
    if (!head) return null;

    let original = head, copy = new RandomListNode(original.label), copyHead = copy;
    let dict = new Map();
    dict.set(null, null);
    dict.set(original, copy);
    while (original.next) {
        copy.next = new RandomListNode(original.next.label);
        dict.set(original.next, copy.next);
        original = original.next;
        copy = copy.next;
    }
    original = head;
    copy = copyHead;
    while (original) {
        copy.random = dict.get(original.random);
        original = original.next;
        copy = copy.next;
    }
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

let tests = [
    { head: list, ans: anotherList },
];

tests.forEach(test => {
    // test random pointers manually via debugging
    let res = copyRandomList(test.head);
    let correct = compareRandomLinkedLists(res, test.ans);
    console.log('expected:', randomLinkedListToString(test.ans), '| calculated:', randomLinkedListToString(res), '| result is', correct ? 'CORRECT' : 'WRONG!');
});
