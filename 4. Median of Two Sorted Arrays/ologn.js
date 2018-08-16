const DEFAULT_LOGGING_POLICY = false;
let logging = DEFAULT_LOGGING_POLICY;
let pass = 0;
let logs = 0;

function log(...messages) {
    if (logging) console.log(messages.join(' '));
}

function getIndexElementInTwoSortedArrays(arrLeft, arrRight, index, startLeft = 0, endLeft = arrLeft.length, startRight = 0, endRight = arrRight.length) {
    let shiftLeft = Math.floor((endLeft - startLeft) / 2);
    let shiftRight = Math.floor((endRight - startRight) / 2);

    log('pass', pass++, 'startLeft', startLeft, 'endLeft', endLeft, 'startRight', startRight, 'endRight', endRight, 'index', index);

    if (startLeft === endLeft) {
        log('reached end of array 1, element not found, so it should be at index startRight + index in arrRight');
        log(`looking at arrRight[${startRight + index}], value is ${arrRight[startRight + index]}`);
        return arrRight[startRight + index];
    }
    if (startRight === endRight) {
        log('reached end of array 2, element not found, so it should be at index startLeft + index in arrLeft');
        log(`looking at arrLeft[${startLeft + index}], value is ${arrLeft[startLeft + index]}`);
        return arrLeft[startLeft + index];
    }

    if (shiftLeft + shiftRight < index) {
        // log(`shiftLeft (${shiftLeft}) + shiftRight (${shiftRight}) < index (${index})`);
        log(`mids (${shiftLeft} + ${shiftRight} = ${shiftLeft + shiftRight}) < index (${index}), lets increase start and limit index`);
        if (arrLeft[startLeft + shiftLeft] < arrRight[startRight + shiftRight]) {
            // log(`arrLeft[startLeft + shiftLeft] ${arrLeft[startLeft + shiftLeft]} < arrRight[startRight + shiftRight] ${arrRight[startRight + shiftRight]}`);
            log('limiting start of left and limiting index - shiftLeft - 1');
            return getIndexElementInTwoSortedArrays(arrLeft, arrRight, index - shiftLeft - 1, startLeft + shiftLeft + 1, endLeft, startRight, endRight);
        } else {
            // log(`arrLeft[startLeft + shiftLeft] ${arrLeft[startLeft + shiftLeft]} >= arrRight[startRight + shiftRight] ${arrRight[startRight + shiftRight]}`);
            log('limiting start of right and limiting index - shiftRight - 1');
            return getIndexElementInTwoSortedArrays(arrLeft, arrRight, index - shiftRight - 1, startLeft, endLeft, startRight + shiftRight + 1, endRight);
        }
    } else {
        // log(`shiftLeft (${shiftLeft}) + shiftRight (${shiftRight}) >= index (${index})`);
        log(`mids (${shiftLeft} + ${shiftRight} = ${shiftLeft + shiftRight}) >= index ${index}, lets limit end`);
        if (arrLeft[startLeft + shiftLeft] < arrRight[startRight + shiftRight]) {
            // log(`arrLeft[startLeft + shiftLeft] ${arrLeft[startLeft + shiftLeft]} < arrRight[startRight + shiftRight] ${arrRight[startRight + shiftRight]}`);
            log('limiting end of right');
            return getIndexElementInTwoSortedArrays(arrLeft, arrRight, index, startLeft, endLeft, startRight, startRight + shiftRight);
        } else {
            // log(`arrLeft[startLeft + shiftLeft] ${arrLeft[startLeft + shiftLeft]} >= arrRight[startRight + shiftRight] ${arrRight[startRight + shiftRight]}`);
            log('limiting end of left');
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
    },
    {
        a: [],
        b: [1, 2],
        index: 2,
        ans: 2
    }
];

tests.forEach(test => {
    let res = getIndexElementInTwoSortedArrays(test.a, test.b, test.index - 1);
    if (DEFAULT_LOGGING_POLICY || res !== test.ans) {
        logging = true;
        logs++;
        pass = 0;
        getIndexElementInTwoSortedArrays(test.a, test.b, test.index - 1); // repeat procedure with logging enabled
        logging = !logging;
    }
    log('Inputs:', 'array1', JSON.stringify(test.a), '| array2', JSON.stringify(test.b), '| index', test.index, '| answer', test.ans);
    log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
    log('');
});
if (!logs) console.log('all done');
