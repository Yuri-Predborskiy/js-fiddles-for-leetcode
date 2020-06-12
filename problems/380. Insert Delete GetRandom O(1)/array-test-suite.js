/*
Create new data structure that has the following operations:
Insert, Delete, GetRandom
All operations should work within O(1) time (average)

Suggested data structure:
Map + Array
Map keys are used to check for uniqueness
Map values are indexes to array that holds value copies
Array holds all values

Insert - if value exists in the map, return false. Else, insert into map (value = array length) and push into array
Delete - if value does not exist in the map, return false. Else, get array index from map, pop last item from the array,
    replace deleted value with last item, update map - index of the last item is updated to index of deleted item
Get Random - generate random number from 0 to array length (exclusive) and return item at array index

Time complexity: O(1) on average for each op (data array size increase may need more time, on average it is O(1))
Space complexity: O(n)
 */

/**
 * Initialize your data structure here.
 */
let RandomizedSet = function() {
    this.data = [];
    this.map = new Map();
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) {
        return false;
    }
    this.map.set(val, this.data.length);
    this.data.push(val);
    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) {
        return false;
    }
    const index = this.map.get(val);
    if (index !== this.data.length - 1) {
        const last = this.data[this.data.length - 1];
        this.map.set(last, index);
        this.data[index] = last;
    }
    this.map.delete(val);
    this.data.pop();
    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const random = Math.floor(Math.random() * this.data.length);
    return this.data[random];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = Object.create(RandomizedSet).createNew()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

const tests = [
    {
        inputs: [
            ["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"],
            [[],[1],[2],[2],[],[1],[2],[]]
        ],
        outputs: [null,true,false,true,1,true,false,2]
    },
];

// keeping a copy of original math random
const originalMathRandom = Math.random;
// faking random using pre-defined variable names
Math.random = function() {
    let counter = 0;
    let data = [0, 0.99];
    return function() {
        return data[counter++];
    }();
};

let fails = 0;
for (let test of tests) {
    const executor = new RandomizedSet(...test.inputs[1][0]);
    for (let i = 1; i < test.inputs[0].length; i++) {
        let output = executor[test.inputs[0][i]](...test.inputs[1][i]);
        const success = output ? output === test.outputs[i] : true;
        if (!success) {
            fails++;
        }
        console.log(`Test ${i}: ${success ? 'SUCCESS' : 'FAILURE'}. Expected ${test.outputs[i]} to equal ${output}`);
    }
}

console.log(fails ? `There were ${fails} failed tests` : 'all done');

// recover original math random
Math.random = originalMathRandom;
// if you don't plan to run this file together with other files, you may not need to recover it
// but I still do it - just in case I ever run this file together with others