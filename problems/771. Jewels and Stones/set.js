/*
    Same as hash table solution but using ES7 Set js data structure.
    Very intuitive code
 */

/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
let numJewelsInStones = function(jewels, stones) {
    let dict = new Set(), res = 0;

    for (let i = 0; i < jewels.length; i++) {
        dict.add(jewels[i]);
    }

    for (let i = 0; i < stones.length; i++) {
        if (dict.has(stones[i])) ++res;
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
