/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    console.log(l1, l2);
    let res = new ListNode(null), item, remainder = 0;
    while (l1 || l2) {
        let val = (l1.val || 0) + (l2.val || 0) + remainder;
        if (remainder > 0) remainder = 0;
        if (val >= 10) {
            val -= 10;
            remainder = 1;
        }
        if (!res.val) {
            res.val = val;
            item = res.next;
        } else if (!item) {
            item = new ListNode(val);
            item = item.next;
        }
        l1 = l1.next;
        l2 = l2.next;
    }
    return res;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}

let addBinary = function(a, b) {
    let [long, short] = a.length >= b.length ? [a, b] : [b, a];
    let shift = long.length - short.length;
    let res = [], remainder = 0;
    for (let i = long.length - 1; i >= 0; --i) {
        res[i] = Number(long[i]) + (Number(short[i - shift]) || 0) + (remainder ? remainder-- : 0);
        if (res[i] > 1) {
            remainder = Math.floor(res[i] / 2);
            res[i] = res[i] % 2;
        }
    }
    if (remainder > 0) {
        res.unshift('1');
    }
    return res.join('');
};

function makeListNode(items) {
    let list = new ListNode(items[0]);
    let item = list;
    for (let i = 1; i < items.length; i++) {
        item.next = new ListNode(items[i]);
        item = item.next;
    }
    return list;
}
let tests = [
    { l1: makeListNode([2, 4, 3]), l2: makeListNode([5, 6, 4]), ans: makeListNode([7, 0, 8]) },
];

tests.forEach(test => {
    let res = addTwoNumbers(test.l1, test.l2);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
