/**
 * @param {string[]} tokens
 * @return {number}
 */
let evalRPN = function(tokens) {
    function pi(n) {
        return Number.parseInt(n);
    }

    let items = [];
    let operations = {
        '+': (a, b) => pi(b) + pi(a),
        '-': (a, b) => pi(b) - pi(a),
        '*': (a, b) => pi(b) * pi(a),
        '/': (a, b) => (pi(b) / pi(a)) >> 0,
    };

    for (let i = 0; i < tokens.length; i++) {
        let item = tokens[i];
        if (operations[item]) {
            items.push(operations[item](items.pop(), items.pop()));
        } else {
            items.push(item);
        }
    }
    return items[0];
};

let tests = [
    { params: [["2", "1", "+", "3", "*"]], ans: 9 },
    { params: [["4", "13", "5", "/", "+"]], ans: 6 },
    { params: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], ans: 22 },
];

tests.forEach(test => {
    let res = evalRPN(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
