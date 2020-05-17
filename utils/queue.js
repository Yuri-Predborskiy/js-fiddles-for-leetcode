const ListNode = require('./list-node');
const LinkedList = require('./linked-list-pure'); // singly linked list

/**
 * Classic Queue implementation based on linked list, with 3 functions: enqueue, dequeue and isEmpty
 * @constructor
 */
function Queue() {
    this.list = new LinkedList();
}

/**
 * Append value at the end of queue
 * @param val {*}
 */
Queue.prototype.enqueue = function(val) {
    this.list.appendAtTail(new ListNode(val));
};

/**
 * Delete and return value at the start of the queue
 * @returns {*}
 */
Queue.prototype.dequeue = function() {
    return this.list.popAtHead().val;
};

/**
 * Check if queue has any elements
 * @returns {boolean}
 */
Queue.prototype.isEmpty = function() {
    return this.list.isEmpty();
};

module.exports = Queue;
