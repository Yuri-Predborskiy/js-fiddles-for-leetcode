/**
 * @param {string} s
 * @returns {string}
 */
let reverseWords = function(s) {
    function reverseWord(s) {
        let r = '';
        for (let i = s.length - 1; i >= 0; --i) {
            r += s[i];
        }
        return r;
    }

    let words = s.trim().split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        words[i] = reverseWord(words[i]);
    }
    return words.join(' ');
};

let tests = [
    { str: "Let's take LeetCode contest", ans: "s'teL ekat edoCteeL tsetnoc" },
];

tests.forEach(test => {
    let res = reverseWords(test.str);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

