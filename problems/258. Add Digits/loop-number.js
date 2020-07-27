/*
Add digits till you have a root number

Loop-based solution
Combine all digits in a number:
    calculate modulo from deleting by 10
    delete remaining number by 10
    add up modulo from each operation and assign it to num
Repeat till num is less or equal to 10

Time complexity: O(log(n)) where n - input number
Space complexity: O(1)
 */

/**
 * @param {number} num
 * @return {number}
 */
let addDigits = function(num) {
    while (num >= 10) {
        let number = num;
        num = 0;
        while (number > 0) {
            let fraction = number % 10;
            num += fraction;
            number = (number - fraction) / 10;
        }
    }
    return num;
};

let tests = [
    {params: [38], ans: 2},
    {params: [10], ans: 1},
];

tests.forEach(test => {
    let res = addDigits(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
