// figuring out how to use javascript built-in sorting mechanisms to sort groups of strings alphanumerically

let a = 'ab echo dot bravo';
let b = 'xy echo dot bravo';
let c = 'cc drama boom box';
let d = 'ca echoo dt bravo';
let e = 'aa 12 34 526 6777';
let f = 'aa 11 11 516 6777';
let arrays = [a, b, c, d, e, f];

function hasLetters(word) {
    const nums = new Set([' ','0','1','2','3','4','5','6','7','8','9']);
    for (let letter of word) {
        if (!nums.has(letter)) return true;
    }
    return false;
}

let withLetters = [];
let withoutLetters = [];

for (let item of arrays) {
    let words = item.split(' ');
    let arr = [words.shift(), words.join(' ')];
    if (hasLetters(arr[1])) {
        withLetters.push(arr);
    } else {
        withoutLetters.push(arr);
    }
}

console.log('with letters', withLetters);
console.log('without letters', withoutLetters);

let sorted = withLetters.sort((a, b) => {
    if (a[1] === b[1]) return a[0] > b[0];
    return a[1] > b[1];
});

sorted.push(...withoutLetters);

console.log(sorted);

// it took me 20 minutes to solve this problem