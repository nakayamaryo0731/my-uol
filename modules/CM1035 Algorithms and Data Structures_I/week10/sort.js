function genRandomArray(n) {
	var arr = [];
	for (var i = 0; i < n; i++) {
		arr[i] = Math.round(10 * Math.random());
	}
	return arr;
}

// This implements the swap function
function swap(array, index1, index2) {
	var x = array[index2];
	array[index2] = array[index1];
	array[index1] = x;
	return array;
}

// This implements the shift function
function shift(array, index1, index2) {
	if (index1 < index2) {
		return array;
	}
	var x = array[index1];
	for (var i = index1; i >= index2 + 1; i--) {
		array[i] = array[i - 1];
	}
	array[index2] = x;
	return array;
}

function insertionSort(array) {
	for (var i = 1; i < array.length; i++) {
		var value = array[i];  // Save the value we're inserting
		var j = i;
		// Find the correct position for the value in the sorted portion
		while (j > 0 && value < array[j - 1]) {
			j--;
		}
		// Shift the element from position i to position j
		if (i !== j) {
			shift(array, i, j);
		}
	}
	return array;
}

// This will generate a random array with 12 elements, print it to the console, and also print what is returned by insertionSort also to the console
var arr = genRandomArray(12);
console.log(arr)
console.log(insertionSort(arr));

// Do not modify the code below this point--------------------------------
module.exports = {
	genRandomArray: genRandomArray,
	swap: swap,
	shift: shift,
	insertionSort: insertionSort
}