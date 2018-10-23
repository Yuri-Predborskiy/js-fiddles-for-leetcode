/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function(s) {
    let res = 0, dict = {};
    for (let fast = 0, slow = 0; fast < s.length; fast++) {
        while (dict[s[fast]]) {
            delete dict[s[slow++]];
        }
        dict[s[fast]] = true;
        res = Math.max(fast - slow + 1, res);
    }

    return res;
};

let tests = [
    { params: ['abcabcbb'], ans: 3 },
    { params: ['bbbbb'], ans: 1 },
    { params: ['pwwkew'], ans: 3 },
];

tests.forEach(test => {
    let res = lengthOfLongestSubstring(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
