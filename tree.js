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
}

export { Node, Tree };