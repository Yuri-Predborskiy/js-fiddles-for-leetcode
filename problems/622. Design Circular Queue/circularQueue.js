/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
let MyCircularQueue = function(k) {
    this.start = this.end = -1;
    this.items = new Array(k);
    this.size = 0;
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull()) {
        return false;
    }

    if (this.size === 0) {
        this.start = this.end = 0;
        this.items[this.end] = value;
    } else {
        this.end = ++this.end % this.items.length;
        this.items[this.end] = value;
    }
    this.size++;
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty()) {
        return false;
    }

    this.items[this.start] = undefined;
    this.size--;
    if (this.size === 0) {
        this.start = this.end = -1;
    } else {
        this.start = ++this.start % this.items.length;
    }

    return true;
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this.items[this.start];
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this.items[this.end];
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.size === 0;
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return this.size === this.items.length;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * let obj = Object.create(MyCircularQueue).createNew(k)
 * let param_1 = obj.enQueue(value)
 * let param_2 = obj.deQueue()
 * let param_3 = obj.Front()
 * let param_4 = obj.Rear()
 * let param_5 = obj.isEmpty()
 * let param_6 = obj.isFull()
 */

let cq = new MyCircularQueue(6);
console.log(cq.enQueue(6), 'should be true');
console.log(cq.Rear(), 'should be 6');
console.log(cq.Rear(), 'should be 6');
console.log(cq.deQueue(), 'should be true');
console.log(cq.enQueue(5), 'should be true');
console.log(cq.deQueue(), 'should be true');
console.log(cq.Front(), 'should be -1');
console.log(cq.deQueue(), 'should be false');
console.log(cq.deQueue(), 'should be false');
console.log(cq.deQueue(), 'should be false');
