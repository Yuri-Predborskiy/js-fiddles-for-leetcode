/*
Use MapList data structure
Custom data structure that is a doubly-linked list with a map of nodes and a set to store unique elements
Doubly-linked list simply stores unique character indexes in the order of appearance
Map is used to find nodes in the list with O(1) update time (set, delete)
Set is used to mark elements that have been added before with O(1) read/write (get, add) time

Time complexity: O(n) - O(1) operation for each item in O(n) inputs, where n = string length
Space complexity: O(n)
 */

function MapList() {
    this.head = this.tail = null;
    this.charSet = new Set();
    this.nodeMap = new Map();
    this.size = 0;
}

MapList.prototype.addUnique = function(char, index) {
    if (this.charSet.has(char)) {
        if (!this.nodeMap.has(char)) {
            return;
        }
        const node = this.nodeMap.get(char);
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        }
        this.nodeMap.delete(char);
        this.size++;
    } else {
        const node = {val: index};
        this.nodeMap.set(char, node);
        this.charSet.add(char);
        if (this.tail) {
            node.prev = this.tail;
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
    }
};

MapList.prototype.getAtHead = function() {
    return this.head ? this.head.val : -1;
};

/**
 * @param {string} s
 * @return {number}
 */
let firstUniqChar = function(s) {
    if (!s) {
        return -1;
    }

    const map = new MapList();
    for (let i = 0; i < s.length; i++) {
        map.addUnique(s[i], i);
        if (map.size >= 26) {
            return -1; // early exit if we've found all the unique characters in alphabet twice
        }
    }

    return map.getAtHead();
};

let tests = [
    { params: ['leetcode'], ans: 0 },
    { params: ['loveleetcode'], ans: 2 },
    { params: ['ooo'], ans: -1 },
];

tests.forEach(test => {
    let res = firstUniqChar(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
