function getIndexElementInTwoSortedArrays(arrLeft, arrRight, index, startLeft = 0, endLeft = arrLeft.length, startRight = 0, endRight = arrRight.length) {
    let shiftLeft = Math.floor((endLeft - startLeft) / 2);
    let shiftRight = Math.floor((endRight - startRight) / 2);

    if (startLeft === endLeft) {
        return arrRight[startRight + index];
    }
    if (startRight === endRight) {
        return arrLeft[startLeft + index];
    }

    if (shiftLeft + shiftRight < index) {
        if (arrLeft[startLeft + shiftLeft] < arrRight[startRight + shiftRight]) {
            return getIndexElementInTwoSortedArrays(arrLeft, arrRight, index - shiftLeft - 1, startLeft + shiftLeft + 1, endLeft, startRight, endRight);
        } else {
            return getIndexElementInTwoSortedArrays(arrLeft, arrRight, index - shiftRight - 1, startLeft, endLeft, startRight + shiftRight + 1, endRight);
        }
    } else {
        if (arrLeft[startLeft + shiftLeft] < arrRight[startRight + shiftRight]) {
            return getIndexElementInTwoSortedArrays(arrLeft, arrRight, index, startLeft, endLeft, startRight, startRight + shiftRight);
        } else {
            return getIndexElementInTwoSortedArrays(arrLeft, arrRight, index, startLeft, startLeft + shiftLeft, startRight, endRight);
        }
    }
}

let tests = [
    {
        a: [0, 1, 2, 3, 6, 7, 9],
        b: [12, 14, 18, 20, 21, 22, 23, 24, 25],
        index: 6,
        ans: 7
    },
    {
        a: Array.from(new Array(100),(val, index) => index + 101),
        b: Array.from(new Array(100),(val, index) => index + 1),
        index: 100,
        ans: 100
    },
    {
        a: Array.from(new Array(100),(val, index) => index + 1),
        b: Array.from(new Array(100),(val, index) => index + 101),
        index: 100,
        ans: 100
    },
    {
        a: Array.from(new Array(100),(val, index) => index * 2 + 1),
        b: Array.from(new Array(100),(val, index) => index * 2 + 2),
        index: 49,
        ans: 49
    },
    {
        a: [1, 2, 5, 17, 28],
        b: [3, 4, 7, 9],
        index: 6,
        ans: 7
    }
];

tests.forEach(test => {
    let res = getIndexElementInTwoSortedArrays(test.a, test.b, test.index - 1);
    console.log('Inputs:', 'array1', JSON.stringify(test.a), '| array2', JSON.stringify(test.b), '| index', test.index, '| answer', test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
