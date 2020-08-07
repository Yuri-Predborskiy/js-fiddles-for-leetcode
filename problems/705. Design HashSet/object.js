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
