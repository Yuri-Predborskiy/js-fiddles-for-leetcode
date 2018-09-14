// binary search algorithm adapted to LeetCode task
let findMedianSortedArrays = function(nums1, nums2) {
    function findMedianIndex(arrLeft, arrRight, shift, startLeft = 0, endLeft = arrLeft.length, startRight = 0, endRight = arrRight.length) {
        let shiftLeft = Math.floor((endLeft - startLeft) / 2);
        let shiftRight = Math.floor((endRight - startRight) / 2);

        if (startLeft === endLeft) {
            return { arr: 1, left: startLeft, right: startRight + shift };
        }
        if (startRight === endRight) {
            return { arr: 0, left: startLeft + shift, right: startRight };
        }

        if (shiftLeft + shiftRight < shift) {
            if (arrLeft[startLeft + shiftLeft] < arrRight[startRight + shiftRight]) {
                return findMedianIndex(arrLeft, arrRight, shift - shiftLeft - 1, startLeft + shiftLeft + 1, endLeft, startRight, endRight);
            } else {
                return findMedianIndex(arrLeft, arrRight, shift - shiftRight - 1, startLeft, endLeft, startRight + shiftRight + 1, endRight);
            }
        } else {
            if (arrLeft[startLeft + shiftLeft] < arrRight[startRight + shiftRight]) {
                return findMedianIndex(arrLeft, arrRight, shift, startLeft, endLeft, startRight, startRight + shiftRight);
            } else {
                return findMedianIndex(arrLeft, arrRight, shift, startLeft, startLeft + shiftLeft, startRight, endRight);
            }
        }
    }

    let len = (nums1.length + nums2.length - 1) / 2;
    let range = [0, 1];
    if (len === 0) {
        range = [0];
    } else if (len >= 1) {
        if (len % 1 === 0 || len === 1) {
            range = [len];
        } else {
            range = [Math.floor(len), Math.ceil(len)];
        }
    }

    let res = findMedianIndex(nums1, nums2, range[0]);
    let median = res.arr === 0 ? nums1[res.left] : nums2[res.right];
    if (range.length < 2) {
        return median;
    } else {
        if (res.arr === 0) {
            if (!nums2[res.right] || nums1[res.left + 1] <= nums2[res.right]) {
                return (median + nums1[res.left + 1]) / 2;
            } else {
                return (median + nums2[res.right]) / 2;
            }
        } else {
            if (!nums1[res.left] || nums2[res.right + 1] <= nums1[res.left]) {
                return (median + nums2[res.right + 1]) / 2;
            } else {
                return (median + nums1[res.left]) / 2;
            }
        }
    }
};

let tests = [
    {
        a: [0, 1, 2, 3, 6, 7, 9],
        b: [12, 14, 18, 20, 21, 22, 23, 24, 25],
        ans: 13
    },
    {
        a: Array.from(new Array(99),(x, i) => i + 101),
        b: Array.from(new Array(100),(x, i) => i + 1),
        ans: 100
    },
    {
        a: Array.from(new Array(100),(x, i) => i + 1),
        b: Array.from(new Array(99),(x, i) => i + 101),
        ans: 100
    },
    {
        a: Array.from(new Array(100),(x, i) => i * 2 + 1),
        b: Array.from(new Array(99),(x, i) => i * 2 + 2),
        ans: 100
    },
    {
        a: [1, 2, 5, 17, 28],
        b: [3, 4, 7, 9],
        ans: 5
    },
    {
        a: [],
        b: [1],
        ans: 1
    },
    {
        a: [1, 3],
        b: [],
        ans: 2
    },
    {
        a: [1, 3],
        b: [2],
        ans: 2
    },
    {
        a: [1, 2],
        b: [4, 5],
        ans: 3
    }
];

tests.forEach(test => {
    let res = findMedianSortedArrays(test.a, test.b, test.targetIndex - 1);
    console.log('Inputs:', 'array1', JSON.stringify(test.a), '| array2', JSON.stringify(test.b), '| index', test.targetIndex, '| answer', test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
