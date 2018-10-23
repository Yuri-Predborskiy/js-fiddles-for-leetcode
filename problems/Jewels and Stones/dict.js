/*
    A very nice example problem for hash table.
    Make a hash table from Jewels (each jewel is unique string of 1 letter)
    Then compare each stone (each is 1 letter long) with hash table. If it exists in hash table, it is a jewel.
    Count jewels, return count.

    Time complexity: O(n) (visiting every item exactly once, hash table lookup time is O(1))
    Space complexity: O(n) (keeping a copy of all jewels, same as input in the worst case)
 */

/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
let numJewelsInStones = function(jewels, stones) {
    let dict = {}, res = 0;

    for (let i = 0; i < jewels.length; i++) {
        dict[jewels[i]] = true;
    }

    for (let i = 0; i < stones.length; i++) {
        if (dict[stones[i]]) {
            res++;
        }
    }

    return res;
};

let tests = [
    { params: ["aA", "aAAbbbb"] , ans: 3 },
    { params: ["z", "ZZ"] , ans: 0 },
];

tests.forEach(test => {
    let res = numJewelsInStones(...test.params);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
