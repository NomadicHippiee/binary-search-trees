import { Node, Tree } from "./tree.js"; 



const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

function generateRandomNumbers(count, maxValue) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(Math.floor(Math.random() * (maxValue + 1)));
  }
  return array;
}   


const randomArray = generateRandomNumbers(15, 100);
const tree = new Tree(randomArray);

console.log("=== INITIAL TREE ===");
console.log("Balanced:", tree.isBalanced());

console.log("\nLevel Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("\nPre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("\nPost Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("\nIn Order:");
tree.inOrderForEach((value) => console.log(value));


console.log("\n=== AFTER UNBALANCING ===");
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

console.log("Balanced:", tree.isBalanced());

console.log("\nLevel Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("\nPre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("\nPost Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("\nIn Order:");
tree.inOrderForEach((value) => console.log(value));


console.log("\n=== AFTER REBALANCING ===");
tree.rebalance();

console.log("Balanced:", tree.isBalanced());

console.log("\nLevel Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("\nPre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("\nPost Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("\nIn Order:");
tree.inOrderForEach((value) => console.log(value));