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
  });

  it("rotates if you add two nodes on the left", function () {
    t = new AVLTree();
    insertSequence(t, [9, 7, 5]);
    expect(t.root.value).toEqual(7);
    expect(t.right().value).toEqual(9);
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
  })
});
