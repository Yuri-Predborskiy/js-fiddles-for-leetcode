/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function(s) {
    let openings = {
        '{': '}',
        '[': ']',
        '(': ')',
    };
    let closeQueue = [];
    for (let i = 0; i < s.length; i++) {
        let par = s[i];
        if (openings[par]) {
            closeQueue.push(openings[par]);
        } else {
            let close = closeQueue.pop();
            if (par !== close) {
                return false;
            }
        }
    }
    return closeQueue.length === 0;
};

let tests = [
    { params: [''], ans: true },
    { params: ['('], ans: false },
    { params: [')'], ans: false },
    { params: ['()'], ans: true },
    { params: ['()[]{}'], ans: true },
    { params: ['(]'], ans: false },
    { params: ['([)]'], ans: false },
    { params: ['{[]}'], ans: true },
];

tests.forEach(test => {
    let res = isValid(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
