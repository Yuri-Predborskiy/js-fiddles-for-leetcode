/**
 * Initialize your data structure here.
 */
let MyHashSet = function() {
    this.buckets = [];
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    let bucket = Math.floor(key / 1000);
    let value = key % 1000;
    this.buckets[bucket] = this.buckets[bucket] || [];
    this.buckets[bucket][value] = true;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    let bucket = Math.floor(key / 1000);
    let value = key % 1000;
    this.buckets[bucket] = this.buckets[bucket] || [];
    delete this.buckets[bucket][value];
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    let bucket = Math.floor(key / 1000);
    let value = key % 1000;
    return this.buckets[bucket] ? typeof this.buckets[bucket][value] !== 'undefined' : false;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = Object.create(MyHashSet).createNew()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */

function check(calculated, checkValue) {
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
