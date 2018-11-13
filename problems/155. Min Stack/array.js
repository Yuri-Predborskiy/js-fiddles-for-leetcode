/*
    Array of objects where each item keeps track of a) value b) minimum so far
    This way we have constant time for push pop top and getMin operations
 */
/**
 * initialize your data structure here.
 */
let MinStack = function() {
    this.items = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if (this.items.length === 0) {
        this.items.push({
            value: x,
            min: x
        });
    } else {
        this.items.push({
            value: x,
            min: Math.min(this.items[this.items.length - 1].min, x)
        });
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.items.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if (this.items.length > 0) {
        return this.items[this.items.length - 1].value;
    } else {
        return 0;
    }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    if (this.items.length > 0) {
        return this.items[this.items.length - 1].min;
    } else {
        return 0;
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * let obj = Object.create(MinStack).createNew()
 * obj.push(x)
 * obj.pop()
 * let param_3 = obj.top()
 * let param_4 = obj.getMin()
 */

let ms = new MinStack();
ms.push(-2);
ms.push(0);
console.log('min is -2', ms.getMin());
console.log('top is 0', ms.top());
ms.push(-3);
console.log('min is -3', ms.getMin());
ms.pop();
console.log('min is -2', ms.getMin());
// let hashSet = new MyHashSet();
// hashSet.add(1);
// hashSet.add(2);
// check(hashSet.contains(1), true);
// check(hashSet.contains(3), false);
// hashSet.add(2);
// check(hashSet.contains(2), true);
// hashSet.remove(2);
// check(hashSet.contains(2), false);
