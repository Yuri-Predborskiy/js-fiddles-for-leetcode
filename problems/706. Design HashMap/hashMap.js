/**
 * Initialize your data structure here.
 */
let MyHashMap = function() {
    this.buckets = [];
};

/**
 * value will always be non-negative.
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    let bucket = Math.floor(key / 1000);
    let index = key % 1000;
    this.buckets[bucket] = this.buckets[bucket] || [];
    this.buckets[bucket][index] = value;
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    let bucket = Math.floor(key / 1000);
    let index = key % 1000;
    let value = this.buckets[bucket] ? this.buckets[bucket][index] : undefined;
    return typeof value !== 'undefined' ? value : -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    let bucket = Math.floor(key / 1000);
    let index = key % 1000;
    this.buckets[bucket] = this.buckets[bucket] || [];
    delete this.buckets[bucket][index];
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * let obj = Object.create(MyHashMap).createNew()
 * obj.put(key,value)
 * let param_2 = obj.get(key)
 * obj.remove(key)
 */


function check(calculated, checkValue) {
    let res = checkValue === calculated ? 'CORRECT' : 'WRONG!';
    console.log('should be', checkValue, '| calculated', calculated, '| result is', res);
}

let hashMap = new MyHashMap();
hashMap.put(1, 100);
hashMap.put(2, 101);
check(hashMap.get(1), 100);
check(hashMap.get(3), -1);
hashMap.put(2, 300);
check(hashMap.get(2), 300);
hashMap.remove(2);
check(hashMap.get(2), -1);
