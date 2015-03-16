function BTreeHeap () {
  this.heap = [];
  this.length = 0;
}

BTreeHeap.prototype.childVals = function (parentIdx) {
  var left = this.heap[2 * parentIdx + 1];
  var right = this.heap[(2 * parentIdx) + 2];
  if (typeof left === "undefined") {
    return [];
  } else if (typeof right === "undefined") {
    return [left];
  }
  return [left, right];
};

BTreeHeap.prototype.extract = function () {
  var min = this.heap[0];
  if (this.heap.length > 1) {
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
  } else {
    this.heap.pop();
  }
  this.length -= 1;
  return min;
};

BTreeHeap.prototype.heapifyDown = function (parentIdx) {
  if (!this.heap[parentIdx]) {
    return false;
  }
  var childVals = this.childVals(parentIdx);
  var values = [this.heap[parentIdx]].concat(childVals);
  var min = Math.min.apply(Math, values);
  var minIdx = values.indexOf(min);
  if (minIdx !== 0) {
    var childIdx = (2 * parentIdx) + minIdx;
    var switchVal = this.heap[childIdx];
    this.heap[childIdx] = this.heap[parentIdx];
    this.heap[parentIdx] = switchVal;
    this.heapifyDown(childIdx);
  }
  return true;
};

BTreeHeap.prototype.insert = function (value) {
  this.heap.push(value);
  var curIdx = this.heap.length - 1;
  var parentIdx = Math.floor((curIdx - 1) / 2);
  while (value < this.heap[parentIdx]) {
    this.heap[curIdx] = this.heap[parentIdx];
    this.heap[parentIdx] = value;
    curIdx = parentIdx
    parentIdx = Math.floor((curIdx - 1) / 2);
  }
  this.length += 1;
  return true;
};
