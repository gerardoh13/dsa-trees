/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    function recursion(node) {
      if (!node.left && !node.right) return 1;
      if (!node.left) return recursion(node.right);
      if (!node.right) return recursion(node.left) + 1;
      return Math.min(recursion(node.left), recursion(node.right)) + 1;
    }
    return recursion(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    function recursion(node) {
      if (!node.left && !node.right) return 1;
      if (!node.left) return recursion(node.right);
      if (!node.right) return recursion(node.left) + 1;
      return Math.max(recursion(node.left), recursion(node.right)) + 1;
    }
    return recursion(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let toVisitStack = [this.root];
    let closest;
    let prevClosest;

    if (!toVisitStack[0]) return null;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      if (current.val > lowerBound && current.val < prevClosest) {
        closest = current.val;
        prevClosest = current.val;
      } else if (current.val > lowerBound && !prevClosest) {
        closest = current.val;
        prevClosest = current.val;
      }

      for (let child of [current.left, current.right]) {
        if (child) toVisitStack.push(child);
      }
    }
    return closest ? closest : null;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {}

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    let toVisitStack = [tree.root];
    let arr = [];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current) {
        arr.push(current.val);
        for (let child of [current.left, current.right]) {
          toVisitStack.push(child);
        }
      } else {
        arr.push("#");
      }
    }
    return arr.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    let arr = stringTree.split(" ");
    let revisit = [];
    let lastVisited;
    let root;
    let ex;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "#") {
        let node = new BinaryTreeNode(+arr[i]);
        if (!lastVisited) {
          root = node;
        } else {
          if (ex) {
            lastVisited.left = node;
            ex = false;
          } else {
            let direction = lastVisited.right ? "left" : "right";
            lastVisited[direction] = node;
          }
        }
        lastVisited = node;
        if (arr[i + 1] !== "#") revisit.push(node);
      } else if (arr[i] === "#" && arr[i + 1] === "#")
        lastVisited = revisit.pop();
      else if (arr[i] === "#" && arr[i - 1] !== "#" && arr[i + 1] !== "#")
        ex = true;
    }
    return root ? new BinaryTree(root) : null;
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
