/*
    Using int8 array of fixed size and character codes as indexes for smaller memory footprint and faster access
    Solution adopted from
    https://dev.to/healeycodes/solving-puzzles-with-high-performance-javascript-3o4k?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email
 */

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
let numJewelsInStones = function(J, S) {
    const jewels = new Int8Array(59);
    for (let i = 0; i < J.length; i++) {
        jewels[J.charCodeAt(i)-65] = 1;
    }
    let  rich = 0;
    for (let i = 0; i < S.length; i++) {
        if (jewels[S.charCodeAt(i)-65]) ++rich;
    }
    return rich;
};

let tests = [
    { params: ["aA", "aAAbbbb"] , ans: 3 },
    { params: ["z", "ZZ"] , ans: 0 },
];

tests.forEach(test => {
    console.time('test');
    let res = numJewelsInStones(...test.params);
    console.timeEnd('test');
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
