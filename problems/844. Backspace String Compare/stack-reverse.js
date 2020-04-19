/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
let backspaceCompare = function(S, T) {
    function processString(string) {
        const stack = [];
        let skips = 0;
        for (let i = string.length; i >= 0; i--) {
            if (string[i] === '#') {
                skips++;
                continue;
            }
            if (skips) {
                skips--;
                continue;
            }
            stack.push(string[i]);
        }
        return stack;
    }

    let left = processString(S);
    let right = processString(T);
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) {
            return false;
        }
    }
    return true;
};

let tests = [
    {
        params: ['ab#c', 'ad#c'],
        ans: true,
    },
    {
        params: ['ab##', 'c#d#'],
        ans: true,
    },
    {
        params: ['a##c', '#a#c'],
        ans: true,
    },
    {
        params: ['a#c', 'b'],
        ans: false,
    },
    {
        params: ['a#c#bb', 'b'],
        ans: false,
    },
    {
        params: ['xywrrmp', 'xywrrmu#p'],
        ans: true,
    },
    {
        params: ['bxj##tw', 'bxo#j##tw'],
        ans: true,
    },
    {
        params: ['y#fo##f', 'y#f#o##f'],
        ans: true,
    },
];

tests.forEach(test => {
    let res = backspaceCompare(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
