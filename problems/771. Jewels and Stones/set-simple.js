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
    let jewelTypes = new Set(jewels.split('')), jewelCount = 0;
    for (let stone of stones) {
        if (jewelTypes.has(stone)) {
            jewelCount++;
        }
    }

    return jewelCount;
};

let tests = [
    { params: ["aA", "aAAbbbb"] , ans: 3 },
    { params: ["z", "ZZ"] , ans: 0 },
];

tests.forEach(test => {
    let res = numJewelsInStones(...test.params);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
