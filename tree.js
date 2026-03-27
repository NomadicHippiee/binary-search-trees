class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    let cleanedArray = [...new Set(array)];
    cleanedArray = cleanedArray.sort((a, b) => a - b);
    this.root = this.buildTree(cleanedArray, 0, cleanedArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let newNode = new Node(array[mid]);

    newNode.left = this.buildTree(array, start, mid - 1);
    newNode.right = this.buildTree(array, mid + 1, end);

    return newNode;
  }
  includes(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        return true;
      }

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }
  insert(value) {
    if (this.includes(value) === true) {
      return;
    }
    this.root = this.insertHelper(this.root, value);
  }
  insertHelper(node, value) {
    if (node === null) {
      return new Node(value);
    }
    if (value < node.data) {
      node.left = this.insertHelper(node.left, value);
    } else {
      node.right = this.insertHelper(node.right, value);
    }

    return node;
  }
  deleteItem(value) {
    this.root = this.deleteHelper(this.root, value);
  }
  deleteHelper(node, value) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      node.left = this.deleteHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteHelper(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      let minRight = this.findMin(node.right);
      node.data = minRight;
      node.right = this.deleteHelper(node.right, minRight);
    }
    return node;
  }
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }
  levelOrderForEach(callback) {
    if (callback === null || callback === undefined) {
      throw new Error("Callback is required");
    }
    if (this.root === null) {
      return;
    }

    let queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let node = queue.shift();
      callback(node.data);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }
  inOrderForEach(callback) {
    if (callback === null || callback === undefined) {
      throw new Error("Callback is required");
    }
    function traverse(node) {
      if (node === null) {
        return;
      }
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }
    traverse(this.root);
  }
  preOrderForEach(callback) {
    if (callback === null || callback === undefined) {
      throw new Error("Callback is required");
    }
    function traverse(node) {
      if (node === null) {
        return;
      }
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
  }
  postOrderForEach(callback) {
    if (callback === null || callback === undefined) {
      throw new Error("Callback is required");
    }
    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    }
    traverse(this.root);
  }
  height(value) {
    function calculateHeight(node) {
      if (node === null) {
        return -1;
      }
      let leftHeight = calculateHeight(node.left);
      let rightHeight = calculateHeight(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }
    function search(node, value) {
      if (node === null) {
        return undefined;
      }
      if (node.data === value) {
        return calculateHeight(node);
      }
      if (value < node.data) {
        return search(node.left, value);
      } else {
        return search(node.right, value);
      }
    }
    return search(this.root, value);
  }
  depth(value) {
    function search(node, value, currentDepth) {
      if (node === null) {
        return undefined;
      }
      if (node.data === value) {
        return currentDepth;
      }
      if (value < node.data) {
        return search(node.left, value, currentDepth + 1);
      } else {
        return search(node.right, value, currentDepth + 1);
      }
    }
    return search(this.root, value, 0);
  }
  isBalanced() {
    function getHeight(node) {
      if (node === null) {
        return -1;
      }
      let leftHeight = getHeight(node.left);
      let rightHeight = getHeight(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }
    function checkBalance(node) {
      if (node === null) {
        return true;
      }

      let leftHeight = getHeight(node.left);
      let rightHeight = getHeight(node.right);

      let heightDiff = Math.abs(leftHeight - rightHeight);

      if (heightDiff > 1) {
        return false;
      }
      if (checkBalance(node.left) === false) {
        return false;
      }
      if (checkBalance(node.right) === false) {
        return false;
      }

      return true;
    }
    return checkBalance(this.root);
  }
  rebalance() {
    let array = [];

    function collectValues(node) {
        if (node === null) {
            return;
        }

        collectValues(node.left);
        array.push(node.data);
        collectValues(node.right);
    }
    collectValues(this.root);
    this.root = this.buildTree(array, 0, array.length -1)

  }
}

export { Node, Tree };
