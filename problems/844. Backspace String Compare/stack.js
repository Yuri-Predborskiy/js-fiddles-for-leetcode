/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
let backspaceCompare = function(S, T) {
    function processString(string) {
        const stack = [];
        for (let s of string) {
            if (s === '#') {
                stack.pop();
                continue;
            }
            stack.push(s);
        }
        return stack.join();
    }

    return processString(S) === processString(T);
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
];

tests.forEach(test => {
    let res = backspaceCompare(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
