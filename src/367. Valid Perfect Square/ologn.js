function write(message) {
    // document.write(message);
    // document.write('<br/>');
    console.log(message);
}
function isPerfectSquare(n) {
    let start = 2;
    let end = n / 2;
    if (n < 4) {
        return { answer: false };
    } else if (n === 4) {
        return { answer: true };
    }
    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        let square = mid * mid;
        if (square === n) {
            return { answer: true };
        } else if (square > n) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return { start: start, end: end, answer: false };
}

let tests = {
    2: false,
    4: true,
    6: false,
    8: false, // its a cube, not a square,
    9: true,
    15: false,
    16: true,
    20: false,
    36: true,
    44: false,
    49: true,
    100: true,
    111: false,
    121: true,
    256: true,
    361: true,
    391: false,
    400: true
};

Object.entries(tests).forEach(([key, value]) => {
    let res = isPerfectSquare(Number(key));
    write(`${key}: ${value}, calc: ${JSON.stringify(res)}, ${res.answer === value ? 'CORRECT' : 'WRONG!'}`);
});
