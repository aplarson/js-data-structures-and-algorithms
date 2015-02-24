function insertSequence (tree, sequence) {
  sequence.forEach(function (value) {
    tree.insert(value);
  });
}
