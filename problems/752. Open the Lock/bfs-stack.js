/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
let openLock = function(deadends, target) {
    let steps = 0, combos = [], tried = new Set(deadends);

    if (!tried.has('0000')) combos.push('0000');
    while (combos.length > 0) {
        steps++;
        let nextCombos = [];
        for (let i = 0; i < combos.length; i++) {
            let combo = combos[i];
            for (let wheel = 0; wheel < 4; wheel++) {
                for (let shift = 1; shift < 10; shift += 8) {
                    let next = combo.substring(0, wheel) +
                        ((Number.parseInt(combo.substring(wheel, wheel + 1)) + shift) % 10) +
                        combo.substring(wheel + 1);
                    if (next === target) {
                        return steps;
                    }
                    if (!tried.has(next)) {
                        tried.add(next);
                        nextCombos.push(next);
                    }
                }
            }
        }
        combos = nextCombos;
    }
    return -1;
};

let tests = [
    {
        params: [
            ['0201','0101','0102','1212','2002'],
            '0202'
        ],
        ans: 6,
    },
    {
        params: [
            ['8888'],
            '0009'
        ],
        ans: 1,
    },
    {
        params: [
            ['8887','8889','8878','8898','8788','8988','7888','9888'],
            '8888'
        ],
        ans: -1
    },
    {
        params: [
            ['0000'],
            '8888'
        ],
        ans: -1
    },
];

tests.forEach(test => {
    let res = openLock(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
