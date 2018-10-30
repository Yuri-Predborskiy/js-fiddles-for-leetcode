/*
    Idea: this should be done using two hash tables (map and array):
    first table (map) contains values and their indexes. getting item by value, deleting item is O(1)
    second table (array) keeps items at respective indexes. random element access is O(1)
    removing element from array in O(1):
    item index does not matter,
        put last element of array in the middle and delete the last element in the array,
        then update the first hash table (map) last item with new position
 */

/**
 * Initialize your data structure here.
 */
let RandomizedSet = function() {
    this.values = new Map();
    this.index = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.values.has(val)) {
        return false;
    }

    let index = this.values.size;
    this.values.set(val, index);
    this.index[index] = val;
    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.values.has(val)) {
        return false;
    }

    let position = this.values.get(val);
    let last = this.index.length - 1;
    let lastItem = this.index[last];
    if (position !== last) {
        // delete item in the middle - move last item in place of deleted item
        this.index[position] = lastItem;
        this.values.set(lastItem, position);
    }
    this.values.delete(val);

    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    let random = Math.floor(Math.random() * this.values.size);
    return this.index[random];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * let obj = Object.create(RandomizedSet).createNew()
 * let param_1 = obj.insert(val)
 * let param_2 = obj.remove(val)
 * let param_3 = obj.getRandom()
 */

let col = new RandomizedSet();
console.log('true = ', col.insert(2));
console.log('false = ', col.insert(2));
console.log('true = ', col.insert(3));
console.log('true = ', col.remove(2));
console.log('false = ', col.remove(7575));
col.insert(55);
col.insert(56);
col.insert(57);
col.insert(58);
console.log('random = ', col.getRandom());
