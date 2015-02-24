function AVLTree () {
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
  return this.root.height;
};

AVLTree.prototype.include = function (value) {
  return !!this.find(value);
};

AVLTree.prototype.insert = function (value) {
  var node, result;
  node = new AVLTreeNode(value);
  if (typeof this.root === "undefined") {
    this.root = node;
  } else {
    var result = this.root.insert(node);
    if (result) {
      this.root = result;
      return true;
    } else {
      return false;
    }
  }
};

AVLTree.prototype.left = function () {
  return this.root.left;
};

AVLTree.prototype.right = function () {
  return this.root.right;
};

function AVLTreeNode (value) {
  this.value = value;
  this.parent = null;
  this.left = null;
  this.right = null;
  this.height = 1;
}

AVLTreeNode.prototype.addChild = function (node, direction) {
  var swapNode, swapDirection;
  if (this[direction]) {
    swapNode = this[direction];
  }
  if (node.parent) {
    node.parent.removeChild(node);
  }
  node.parent = this;
  this[direction] = node;
  if (swapNode) {
    swapDirection = swapNode.value < node.value ? "left" : "right";
    node.addChild(swapNode, swapDirection);
  }
  this.updateHeight();
};

AVLTreeNode.prototype.balanceFactor = function () {
  var right, left;
  right = this.right === null ? 0 : this.right.height;
  left = this.left === null ? 0 : this.left.height;
  return left - right;
};

AVLTreeNode.prototype.delete = function () {
  if (this.parent) {
    if (!this.left || !this.right) {
     this.parent.removeChild(this);
    }
  } else {
    if (!this.left || !this.right) {
      var direction = this.left ? "left" : "right";
      this[direction].parent = null;
      this[direction] = null;
    } else {
      var swapNode = this.left ? this.findPredecessor() : this.findSuccessor();
      this.swap(swapNode);
      this.delete();
    }
  }
};

AVLTreeNode.prototype.find = function (value) {
  var result;
  if (this.value === value) {
    result = this;
  } else {
    direction = this.value > value ? "left" : "right";
    result = this[direction] ? this[direction].find(value) : null;
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

AVLTreeNode.prototype.insert = function (node) {
  var nextNode, direction, result;
  if (node.value === this.value) {
    return false;
  } else {
    direction = node.value > this.value ? "right" : "left";
    if (!this[direction]) {
      this.addChild(node, direction);
      return this.rotate();
    }
    nextNode = this[direction];
  }
  result = nextNode.insert(node);
  return result;
};

AVLTreeNode.prototype.removeChild = function (child) {
  var direction;
  if (this.left === child) {
    direction = "left";
  } else if (this.right === child) {
    direction = "right";
  }
  if (child.left) {
    this[direction] = child.left;
  } else if (child.right) {
    this[direction] = child.right;
  } else {
    this[direction] = null;
  }
  child.parent = null;
  this.updateHeight();
  return child;
};

AVLTreeNode.prototype.rotate = function () {
  var balance;
  balance = this.balanceFactor();
  if (balance === 2) {
    this.rotateRight();
  } else if (balance == -2) {
    this.rotateLeft();
  }
  if (!this.parent) {
    return this;
  } else {
    return this.parent.rotate();
  }
};

AVLTreeNode.prototype.rotateLeft = function () {
  var childBalance, grandchild, swapBranch, direction;
  childBalance = this.right.balanceFactor();
  if (childBalance === 1) {
    // child is unbalanced left; reduce to unbalanced right
    grandchild = this.right.left;
    this.addChild(grandchild, "right");
  }
  // add right to parent
  // attach to old right
  // attach old right's left to this
  swapBranch = this.removeChild(this.right);
  if (this.parent) {
    direction = this === this.parent.left ? "left" : "right";
    this.parent.addChild(swapBranch, direction);
  } else {
    swapBranch.parent = null;
    swapBranch.addChild(this, "left");
  }
};

AVLTreeNode.prototype.rotateRight = function () {
  var childBalance, grandchild, swapBranch, direction;
  childBalance = this.left.balanceFactor();
  if (childBalance === -1) {
    // child is unbalanced right; reduce to unbalanced left
    grandchild = this.left.right;
    this.addChild(grandchild, "left");
  }
  // add left to parent
  // attach to old left
  // attach old left's right to this
  swapBranch = this.removeChild(this.left);
  if (this.parent) {
    direction = this === this.parent.left ? "left" : "right";
    this.parent.addChild(swapBranch, direction);
  } else {
    swapBranch.parent = null;
    swapBranch.addChild(this, "right");
  }
};

AVLTreeNode.prototype.side = function () {
  return this === this.parent.left ? "left" : "right";
};

AVLTreeNode.prototype.swap = function (replacement) {
  var ownConnections = {
      parent: this.parent,
      left: this.left,
      right: this.right
    };
  var repConnections = {
      parent: replacement.parent,
      left: replacement.left,
      right: replacement.right
    };
  for (key in ownConnections) {
    replacement[key] = ownConnections[key];
  }
  for (key in repConnections) {
    this[key] = repConnections[key];
  }
};

AVLTreeNode.prototype.updateHeight = function () {
  var oldHeight = this.height;
  if (!this.left && !this.right) {
    this.height = 1;
  } else if (!this.left) {
    this.height = this.right.height + 1;
  } else if (!this.right) {
    this.height = this.left.height + 1;
  } else {
    this.height = 1 + Math.max(this.left.height, this.right.height);
  }
  if (this.parent && this.height !== oldHeight) {
    this.parent.updateHeight();
  }
};

function AVLTreeIllustrator (tree) {
  this.$el = $('#tree');
  this.tree = tree;
}

AVLTreeIllustrator.prototype.buildNode = function (node) {
  var $node, $value, $children;
  $node = $('<div>').addClass('node');
  if (node === this.tree.root) {
    $node.addClass('root');
  }
  $value = $('<p>').addClass('value').text(node.value);
  $node.append($value);
  $children = $('<div>').addClass('children');
  if (node.left) {
    $children.append(this.buildNode(node.left));
  } else {
    $children.append($('<div>').addClass('placeholder'));
  }
  if (node.right) {
    $children.append(this.buildNode(node.right));
  }
  $node.append($children);
  return $node;
};

AVLTreeIllustrator.prototype.delete = function (value) {
  this.tree.delete(value);
  this.drawTree();
};

AVLTreeIllustrator.prototype.drawTree = function () {
  this.$el.empty();
  this.$el.append(this.buildNode(this.tree.root));
};

AVLTreeIllustrator.prototype.insert = function (node) {
  this.tree.insert(node);
  this.drawTree();
};
