/**
 * @param {string} s
 * @return {string}
 */
let decodeString = function(s) {
    function isNumber(string) {
        return !isNaN(Number.parseInt(string));
    }
    function repeatStringNTimes(string, repeats) {
        let temp = '';
        while (repeats-- > 0) {
            temp += string;
        }
        return temp;
    }
    function getPrevString() {
        if (stack.length > 0 && !isNumber(stack[stack.length - 1])) {
            return stack.pop();
        }
        return '';
    }

    if (s.length < 1) return '';

    let stack = [], tempWord = '', tempNum = '';
    for (let i = 0; i < s.length; i++) {
        if (isNumber(s[i])) {
            if (tempWord) {
                stack.push(tempWord);
                tempWord = '';
            }
            tempNum += s[i];
            continue;
        } else if (s[i] === '[') {
            stack.push(Number.parseInt(tempNum));
            tempNum = '';
            continue;
        } else if (s[i] === ']') {
            let num = stack.pop();
            tempWord = getPrevString() + repeatStringNTimes(tempWord, num);
            continue;
        }
        tempWord += s[i];
    }

    return stack.join() + tempWord;
};

let tests = [
    // 'a2[b3[d]]c'
    // 3 - repeats, b - stack, 3 - repeats, repeats become 33, bug
    // a - stack letter
    // 2 - stack
    // [ - stack it
    // b - stack letter
    // 3 - stack
    // [ - stack it
    // d - stack letter
    // ] - initiate while, till we reach [
    // once we found '[', pop one more item, pop k (number), and repeat accumulated string k times, then pop one more
    //  item from stack and push (prev_item + multiplied string)
    //  word becomes ddd
    //  push 'ddd' into stack
    // ] - initiate while
    //  pop items from stack till you find [, accumulate temp string
    //  temp string is bddd
    //  pop next item - 2
    //  repeat bddd 2 times, it becomes bddd bddd
    //  pop next item (a), push (a + bddd bddd) into stack
    // c - push to stack
    // finished working through string
    // join the stack
    // result: a bddd bddd c

    // { params: ['a3[b3[d]]c'], ans: 'abdddbdddbdddc' },
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

