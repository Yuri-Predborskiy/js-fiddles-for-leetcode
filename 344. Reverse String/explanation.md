Solution explanation

**Native functions - language-defaults.js**

This approach uses native javascript functions to make the code very short and easy to read.

```
let reverseString = function(s) {
    return s.split('').reverse().join('');
};
```

What we did there:

First, we split a string into array of characters. Since we provide empty string as divider, the entire string is split into array elements, every character becomes a separate element. Next, we apply Array.prototype method `reverse()`, which, as the name implies, reverses the contents of an array. Then we simply join the array back into a string without any divider (using empty string `''` as element divider).

Time and space complexity are unknown because we're using built-in language functions instead of writing our own super-efficient code. You can google on time and space complexity of these functions if you *must* know.

**Two pointers approach**

We can do this using two pointer approach to reduce the number of times we "run" this script against array by half:

```
let reverseString = function(s) {
    let arr = s.split(''), left = 0, right = arr.length - 1;
    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        ++left;
        --right;
    }
    return arr.join('');
};
```

This approach is fairly straightforward:

First, declare two pointers, left and right. Then iterate over the array, one pointer looking at the front of the array, another looking at the rear. As long as left is smaller than right, swap elements in place. When pointers meet or cross, you're done.

Time complexity: O(n)

Space complexity: O(n). We create a separate array based on input string, number of elements in array matches the number of characters in the string.

**Bad examples**

Here are two more solutions you should not use.
1. Assume strings can be manipulated directly, like an array (since you can access string elements by index). Example:
```
let reverseString = function(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        ++left;
        --right;
    }
    return s;
};
```
**In Javascript** strings are immutable (this depends on programming language), which means string is like an array in the meaning you can access its elements by index. But it does not allow manipulating individual elements at individual indexes. If you try this in 'normal' mode, it fill fail silently (it will execute but string won't be modified and you'll never know why). If you use strict mode via `'use strict';`, it will fail with the following error:

`TypeError: Cannot assign to read only property '0' of string 'hello'`

Verdict of the story: you should **always** use strict mode.

2. Try to work around the problem of immutable strings by 'concatenating' strings at each step of a loop, like this:

```
var reverseString = function(s) {
    let res = "";
    for(let i = s.length - 1; i >= 0; i --){
        res += s[i];
    }
    return res;
};
```

This approach will work and won't crash (not immediately, at least). The problem of this approach is that it will use a ton of space (`O(n!)`, I believe, which is pretty **bad**) instead of `O(n)` one would expect.

*Why this happens*: since strings are immutable, you'll be creating a new string at each step of the loop, each string will be as long as previous string + 1 element. This means we're effectively creating and discarding O(n) strings, each of which ranges from `O(1)` to `O(n)` in space, effectively means we're **wasting** (touching, garbaging) `O(n!)` space even though it seems we only use `O(n)` space at any one moment. All those strings should be garbage-collected at some point, which will affect performance. For smaller strings and smaller programs the effect will be minimal, but for large-scale applications this could create bottlenecks at some point.

Hopefully you find this information useful :)

P.S.: all examples will only work with strings that fit into memory. If your string doesn't fit into memory (large files, multiple gigabytes each, will not fit into the memory of a small virtual machine in AWS cluster, for example), you have to create a different approach. For example: create a number of files, each containing a portion of the reversed string and save them with some index. Then process file array from the end, streaming file contents into the resulting file.

If you know a better approach of reversing huge files, please do let me know.