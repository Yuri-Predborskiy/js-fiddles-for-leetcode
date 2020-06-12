/*
Check if array 2 can be made from array 1 by swapping two elements any number of times
In other words, if we sort arrays, arrays should have same elements
If their lengths are different, return false (early exit)

Sorting both arrays and iterating over them to find any differences would take O(n*log(n))

A faster solution is to add every element of the first array into a map (hashtable) where value = number of repeats
Then iterate over second array and decrement number of elements. If it reaches 0, delete map record

If array has any elements not present in map - return false, item is present in only one of the arrays
If map has any records left, return false
Return true if map is empty

Time complexity: O(n), linear time complexity (arrays should have the same length)
Space complexity: O(n)
 */

/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
let canBeEqual = function(target, arr) {
    if (target.length !== arr.length) {
        return false;
    }

    const map = new Map();
    for (let t of target) {
        map.set(t, (map.get(t) || 0) + 1);
    }
    for (let a of arr) {
        if (map.has(a)) {
            let count = map.get(a);
            if (count === 1) {
                map.delete(a);
            } else {
                map.set(a, map.get(a) - 1);
            }
        } else {
            return false; // unique element
        }
    }
    return map.size === 0;
};

let tests = [
    {params: [[1,2,3,4], [2,4,1,3]], ans: true},
    {params: [[7], [7]], ans: true},
    {params: [[1,12], [12,1]], ans: true},
    {params: [[3,7,9], [3,7,11]], ans: false},
    {params: [[1,1,1,1,1], [1,1,1,1,1]], ans: true},
];

tests.forEach(test => {
    let res = canBeEqual(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
