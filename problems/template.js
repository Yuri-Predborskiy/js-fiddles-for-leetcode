let func = function(param) {
    return param;
};

let tests = [
    { param: true, ans: true },
    { param: false, ans: false },
];

tests.forEach(test => {
    let res = func(test.param);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

