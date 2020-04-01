/**
 *https://stackoverflow.com/questions/55239386/finding-shortest-path-in-two-dimensional-array-javascript
 */
class Path {
  constructor(matrix) {
    this.matrix = matrix;
  }

  successors(root) {
    let connectedCells = [
      [root[0] - 1, root[1]],
      [root[0], root[1] - 1],
      [root[0] + 1, root[1]],
      [root[0], root[1] + 1]
    ];

    const validCells = connectedCells.filter(
      cell =>
        cell[0] >= 0 &&
        cell[0] < this.matrix.length &&
        cell[1] >= 0 &&
        cell[1] < this.matrix[0].length
    );
    const successors = validCells.filter(
      cell => this.matrix[cell[0]][cell[1]].type <= -1
    );

    return successors;
  }

  buildPath(traversalTree, to) {
    let path = [to];
    let parent = traversalTree[to];
    while (parent) {
      path.push(parent);
      parent = traversalTree[parent];
    }
    return path.reverse();
  }
  bfs(from, to) {
    let traversalTree = [];
    let visited = new Set();
    let queue = [];
    queue.push(from);

    while (queue.length) {
      let subtreeRoot = queue.shift();
      visited.add(subtreeRoot.toString());

      if (subtreeRoot.toString() == to.toString())
        return this.buildPath(traversalTree, to);
      let success = this.successors(subtreeRoot);

      for (const child of success) {
        if (!visited.has(child.toString())) {
          traversalTree[child] = subtreeRoot;
          queue.push(child);
        }
      }
    }
  }
}
