function AVLTree (value) {
  this.root = new AVLTreeNode(value, null);
}

AVLTree.prototype.delete = function (value) {
  var node = this.find(value);
  if (!node) {
    return false;
  }
  this.root = node.delete();
  return true;
};

AVLTree.prototype.find = function (value) {
  return this.root.find(value);
};

AVLTree.prototype.height = function () {
  return this.root.height();
};

AVLTree.prototype.include = function (value) {
  return !!this.find(value);
};

AVLTree.prototype.insert = function (value) {
  var result = this.root.insert(value);
  if (result) {
    this.root = result;
    return true;
  } else {
    return false;
  }
};

AVLTree.prototype.left = function () {
  return this.root.left;
};

AVLTree.prototype.right = function () {
  return this.root.right;
};

function AVLTreeNode (value, parent) {
  this.value = value;
  this.parent = parent;
  this.left = null;
  this.right = null;
}

AVLTreeNode.prototype.balanceFactor = function () {
  var right, left;
  right = this.right === null ? 0 : this.right.height();
  left = this.left === null ? 0 : this.left.height();
  return left - right;
};

AVLTreeNode.prototype.delete = function () {
  var replacement, swapValue, repParent;
  if (!this.left && !this.right) {
    this === this.parent.left ? this.parent.left = null : this.parent.right = null;
    repParent = this.parent;
    this.parent = null;
    return repParent.rotate();
  }
  replacement = this.left ? this.findPredecessor() : this.findSuccessor();
  swapValue = this.value;
  this.value = replacement.value;
  replacement.value = swapValue;
  repParent = replacement.parent;
  if (replacement.right) {
    replacement.right.parent = repParent;
    repParent.right = replacement.right;
  } else if (replacement.left) {
    replacement.left.parent = repParent;
    repParent.left = replacement.left;
  }
  replacement === repParent.left ? repParent.left = null : repParent.right = null;
  replacement.parent = null;
  return repParent.rotate();
};

AVLTreeNode.prototype.find = function (value) {
  var result;
  if (this.value === value) {
    return this;
  } else if (this.value > value) {
    if (!this.left) {
      result = null;
    } else {
      result = this.left.find(value);
    }
  } else {
    if (!this.right) {
      result = null;
    } else {
      result = this.right.find(value);
    }
  }
  return result;
};

AVLTreeNode.prototype.findPredecessor = function () {
  var currentNode;
  currentNode = this.left;
  while (currentNode.right) {
    currentNode = currentNode.right;
  }
  return currentNode;
};

AVLTreeNode.prototype.findSuccessor = function () {
  var currentNode;
  currentNode = this.right;
  while (currentNode.left) {
    currentNode = currentNode.left;
  }
  return currentNode;
};

AVLTreeNode.prototype.height = function () {
  var childHeight, rightHeight, leftHeight;
  if (!this.right && !this.left) {
    childHeight = 0;
  } else if (!this.right) {
    childHeight = this.left.height();
  } else if (!this.left) {
    childHeight = this.right.height();
  } else {
    rightHeight = this.right.height();
    leftHeight = this.left.height();
    childHeight = (rightHeight > leftHeight) ? rightHeight : leftHeight;
  }
  return childHeight + 1;
};

AVLTreeNode.prototype.insert = function (value) {
  var node;
  if (value === this.value) {
    return false;
  } else if (value > this.value) {
    if (!this.right) {
      this.right = new AVLTreeNode(value, this);
      return this.rotate();
    }
    node = this.right;
  } else {
    if (!this.left) {
      this.left = new AVLTreeNode(value, this);
      return this.rotate();
    }
    node = this.left;
  }
  return node.insert(value);
};

AVLTreeNode.prototype.rotate = function () {
  var balance;
  balance = this.balanceFactor();
  if (balance === 2) {
    this.rotateRight();
  } else if (balance == -2) {
    this.rotateLeft();
  }
  if (this.parent === null) {
    return this;
  } else {
    return this.parent.rotate();
  }
};

AVLTreeNode.prototype.rotateLeft = function () {
  var childBalance, grandchild, swapBranch;
  childBalance = this.right.balanceFactor();
  if (childBalance === 1) {
    // child is unbalanced left; reduce to unbalanced right
    grandchild = this.right.left;
    swapBranch = grandchild.right;
    grandchild.right = this.right;
    grandchild.right.left = swapBranch;
    grandchild.right.parent = grandchild;
    grandchild.parent = this;
    this.right = grandchild;
  }
  swapBranch = this.right.left;
  this.right.left = this;
  this.right.parent = this.parent;
  if (this.parent) {
    this.parent.right = this.right;
  }
  this.parent = this.right;
  this.right = swapBranch;
};

AVLTreeNode.prototype.rotateRight = function () {
  var childBalance, grandchild, swapBranch;
  childBalance = this.left.balanceFactor();
  if (childBalance === -1) {
    // child is unbalanced right; reduce to unbalanced left
    grandchild = this.left.right;
    swapBranch = grandchild.left;
    grandchild.left = this.left;
    grandchild.left.right = swapBranch;
    grandchild.left.parent = grandchild;
    grandchild.parent = this;
    this.left = grandchild;
  }
  swapBranch = this.left.right;
  this.left.right = this;
  this.left.parent = this.parent;
  if (this.parent) {
    this.parent.left = this.left;
  }
  this.parent = this.left;
  this.left = swapBranch;
};
