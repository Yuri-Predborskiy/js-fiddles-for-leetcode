let cnt = 0, cnt2 = 0;
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
let strStr = function(haystack, needle) {
    if (needle === '') {
        return 0;
    }
    let res = -1;
    for (let i = 0; i < haystack.length; ++i) {
        if (haystack[i] === needle[0]) {
            res = i;
            for (let j = needle.length - 1; j > 0; --j) {
                if (haystack[i + j] !== needle[j]) {
                    res = -1;
                    break;
                }
            }
            if (res !== -1) return res;
        }
    }
    return res;
};

let tests = [
    { haystack: 'hello', needle: 'll', ans: 2 },
    { haystack: 'aa', needle: '', ans: 0 },
    { haystack: 'aaaaaaaa', needle: 'bba', ans: -1 },
    { haystack: 'mississippi', needle: 'pi', ans: 9 },
];

tests.forEach(test => {
    let res = strStr(test.haystack, test.needle);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
