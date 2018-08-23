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

module.exports = {
    compareArrays,
};