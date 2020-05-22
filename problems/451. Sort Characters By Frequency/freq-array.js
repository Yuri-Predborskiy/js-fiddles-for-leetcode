/*
Collect frequencies of characters into a frequency array, sort array
Rebuild result string from sorted array

Time complexity: O(n*log(n)) (due to sorting)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
let frequencySort = function(s) {
    const frequencyArray = [];
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        frequencyArray[code] = (frequencyArray[code] || '') + s[i];
    }
    frequencyArray.sort((a, b) => b.length - a.length);

    return frequencyArray.join('');
};

let tests = [
    {params: ['tree'], ans: 'eert'},
    {params: ['cccaaa'], ans: 'aaaccc'},
    {params: ['Aabb'], ans: 'bbAa'},
    {params: ['2a554442f544asfasssffffasss'], ans: 'sssssssffffff44444aaaa55522'}
];

tests.forEach(test => {
    let res = frequencySort(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
