/*
Create a hash set data structure

Since the values we want to hash are numbers from 0 to 1.000.000
    we can store them in an array of arrays
The first array contains 1000 buckets, each of which contains 1000 items
This allows us to avoid having a huge array with a million items

Optimization: pre-define size of the new array when creating it
This way we avoid having to resize the array after it was created

Time complexity: O(1), add, get, delete are all O(1) operations
Space complexity: O(n) in the worst case we store all elements we can
 */

/**
 * Initialize your data structure here.
 */
let MyHashSet = function() {
    this.buckets = new Array(1000);
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    let bucket = Math.floor(key / 1000);
    let value = key % 1000;
    if (!this.buckets[bucket]) {
        this.buckets[bucket] = new Array(1000);
    }
    this.buckets[bucket][value] = true;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    let bucket = Math.floor(key / 1000);
    let value = key % 1000;
    if (!this.buckets[bucket]) {
        return;
    }
    this.buckets[bucket][value] = false;
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    let bucket = Math.floor(key / 1000);
    let value = key % 1000;
    return this.buckets[bucket] ? this.buckets[bucket][value] || false : false;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * let obj = Object.create(MyHashSet).createNew()
 * obj.add(key)
 * obj.remove(key)
 * let param_3 = obj.contains(key)
 */

const tests = [
    {
        inputs: [
            ["MyHashSet","add","add","contains","contains","add","contains","remove","contains"],
            [[],[1],[2],[1],[3],[2],[2],[2],[2]]
        ],
        outputs: [null,null,null,true,false,null,true,null,false]
    },
];

for (let test of tests) {
    const executor = new MyHashSet(test.inputs[1][0]);
    for (let i = 1; i < test.inputs[0].length; i++) {
        let output = executor[test.inputs[0][i]](...test.inputs[1][i]);
        if (typeof output === 'undefined') {
            // LeetCode matches "undefined" output to "null"
            output = null;
        }
        const success = output === test.outputs[i];
        console.log(`Test ${i}: ${success ? 'SUCCESS' : 'FAILURE'}. Expected ${test.outputs[i]} to equal ${output}`);
    }
}
console.log('all done');
