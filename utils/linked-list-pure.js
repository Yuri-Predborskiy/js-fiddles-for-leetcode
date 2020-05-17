const ListNode = require('./list-node');

function LinkedList() {
    this.head = this.tail = null;
}

/**
 * Append a new node at head
 * @param node {ListNode}
 */
LinkedList.prototype.appendAtHead = function(node) {
    if (!this.head) {
        this.head = this.tail = node;
        return;
    }

    node.next = this.head;
    this.head = node;
};

/**
 * Append a new node at tail
 * @param node {ListNode}
 */
LinkedList.prototype.appendAtTail = function(node) {
    if (!this.tail) {
        this.head = this.tail = node;
        return;
    }

    this.tail.next = node;
    this.tail = node;
};

/**
 * Delete a node. Find the node in the list, then set prev.next to node.next, skipping over the node
 * @param node
 */
LinkedList.prototype.delete = function(node) {
    if (!node) {
        return node;
    }
    if (node === this.head) {
        this.head = node.next;
        if (!this.head) {
            this.tail = this.head;
        }
        return;
    }

    let current = this.head, last;
    while (current !== node) {
        last = current;
        current = current.next;
    }
    last.next = current.next;
    if (node === this.tail) {
        this.tail = last;
    }
};

/**
 * Peek at node that is at head
 * @returns {null|ListNode}
 */
LinkedList.prototype.peekAtHead = function() {
    return this.head;
};

/**
 * Peek at node at tail
 * @returns {null|ListNode}
 */
LinkedList.prototype.peekAtTail = function() {
    return this.tail;
};

/**
 * Remove and return node at head
 * @returns {null|ListNode}
 */
LinkedList.prototype.popAtHead = function() {
    const node = this.head;
    if (!node) {
        return node;
    }
    this.delete(node);
    return node;
};

/**
 * Remove and return node at tail
 * @returns {null|ListNode}
 */
LinkedList.prototype.popAtTail = function() {
    const node = this.tail;
    if (!node) {
        return node;
    }
    this.delete(node);
    return node;
};

LinkedList.prototype.isEmpty = function() {
    return this.head === null;
};

/**
 * Create a clone of the current linked list and return it
 * @returns {null|LinkedList}
 */
LinkedList.prototype.clone = function() {
    const list = new LinkedList();
    let node = this.head;
    while (node) {
        list.appendAtTail(new ListNode(node.val));
        node = node.next;
    }
    return list;
};

/**
 * Copy all elements of another linked list to current linked list. Shallow copy
 * @param list {LinkedList}
 */
LinkedList.prototype.appendListAtTail = function(list) {
    let node = list.head;
    while (node) {
        this.appendAtTail(new ListNode(node.val));
        node = node.next;
    }
};

module.exports = LinkedList;
