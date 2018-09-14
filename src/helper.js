function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i])) {
            if (!compareArrays(arr1[i], arr2[i])) return false;
        } else {
            if (arr2[i] !== arr1[i]) return false;
        }
    }
    return true;
}

function compareLinkedLists(list1, list2) {
    function collectValues(list) {
        let val = '' + (list ? list.val : '');
        while (list && list.next) {
            list = list.next;
            val += list.val;
        }
        return val;
    }
    let val1 = collectValues(list1);
    let val2 = collectValues(list2);
    console.log('list 1:', val1, ', list 2:', val2);
    return val1 === val2;
}

function ListNode(val) {
    this.val = val;
    this.next = null;
}

function createLinkedList(values) {
    let head = new ListNode(values[0]), next = head;
    for (let i = 1; i < values.length; i++) {
        next.next = new ListNode(values[i]);
        next = next.next;
    }
    return head;
}

module.exports = {
    compareArrays,
    ListNode,
    compareLinkedLists,
    createLinkedList,
};