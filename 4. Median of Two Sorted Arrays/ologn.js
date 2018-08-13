let number = 0;
let logging = false;
let logs = 0;

function log(...messages) {
    if (logging) console.log(messages.join(' '));
}

function kth(arr1, arr2, start1, end1, start2, end2, k) {
    let mid1 = Math.floor(Math.abs(start1 - end1) / 2);
    let mid2 = Math.floor(Math.abs(start2 - end2) / 2);

    log('try', ++number, 'start1', start1, 'end1', end1, 'start2', start2, 'end2', end2, 'k', k);

    if (start1 === end1) {
        log('reached end of array 1, element not found, so it should be at index start2 + k in arr2');
        log(`looking at arr2[${start2 + k}], value is ${arr2[start2 + k]}`);
        return arr2[start2 + k];
    }
    if (start2 === end2) {
        log('reached end of array 2, element not found, so it should be at index start1 + k in arr1');
        log(`looking at arr1[${start1 + k}], value is ${arr1[start1 + k]}`);
        return arr1[start1 + k];
    }

    if (mid1 + mid2 < k) {
        // log(`mid1 (${mid1}) + mid2 (${mid2}) < k (${k})`);
        log(`mids (${mid1} + ${mid2} = ${mid1 + mid2}) < k (${k}), lets increase start and limit k`);
        if (arr1[start1 + mid1] < arr2[start2 + mid2]) {
            // log(`arr1[start1 + mid1] ${arr1[start1 + mid1]} < arr2[start2 + mid2] ${arr2[start2 + mid2]}`);
            log('limiting start of left and limiting k - mid1 - 1');
            return kth(arr1, arr2, start1 + mid1 + 1, end1, start2, end2, k - mid1 - 1);
        } else {
            // log(`arr1[start1 + mid1] ${arr1[start1 + mid1]} >= arr2[start2 + mid2] ${arr2[start2 + mid2]}`);
            log('limiting start of right and limiting k - mid2 - 1');
            return kth(arr1, arr2, start1, end1, start2 + mid2 + 1, end2, k - mid2 - 1);
        }
    } else {
        // log(`mid1 (${mid1}) + mid2 (${mid2}) >= k (${k})`);
        log(`mids (${mid1} + ${mid2} = ${mid1 + mid2}) >= k ${k}, lets limit end`);
        if (arr1[start1 + mid1] < arr2[start2 + mid2]) {
            // log(`arr1[start1 + mid1] ${arr1[start1 + mid1]} < arr2[start2 + mid2] ${arr2[start2 + mid2]}`);
            log('limiting end of right');
            return kth(arr1, arr2, start1, end1, start2, start2 + mid2, k);
        } else {
            // log(`arr1[start1 + mid1] ${arr1[start1 + mid1]} >= arr2[start2 + mid2] ${arr2[start2 + mid2]}`);
            log('limiting end of left');
            return kth(arr1, arr2, start1, start1 + mid1, start2, end2, k);
        }
    }
}

let tests = [
    {
        a: [0, 1, 2, 3, 6, 7, 9],
        b: [12, 14, 18, 20, 21, 22, 23, 24, 25],
        k: 6,
        ans: 7
    },
    {
        a: Array.from(new Array(100),(val, index) => index + 101),
        b: Array.from(new Array(100),(val, index) => index + 1),
        k: 100,
        ans: 100
    },
    {
        a: Array.from(new Array(100),(val, index) => index + 1),
        b: Array.from(new Array(100),(val, index) => index + 101),
        k: 100,
        ans: 100
    },
    {
        a: Array.from(new Array(100),(val, index) => index * 2 + 1),
        b: Array.from(new Array(100),(val, index) => index * 2 + 2),
        k: 49,
        ans: 49
    }
];

tests.forEach(test => {
    let res = kth(test.a, test.b, 0, test.a.length, 0, test.b.length, test.k - 1);
    logging = res !== test.ans;
    if (logging) logs++;
    kth(test.a, test.b, 0, test.a.length, 0, test.b.length, test.k - 1);
    log('Inputs:', 'array1', JSON.stringify(test.a), '| array2', JSON.stringify(test.b), '| index', test.k, '| answer', test.ans);
    log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
    number = 0;
    log('');
});
if (!logs) console.log('all done');
