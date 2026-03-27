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
                currentNode = currentNode.right
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

}

export { Node, Tree };