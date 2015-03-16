function Vertex (value) {
  this.value = value;
  this.edges = [];
}

Vertex.prototype.connect = function (vertex, cost) {
  var edge;
  edge = new Edge(this, vertex, cost);
  this.edges.push(edge);
  vertex.edges.push(edge);
}

function Edge (vertex1, vertex2, cost) {
  this.vertex1 = vertex1;
  this.vertex2 = vertex2;
  this.cost = cost;
}

Edge.prototype.otherVertex = function (vertex) {
  if (vertex === this.vertex1) {
    return this.vertex2;
  } else if (vertex = this.vertex2) {
    return this.vertex1;
  }
}
