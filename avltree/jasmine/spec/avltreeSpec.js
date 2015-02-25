describe("AVLTreeNode", function () {
  it("has a value", function () {
    n = new AVLTreeNode(1);
    expect(n.value).toEqual(1);
  });

  it("adds a lesser node as a left child", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n1.insert(n2);
    expect(n1.left).toEqual(n2);
  });

  it("adds a greater node as a right child", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(7);
    n1.insert(n2);
    expect(n1.right).toEqual(n2);
  });

  it("increments height when adding on the right", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(7);
    n1.insert(n2);
    expect(n1.height).toEqual(2);
  });

  it("increments height when adding on the left", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n1.insert(n2);
    expect(n1.height).toEqual(2);
  });

  it("does not increment height incorrectly", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n3 = new AVLTreeNode(7);
    n1.insert(n3);
    n1.insert(n2);
    expect(n1.height).toEqual(2);
  });

  it("can be swapped with a leaf only child", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n1.insert(n2);
    n1.swap(n2);
    expect(n1.parent).toEqual(n2);
    expect(n1.left).toEqual(null);
    expect(n2.parent).toEqual(null);
    expect(n2.left).toEqual(n1);
  });

  it("hands off children when swapped with its own child", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n3 = new AVLTreeNode(7);
    n1.insert(n2);
    n1.insert(n3);
    n1.swap(n2);
    expect(n2.right).toEqual(n3);
    expect(n3.parent).toEqual(n2);
  });

  it("can be swapped for a left child with children", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n3 = new AVLTreeNode(7);
    n4 = new AVLTreeNode(1);
    n1.insert(n2);
    n1.insert(n3);
    n1.insert(n4);
    n1.swap(n2);
    expect(n4.parent).toEqual(n1);
    expect(n1.left).toEqual(n4);
    expect(n1.parent).toEqual(n2);
    expect(n2.left).toEqual(n1);
    expect(n2.right).toEqual(n3);
    expect(n1.right).toEqual(null);
    expect(n3.parent).toEqual(n2);
  });

  it("can be swapped for a right child with children", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n3 = new AVLTreeNode(7);
    n4 = new AVLTreeNode(9);
    n1.insert(n2);
    n1.insert(n3);
    n1.insert(n4);
    n1.swap(n3);
    expect(n4.parent).toEqual(n1);
    expect(n1.right).toEqual(n4);
    expect(n1.parent).toEqual(n3);
    expect(n3.right).toEqual(n1);
    expect(n3.left).toEqual(n2);
    expect(n1.left).toEqual(null);
    expect(n2.parent).toEqual(n3);
  });

  it("can be swapped for a leaf descendant", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n3 = new AVLTreeNode(7);
    n4 = new AVLTreeNode(3);
    n1.insert(n2);
    n1.insert(n3);
    n1.insert(n4);
    n1.swap(n4);
    expect(n1.parent).toEqual(n2);
    expect(n2.right).toEqual(n1);
    expect(n1.right).toEqual(null);
    expect(n1.left).toEqual(null);
    expect(n4.parent).toEqual(null);
    expect(n4.left).toEqual(n2);
    expect(n4.right).toEqual(n3);
    expect(n2.parent).toEqual(n4);
    expect(n3.parent).toEqual(n4);
  });

  it("can be swapped for a descendant with children", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n3 = new AVLTreeNode(7);
    n4 = new AVLTreeNode(4);
    n5 = new AVLTreeNode(9);
    n6 = new AVLTreeNode(1);
    n7 = new AVLTreeNode(3);
    n1.insert(n2);
    n1.insert(n3);
    n1.insert(n4);
    n1.insert(n5);
    n1.insert(n6);
    n1.insert(n7);
    n1.swap(n4);
    expect(n1.left).toEqual(n7);
    expect(n7.parent).toEqual(n1);
    expect(n1.right).toEqual(null);
    expect(n1.parent).toEqual(n2);
    expect(n2.right).toEqual(n1);
  });

  it("can be deleted", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n1.insert(n2);
    n2.delete();
    expect(n1.left).toEqual(null);
  });

  it("can be deleted with a left child", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n1.insert(n2);
    n1.delete();
    expect(n2.parent).toEqual(null);
  });

  it("can be deleted with a right child", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(7);
    n1.insert(n2);
    n1.delete();
    expect(n2.parent).toEqual(null);
  });

  it("can be deleted with two children", function () {
    n1 = new AVLTreeNode(5);
    n2 = new AVLTreeNode(2);
    n3 = new AVLTreeNode(7);
    n1.insert(n3);
    n1.insert(n2);
    n1.delete();
    expect(n2.parent).toEqual(null);
    expect(n3.parent).toEqual(n2);
    expect(n2.right).toEqual(n3);
  });
});

