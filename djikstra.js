function shortestPaths (vertices, start) {
  var paths = {};
  var unvisited = {};
  var visited = {};
  vertices.forEach(function (vertex) {
    paths[vertex.value] = { vertex: vertex, totalCost: Infinity };
    unvisited[vertex.value] = true;
  });
  paths[start.value] = { prevEdge: null, totalCost: 0, edges: start.edges };

  var completed = false;
  var current = start;
  while (!completed) {
    current.edges.forEach(function (edge) {
      var vertex = edge.otherVertex(current);
      var cost = paths[current.value].totalCost + edge.cost;
      if (cost < paths[vertex.value].totalCost) {
        paths[vertex.value].totalCost = cost;
        paths[vertex.value].prevEdge = edge;
      }
    });
    visited[current.value] = true;
    delete unvisited[current.value];
    if (Object.getOwnPropertyNames(unvisited).length === 0) {
      completed = true;
    } else {
      current = { totalCost: Infinity }
      for (var vert in unvisited) {
        if (paths[vert].totalCost < current.totalCost) {
          current = paths[vert].vertex;
        }
      }
    }
  }

  return paths;
}
