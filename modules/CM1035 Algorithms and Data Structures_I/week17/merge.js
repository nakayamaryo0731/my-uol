// our encoded message
var encoded = ["w","r","e","r","s","h","i","w","r","e","r","w","r","s","h"];

// r is most common (appears 5 times); w appears (3 times); e, s, h appear twice; i appears once
// this is an array of the appears: what appears more commonly is to the left
var letters = ["r", "w", "e", "s", "h", "i"];

// this makes an array of all permutations
function permutations(letters) {
    var n = letters.length;
    if (n <= 1) {
        return [letters];
    }
    var s = [];
    for (var i = 0; i < n; i++) {
        var v = [];

        if (i == 0) {
            v = letters.slice(1, n);
        } else if (i == n) {
            v = letters.slice(0, n-1);
        } else {
            for (var k = 0; k < i; k++) {
                v[k] = letters[k];
            }
            for (k = i + 1; k < n; k++) {
                v[k - 1] = letters[k];
            }
        }

        var w = permutations(v);
        var p = [];
        p[0] = letters[i];
        for (var j = 0; j < w.length; j++) {
            for (var k = 1; k < n; k++) {
                p[k] = w[j][k - 1];
            }
            s.push(p.slice());
         }
    }
    return s;
}

// this assigns a number to each letter: the more common the letter, the higher the value of the number
function frequencyOrder(letter) {
    var frequency = ["e", "i", "s", "h", "r", "w"];
    for (var i = 0; i < 6; i++) {
        if (frequency[i] == letter) {
            return 6 - i;
        }
    }
}


//merges two sorted arrays to produce a third sorted array
function merge(array1, array2) {
    var m = array1.length;
    var n = array2.length;

    var s = [];
    var i = 0;
    var j = 0;
    var k = 0;

    while ((i < m) && (j < n)) {
        if (frequencyOrder(array1[i][0]) > frequencyOrder(array2[j][0])) {
            s[k] = array1[i];
            i++;
        } else {
            s[k] = array2[j];
            j++;
        }
        k++;
    }

    while (i < m) {
        s[k] = array1[i];
        i++;
        k++;
    }

    while (j < n) {
        s[k] = array2[j];
        j++;
        k++;
    }

return s;

}

//initialise arrays that are already sorted according to the frequency of the letters
var test1 = ["e", "r"];
var test2 = ["s"];
//generate the permutations of these arrays
var perms1 = permutations(test1);
var perms2 = permutations(test2);
//when merge is completed, the following should print [ [ 'e', 'r' ], [ 's' ], [ 'r', 'e' ] ] to the console
//uncomment to test
console.log(merge(perms1,perms2));


//recursively does merge sort
function mergeSort(array) {
    var n = array.length;

    // Base case: single element is already sorted
    if (n <= 1) return array;

    // Divide at midpoint
    var mid = Math.floor(n / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid);

    // Recursively sort left and right, then merge
    return merge(mergeSort(left), mergeSort(right));
}


//simplified array for testing
var test3 = ["r", "e", "s"];
//when mergeSort is completed the following should print:
// [
//   [ 'e', 's', 'r' ],
//   [ 'e', 'r', 's' ],
//   [ 's', 'e', 'r' ],
//   [ 's', 'r', 'e' ],
//   [ 'r', 's', 'e' ],
//   [ 'r', 'e', 's' ]
// ]
//we can see here that permutations beginning with e are at the beginning, then permutations beginning with s, as these appear more frequently
//uncomment to test
console.log(mergeSort(permutations(test3)));

//Do not alter anything below this----------------------------------
module.exports = {
    permutations : permutations,
    frequencyOrder : frequencyOrder,
    merge : merge,
    mergeSort : mergeSort
}
