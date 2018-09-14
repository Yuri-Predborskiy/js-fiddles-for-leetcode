function write(message) {
    console.log(message);
}
let isPerfectSquare = function(num) {
    let start = 2;
    let end = num / 2;
    if (num === 1) {
        return true;
    } else if (num < 4) {
        return false;
    } else if (num === 4) {
        return true;
    }
    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        let square = mid * mid;
        if (square === num) {
            return true;
        } else if (square > num) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return false;
};

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
    write(`${key}: ${value}, calc: ${res}, ${res === value ? 'CORRECT' : 'WRONG!'}`);
});


