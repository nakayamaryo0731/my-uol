function genRandomArray(n) {
	var arr = [];
	for (var i = 0; i < n; i++) {
		arr[i] = Math.round(10 * Math.random());
	}
	return arr;
}

function swap(array, index1, index2) {
	var saveElement = array[index1];
	array[index1] = array[index2];
	array[index2] = saveElement;
	return array;
}

function bubbleSort(array) {
	var n = array.length;
	for (var i = 1; i < n; i++) {
		var count = 0;
		for (var j = 0; j < n - 1; j++) {
			if (array[j + 1] < array[j]) {
				count++;
				swap(array, j, j + 1);
			}
		}
		if (count == 0) {
			break;
		}
	}
	return array;
}

function search(array, x, left, right) {
	// Base case: element not found
	if (left > right) {
		return false;
	}

	// Find the middle index
	var mid = Math.floor((left + right) / 2);

	// Check if x is at mid
	if (array[mid] == x) {
		return true;
	}
	// If x is smaller, search left half (decrease and conquer)
	else if (x < array[mid]) {
		return search(array, x, left, mid - 1);
	}
	// If x is larger, search right half (decrease and conquer)
	else {
		return search(array, x, mid + 1, right);
	}
}

function binarySearch(array, x) {
	// Call recursive search with initial left=0 and right=array.length-1
	return search(array, x, 0, array.length - 1);
}


// Do not modify the code below this point--------------------------------
module.exports = {
	genRandomArray: genRandomArray,
	swap: swap,
	bubbleSort: bubbleSort,
	search: search,
	binarySearch: binarySearch
}