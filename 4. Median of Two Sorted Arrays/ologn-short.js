function kth(arr1, arr2, start1, end1, start2, end2, k) {
    let mid1 = Math.floor(Math.abs(start1 - end1) / 2);
    let mid2 = Math.floor(Math.abs(start2 - end2) / 2);

    if (start1 === end1) {
        return arr2[start2 + k];
    }
    if (start2 === end2) {
        return arr1[start1 + k];
    }

    if (mid1 + mid2 < k) {
        if (arr1[start1 + mid1] < arr2[start2 + mid2]) {
            return kth(arr1, arr2, start1 + mid1 + 1, end1, start2, end2, k - mid1 - 1);
        } else {
            return kth(arr1, arr2, start1, end1, start2 + mid2 + 1, end2, k - mid2 - 1);
        }
    } else {
        if (arr1[start1 + mid1] < arr2[start2 + mid2]) {
            return kth(arr1, arr2, start1, end1, start2, start2 + mid2, k);
        } else {
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
    console.log('Inputs:', 'array1', JSON.stringify(test.a), '| array2', JSON.stringify(test.b), '| index', test.k, '| answer', test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
