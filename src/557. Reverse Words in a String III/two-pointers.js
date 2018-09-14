/**
 * @param {string} s
 * @returns {string}
 */
let reverseWords = function(s) {
    let res = '';
    for (let fast = 0, slow = 0; fast <= s.length; fast++) {
        if (s[fast] === ' ' || fast === s.length) {
            for (let i = fast - 1; i >= slow; i--) {
                res += s[i];
            }
            res+= s[fast] || '';
            slow = fast + 1;
        }
    }
    return res;
};

let tests = [
    { str: "Let's take LeetCode contest", ans: "s'teL ekat edoCteeL tsetnoc" },
];

tests.forEach(test => {
    let res = reverseWords(test.str);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

