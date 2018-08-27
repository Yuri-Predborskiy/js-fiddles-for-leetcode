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
        let val = '' + list.val;
        while (list.next) {
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

function makeListNode(items) {
    let list = new ListNode(items[0]);
    let item = list;
    for (let i = 1; i < items.length; i++) {
        item.next = new ListNode(items[i]);
        item = item.next;
    }
    return list;
}

module.exports = {
    compareArrays,
    ListNode,
    compareLinkedLists,
    makeListNode,
};