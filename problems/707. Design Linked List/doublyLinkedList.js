const { createLinkedList, compareLinkedLists, } = require('../helper');

/*
    Design doubly linked list - has next and prev pointers, head and tail pointers
 */

/**
 * Initialize your data structure here.
 */
let MyLinkedList = function() {
    this.head = null;
    this.tail = null;
    this.length = 0;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if (index >= this.length || index < 0) return -1;
    let me = this.head;
    let i = 0;
    while (i++ < index) {
        me = me.next;
    }
    return me.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    this.addAtIndex(0, val);
};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    this.addAtIndex(this.length, val);
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index < 0 || index > this.length) return;

    if (index === 0) {
        // add at head
        let node = {
            val,
            next: this.head,
            prev: null,
        };
        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
    } else if (index === this.length) {
        // add at tail
        let node = {
            val,
            next: null,
            prev: this.tail,
        };
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
    } else {
        // add in the middle
        let me = this.head;
        let i = 0;
        while (i++ < index) {
            me = me.next;
        }
        let node = {
            val,
            next: me,
            prev: me.prev,
        };
        me.prev.next = node;
        me.prev = node;
    }
    this.length++;
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (index < 0 || index >= this.length || this.length === 0) return;

    if (this.length === 1) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        return;
    }

    if (index === 0) {
        // delete at head
        this.head = this.head.next;
        this.head.prev = null;
    } else if (index === this.length - 1) {
        // delete at tail
        this.tail = this.tail.prev;
        this.tail.next = null;
    } else {
        // delete in the middle
        let me = this.head, i = 0;
        while (i++ < index) {
            me = me.next;
        }
        me.prev.next = me.next;
        me.next.prev = me.prev;
    }
    this.length--;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = Object.create(MyLinkedList).createNew()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
let linkedList = new MyLinkedList(), test, res;
linkedList.addAtHead(5);
linkedList.addAtHead(2);
test = createLinkedList([2, 5]);
res = compareLinkedLists(linkedList.head, test);
console.log('stage 1', res ? 'SUCCESS' : 'FAIL');

linkedList.deleteAtIndex(1);
test = createLinkedList([2]);
res = compareLinkedLists(linkedList.head, test);
console.log('stage 2', res ? 'SUCCESS' : 'FAIL');

linkedList.addAtIndex(1, 9);
linkedList.addAtHead(4);
linkedList.addAtHead(9);
linkedList.addAtHead(8);
test = createLinkedList([8, 9, 4, 2, 9]);
res = compareLinkedLists(linkedList.head, test);
console.log('stage 3', res ? 'SUCCESS' : 'FAIL');

test = linkedList.get(3);
res = (test === 2);
console.log('stage 4', res ? 'SUCCESS' : 'FAIL');

linkedList.addAtTail(1);
linkedList.addAtIndex(3, 6);
linkedList.addAtHead(3);

test = createLinkedList([3,8,9,4,6,2,9,1]);
res = compareLinkedLists(linkedList.head, test);
console.log('finale', res ? 'SUCCESS' : 'FAIL');