describe("AVLTree", function () {
  it("can add a root", function () {
    t = new AVLTree();
    t.insert(5);
    expect(t.root.value).toEqual(5);
  });

  it("rotates if you add two nodes on the right", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9]);
    expect(t.root.value).toEqual(7);
    expect(t.right().value).toEqual(9);
    expect(t.left().value).toEqual(5);
    expect(t.left().right).toEqual(null);
  });

  it("rotates if you add two nodes on the left", function () {
    t = new AVLTree();
    insertSequence(t, [9, 7, 5]);
    expect(t.root.value).toEqual(7);
    expect(t.right().value).toEqual(9);
    expect(t.right().left).toEqual(null);
    expect(t.left().value).toEqual(5);
  });

  it("rotates if you add to the left of a right node", function () {
    t = new AVLTree();
    insertSequence(t, [5, 9, 7]);
    expect(t.root.value).toEqual(7);
    expect(t.right().value).toEqual(9);
    expect(t.left().value).toEqual(5);
  });

  it("rotates if you add to the right of a left node", function () {
    t = new AVLTree();
    insertSequence(t, [9, 5, 7]);
    expect(t.root.value).toEqual(7);
    expect(t.right().value).toEqual(9);
    expect(t.left().value).toEqual(5);
  });

  it("finds the correct place to insert a new greatest node", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 11]);
    expect(t.right().right.value).toEqual(11);
  });

  it("finds the correct place to insert a new least node", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 2]);
    expect(t.left().left.value).toEqual(2);
  });

  it("rotates subtrees right", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 2, 1]);
    expect(t.left().value).toEqual(2);
    expect(t.left().left.value).toEqual(1);
    expect(t.left().right.value).toEqual(5);
  });

  it("rotates subtrees left", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11]);
    expect(t.right().value).toEqual(10);
    expect(t.right().left.value).toEqual(9);
    expect(t.right().right.value).toEqual(11);
  });

  it("rotates right through the root", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 2, 1, 0]);
    expect(t.root.value).toEqual(2);
    expect(t.left().value).toEqual(1);
    expect(t.right().value).toEqual(7);
  });

  it("rotates left through the root", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    expect(t.root.value).toEqual(10);
  });

  it("reattaches subtrees when rotating right", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 2, 1, 0]);
    expect(t.right().left.value).toEqual(5);
    expect(t.right().left.parent).toEqual(t.right());
  });

  it("reattaches subtrees when rotating left", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    expect(t.left().right.value).toEqual(9);
    expect(t.left().right.parent).toEqual(t.left());
  });

  it("finds the value at the root", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    expect(t.find(10)).toEqual(t.root);
  });

  it("finds values on the right", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    expect(t.find(12)).toEqual(t.right().right);
  });

  it("finds values on the left", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    expect(t.find(5)).toEqual(t.left().left);
  });

  it("returns null when value not found", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    expect(t.find(1)).toEqual(null);
  });

  it("deletes leaves", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9]);
    t.delete(9);
    expect(t.find(9)).toEqual(null);
  });

  it("deletes nodes with children", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    t.delete(7);
    expect(t.find(7)).toEqual(null);
    expect(t.find(5)).toEqual(t.left());
    expect(t.find(9)).toEqual(t.left().right);
  });

  it("deletes the root", function () {
    t = new AVLTree();
    insertSequence(t, [5, 7, 9, 10, 11, 12]);
    t.delete(10);
    expect(t.root.value).toEqual(9);
    expect(t.left().value).toEqual(7);
  });
});
