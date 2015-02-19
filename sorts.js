function mergeSort (array) {
  if (array.length <= 1) {
    return array;
  }
  var length = array.length;
  var midpoint = Math.floor(length / 2);
  var merge = function (array1, array2) {
    var mergedArray = [];
    while (array1.length > 0 && array2.length > 0) {
      if (array1[0] < array2[0]) {
        mergedArray.push(array1.shift());
      } else {
        mergedArray.push(array2.shift());
      }
    }
    return mergedArray.concat(array1).concat(array2);
  }
  return merge(mergeSort(array.slice(0, midpoint)), mergeSort(array.slice(midpoint, length)));
}

function quickSort (array) {
  if (array.length <= 1) {
    return array;
  }
  var pivot = array[0];
  var less = [];
  var greater = [];
  var equal = [];
  array.forEach(function (el) {
    if (el < pivot) {
      less.push(el);
    } else if (el > pivot) {
      greater.push(el);
    } else {
      equal.push(el)
    }
  });
  return quickSort(less).concat(equal).concat(quickSort(greater));
}

function betterQuickSort (array) {
  var first, last, middle, length, pivot, less, greater, equal;
  length = array.length;
  if (length <= 1) {
    return array;
  }
  first = array[0];
  last = array[length - 1];
  middle = array[Math.floor(length / 2)];
  if (first > last && first < middle) {
    pivot = first;
  } else if (last > first && last < middle) {
    pivot = last;
  } else {
    pivot = middle;
  }
  less = [];
  greater = [];
  equal = [];
  array.forEach(function (el) {
    if (el < pivot) {
      less.push(el);
    } else if (el > pivot) {
      greater.push(el);
    } else {
      equal.push(el);
    }
  });
  return quickSort(less).concat(equal).concat(quickSort(greater));
}
