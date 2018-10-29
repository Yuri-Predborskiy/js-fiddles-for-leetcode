/**
 * Initialize your data structure here.
 */
let MyHashSet = function() {
    this.values = {};
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    this.values[key] = true;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    this.values[key] = false;
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    return this.values[key] || false;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * let obj = Object.create(MyHashSet).createNew()
 * obj.add(key)
 * obj.remove(key)
 * let param_3 = obj.contains(key)
 */

function check(checkValue, calculated) {
    let res = checkValue === calculated ? 'CORRECT' : 'WRONG!';
    console.log('should be', checkValue, '| calculated', calculated, '| result is', res);
}

let hashSet = new MyHashSet();
hashSet.add(1);
hashSet.add(2);
check(hashSet.contains(1), true);
check(hashSet.contains(3), false);
hashSet.add(2);
check(hashSet.contains(2), true);
hashSet.remove(2);
check(hashSet.contains(2), false);
