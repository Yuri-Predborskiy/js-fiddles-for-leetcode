/*
Random number generator replacement not implemented
To test this solution go to:
https://leetcode.com/problems/random-pick-with-weight/

This is a solution using linear search

Time complexity for pickIndex: O(n)
 */

/**
 * @param {number[]} w
 */
let Solution = function(w) {
    this.max = 0;
    this.data = [];
    for (let weight of w) {
        this.data.push(weight + this.max);
        this.max += weight;
    }
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    const target = Math.floor(Math.random() * this.max) + 1;
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i] >= target) {
            return i;
        }
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */