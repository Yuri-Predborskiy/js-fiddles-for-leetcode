function ListNode(val) {
    this.val = val;
    this.next = null;
}

function Queue() {
    this.head = this.tail = null;
}
Queue.prototype.enqueue = function(val) {
    if (this.isEmpty()) {
        this.head = this.tail = new ListNode(val);
    } else {
        this.tail.next = new ListNode(val);
        this.tail = this.tail.next;
    }
};
Queue.prototype.dequeue = function() {
    if (this.isEmpty()) {
        return null;
    }
    let val = this.head.val;
    this.head = this.head.next;
    return val;
};
Queue.prototype.isEmpty = function() {
    return this.head === null;
};

/**
 * Initialize your data structure here.
 */
var MyStack = function() {
    this.queue = new Queue();
};

MyStack.prototype.getFirstElement = function(bRemoveFirst) {
    if (this.empty()) {
        return null;
    }

    let temp = new Queue();
    let next = null;
    while (!this.empty()) {
        next = this.queue.dequeue();
        if (!this.empty() || !bRemoveFirst) {
            temp.enqueue(next);
        }
    }
    while (!temp.isEmpty()) {
        this.queue.enqueue(temp.dequeue());
    }
    return next;
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.queue.enqueue(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
    return this.getFirstElement(true);
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
    return this.getFirstElement();
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.queue.isEmpty();
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = Object.create(MyStack).createNew()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

let stack = new MyStack();
stack.push(1);
stack.push(2);
console.log('2', stack.top());   // returns 2
console.log('2', stack.pop());   // returns 2
console.log('false', stack.empty()); // returns false
