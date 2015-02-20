function PolyTreeNode (value) {
  this.value = value;
  this.parent = null;
  this.children = [];
}

PolyTreeNode.prototype.setParent = function (node) {
  if (this.parent) {
    var oldLoc = this.parent.children;
    oldLoc.splice(oldLoc.indexOf(this), 1);
  }
  this.parent = node;
  node && node.children.push(this);
};

PolyTreeNode.prototype.addChild = function (node) {
  node.setParent(this);
};

PolyTreeNode.prototype.removeChild = function (node) {
  node.setParent(null);
};

PolyTreeNode.prototype.DFS = function (target) {
  if (this.value === target) {
    return this;
  }
  for (var i = 0, length = this.children.length; i < length; i++) {
    var node = this.children[i];
    var result = node.DFS(target)
    if (result) {
      return result;
    }
  }
  return null;
};

PolyTreeNode.prototype.BFS = function (target) {
  var queue = [this];
  while (queue.length > 0) {
    var curNode = queue.shift();
    if (curNode.value === target) {
      return curNode;
    }
    curNode.children.forEach(function (node) {
      queue.push(node);
    });
  }
  return null;
};

function UnbalancedBSTNode (value, parent) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = parent;
}

UnbalancedBSTNode.prototype.delete = function (value) {
  var node = this.get(value);
  if (!node) {
    return false;
  }
  var parent = node.parent;
  if (parent && parent.left === node) {
    var position = "left";
  } else {
    var position = "right";
  }
  // Case 1: delete leaf
  if (!node.left && !node.right) {
    parent[position] = null;
    node.parent = null;
  // Case 2: delete node with only left child
  } else if (node.left && !node.right) {
    parent[position] = node.left;
    node.parent = null;
    node.left = null;
  // Case 3: delete node with only right child
  } else if (node.right && !node.left) {
    parent[position] = node.right;
    node.parent = null;
    node.right = null;
  // Case 4: delete node with two children
  } else {
    var predecessor = node.left;
    while (predecessor.right) {
      predecessor = predecessor.right;
    }
    node.value = predecessor.value;
    predecessor.delete(predecessor.value);
  }
  return true;
};

UnbalancedBSTNode.prototype.get = function (value) {
  if (this.value == value) {
    return this;
  } else if (this.value > value && this.left) {
    return this.left.get(value);
  } else if (this.right) {
    return this.right.get(value);
  }
  return null;
};

UnbalancedBSTNode.prototype.insert = function (value) {
  var node;
  if (this.value === value) {
    return false;
  } else if (this.value > value) {
    if (!this.left) {
      this.left = new UnbalancedBSTNode(value, this);
      return true;
    }
    node = this.left;
  } else {
    if (!this.right) {
      this.right = new UnbalancedBSTNode(value, this);
      return true;
    }
    node = this.right;
  }
  return node.insert(value);
};
