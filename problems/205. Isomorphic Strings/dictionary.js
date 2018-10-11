/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    let dict = {}, used = {};
    for (let i = 0; i < s.length; i++) {
        let left = s[i], right = t[i];
        if (!dict[left] && !used[right]) {
            dict[left] = right;
            used[right] = true;
        } else if (dict[left] !== right) {
            return false;
        }
    }
    return true;
};

let tests = [
    { s1: 'egg', s2: 'add', ans: true },
    { s1: 'foo', s2: 'bar', ans: false },
    { s1: 'paper', s2: 'title', ans: true },
];

tests.forEach(test => {
    let res = isIsomorphic(test.s1, test.s2);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
