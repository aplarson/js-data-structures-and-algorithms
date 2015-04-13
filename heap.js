function BTreeHeap () {
  this.store = [];
  this.length = 0;
}

BTreeHeap.prototype.childVals = function (parentIdx) {
  var left, right;
  left = this.store[2 * parentIdx + 1];
  right = this.store[(2 * parentIdx) + 2];
  if (typeof left === "undefined") {
    return [];
  } else if (typeof right === "undefined") {
    return [left];
  }
  return [left, right];
};

BTreeHeap.prototype.extract = function () {
  var min = this.store[0];
  if (this.store.length > 1) {
    this.store[0] = this.store.pop();
    this.heapifyDown(0);
  } else {
    this.store.pop();
  }
  this.length -= 1;
  return min;
};

BTreeHeap.prototype.heapifyDown = function (parentIdx) {
  var childVals, values, min, minIdx, childIdx, switchVal;
  if (!this.store[parentIdx]) {
    return false;
  }
  childVals = this.childVals(parentIdx);
  values = [this.store[parentIdx]].concat(childVals);
  min = Math.min.apply(Math, values);
  minIdx = values.indexOf(min);
  if (minIdx !== 0) {
    childIdx = (2 * parentIdx) + minIdx;
    switchVal = this.store[childIdx];
    this.store[childIdx] = this.store[parentIdx];
    this.store[parentIdx] = switchVal;
    this.heapifyDown(childIdx);
  }
  return true;
};

BTreeHeap.prototype.insert = function (value) {
  var curIdx, parentIdx;
  this.store.push(value);
  curIdx = this.store.length - 1;
  parentIdx = Math.floor((curIdx - 1) / 2);
  while (value < this.store[parentIdx]) {
    this.store[curIdx] = this.store[parentIdx];
    this.store[parentIdx] = value;
    curIdx = parentIdx;
    parentIdx = Math.floor((curIdx - 1) / 2);
  }
  this.length += 1;
  return true;
};
