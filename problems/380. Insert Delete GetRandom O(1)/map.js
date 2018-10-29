/*
    Idea: this should be done using two hash tables:
    first table contains values and their indexes
    second table contains indexes and related values
    first is used for adding values, checking if value exists and deleting values
    second is used only to get random elements by index
 */

/**
 * Initialize your data structure here.
 */
let RandomizedSet = function() {
    this.values = new Map();
    this.indexes = new Map();
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
    this.indexes.set(index, val);
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

    let index = this.values.get(val);
    this.values.delete(val);
    this.indexes.delete(index);

    if (this.values.size === 0 || index === this.values.size) {
        return true;
    }

    // we deleted item in the middle, now we move last item into this freed up index and remove last index
    let lastVal = this.indexes.get(this.indexes.size); // get the last value by index
    this.values.set(lastVal, index); // update index of the last value
    this.indexes.delete(this.indexes.size); // remove last index
    this.indexes.set(index, lastVal); // write last value into freed index
    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    let random = Math.floor(Math.random() * this.values.size);
    return this.indexes.get(random);
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = Object.create(RandomizedSet).createNew()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
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
