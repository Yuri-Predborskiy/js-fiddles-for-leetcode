/**
 * Initialize your data structure here.
 */
let MyQueue = function() {
    this.stack = [];
};

/**
 * Reverse the stack, peek at the first element, removes it if necessary, put the stack back in the original order
 * @param   {boolean}       bRemoveFirst
 * @returns {number, null}
 */
MyQueue.prototype.getFirstElement = function(bRemoveFirst) {
    if (this.empty()) {
        return null;
    }

    let reversed = [];
    while (!this.empty()) {
        reversed.push(this.stack.pop());
    }
    let res = bRemoveFirst ? reversed.pop() : reversed[reversed.length - 1];
    while (reversed.length > 0) {
        this.stack.push(reversed.pop());
    }
    return res;
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    return this.getFirstElement(true);
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.getFirstElement();
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * let obj = Object.create(MyQueue).createNew()
 * obj.push(x)
 * let param_2 = obj.pop()
 * let param_3 = obj.peek()
 * let param_4 = obj.empty()
 */

let queue = new MyQueue();

queue.push(1);
queue.push(2);
console.log('1', queue.peek());  // returns 1
console.log('1', queue.pop());   // returns 1
console.log('false', queue.empty()); // returns false