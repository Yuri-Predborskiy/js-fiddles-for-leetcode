/*
    Linked list oas stack. Push - add an element before head. Pop - head = head.next
    Min - smaller value between value and next item's min value
 */
let Node = function(next, value, min) {
    this.next = next;
    this.value = value;
    this.min = min;
};
/**
 * initialize your data structure here.
 */
let MinStack = function() {
    this.head = null;
    this.size = 0;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if (this.size === 0) {
        this.head = new Node(null, x, x);
    } else {
        this.head = new Node(this.head, x, Math.min(this.head.min, x));
    }
    this.size++;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.head = this.head.next;
    this.size--;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if (this.size > 0) {
        return this.head.value;
    } else {
        return 0;
    }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    if (this.size > 0) {
        return this.head.min;
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
