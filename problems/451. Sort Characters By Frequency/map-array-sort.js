/*
Collect frequencies of characters into a map, create an array from the map, sort array
Rebuild result string from sorted array
Can be optimized within this time complexity, probably

Time complexity: O(n*log(n))
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
let frequencySort = function(s) {
    const map = new Map();
    for (let char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    const frequencies = [...map.entries()];
    frequencies.sort((a, b) => a[1] < b[1] ? 1 : -1);
    const output = [];
    for (let charArr of frequencies) {
        for (let i = 0; i < charArr[1]; i++) {
            output.push(charArr[0]);
        }
    }
    return output.join('');
};

let tests = [
    {params: ['tree'], ans: 'eert'},
    {params: ['cccaaa'], ans: 'aaaccc'},
    {params: ['Aabb'], ans: 'bbaA'},
];

tests.forEach(test => {
    let res = frequencySort(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
