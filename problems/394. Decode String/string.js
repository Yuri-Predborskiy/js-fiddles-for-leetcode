/**
 * @param {string} s
 * @return {string}
 */
let decodeString = function(s) {
    let i = 0;

    function decodeStringRecursion(s) {
        let res = '', repeats = '';
        while (i < s.length) {
            let code = s.charCodeAt(i);
            if (code >= 48 && code <= 57) {
                // number
                repeats += s[i++];
                continue;
            }
            if (code === 91) {
                // [, opening bracket, start of fragment
                i++;
                let fragment = decodeStringRecursion(s);
                for (let j = 0; j < Number.parseInt(repeats); j++) {
                    res += fragment;
                }
                repeats = '';
                continue;
            }
            if (code === 93) {
                // ], closing bracket, end of fragment
                i++;
                return res; // exit recursive function
            }

            res += s[i++];
        }
        return res;
    }

    return decodeStringRecursion(s);
};

let tests = [
    { param: ['a3[b3[d]]c'], ans: 'abdddbdddbdddc' },
    { param: ['3[a]2[bc]'], ans: 'aaabcbc' },
    { param: ['3[a2[c]]'], ans: 'accaccacc' },
    { param: ['2[abc]3[cd]ef'], ans: 'abcabccdcdcdef' },
    { param: ['3[z]2[2[y]pq4[2[jk]e1[f]]]ef'], ans: 'zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef' },
];

tests.forEach(test => {
    let res = decodeString(...test.param);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

