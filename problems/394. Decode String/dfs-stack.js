/**
 * @param {string} s
 * @return {string}
 */
let decodeString = function(s) {
    if (s.length < 1) return '';

    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ']') {
            stack.push(s[i]);
        } else {
            let tempWord = '';
            while (stack[stack.length - 1] !== '[') {
                tempWord = stack.pop() + tempWord;
            }
            stack.pop();
            let repeats = '';
            while (!isNaN(Number.parseInt(stack[stack.length - 1]))) {
                repeats = stack.pop() + repeats;
            }
            repeats = Number.parseInt(repeats);
            while (repeats-- > 0) {
                stack.push(tempWord);
            }
        }
    }
    return stack.join('');
};

let tests = [
    { params: ['a3[b3[d]]c'], ans: 'abdddbdddbdddc' },
    { params: ['3[a]2[bc]'], ans: 'aaabcbc' },
    { params: ['3[a2[c]]'], ans: 'accaccacc' },
    { params: ['2[abc]3[cd]ef'], ans: 'abcabccdcdcdef' },
    { params: ['3[z]2[2[y]pq4[2[jk]e1[f]]]ef'], ans: 'zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef' },
];

tests.forEach(test => {
    let res = decodeString(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

