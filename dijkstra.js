function shortestPaths (vertices, start) {
  var paths = {};
  var unvisited = new BTreeHeap();
  var visited = {};
  vertices.forEach(function (vertex) {
    if (vertex !== start) {
      paths[vertex.value] = { vertex: vertex, totalCost: Infinity };
      unvisited.insert(vertex.value);
    }
  });
  paths[start.value] = { prevEdge: null, totalCost: 0 };

  var current = start;
  var complete = false;
  while (!complete) {
    current.edges.forEach(function (edge) {
      var vertex = edge.otherVertex(current);
      var cost = paths[current.value].totalCost + edge.cost;
      if (cost < paths[vertex.value].totalCost) {
        paths[vertex.value].totalCost = cost;
        paths[vertex.value].prevEdge = edge;
      }
    });
    visited[current.value] = true;

    if (unvisited.length > 0) {
      current = paths[unvisited.extract()].vertex;
    } else {
      complete = true;
    }
  }

  return paths;
}
