/*
Random number generator replacement not implemented
To test this solution go to:
https://leetcode.com/problems/random-pick-with-weight/

This is a solution using binary search

Time complexity for pickIndex: O(log(n))
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
    const target = Math.floor(Math.random() * this.max);
    let left = 0;
    let right = this.data.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (this.data[mid] > target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */