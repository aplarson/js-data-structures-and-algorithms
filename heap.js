function BTreeHeap () {
  this.heap = [];
  this.length = 0;
}

BTreeHeap.prototype.childVals = function (parentIdx) {
  var left, right;
  left = this.heap[2 * parentIdx + 1];
  right = this.heap[(2 * parentIdx) + 2];
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
  var childVals, values, min, minIdx, childIdx, switchVal;
  if (!this.heap[parentIdx]) {
    return false;
  }
  childVals = this.childVals(parentIdx);
  values = [this.heap[parentIdx]].concat(childVals);
  min = Math.min.apply(Math, values);
  minIdx = values.indexOf(min);
  if (minIdx !== 0) {
    childIdx = (2 * parentIdx) + minIdx;
    switchVal = this.heap[childIdx];
    this.heap[childIdx] = this.heap[parentIdx];
    this.heap[parentIdx] = switchVal;
    this.heapifyDown(childIdx);
  }
  return true;
};

BTreeHeap.prototype.insert = function (value) {
  var curIdx, parentIdx;
  this.heap.push(value);
  curIdx = this.heap.length - 1;
  parentIdx = Math.floor((curIdx - 1) / 2);
  while (value < this.heap[parentIdx]) {
    this.heap[curIdx] = this.heap[parentIdx];
    this.heap[parentIdx] = value;
    curIdx = parentIdx;
    parentIdx = Math.floor((curIdx - 1) / 2);
  }
  this.length += 1;
  return true;
};
