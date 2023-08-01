import BinaryTreeNode = require("./base");
import AlgoQuirks = require("../../AlgoQuirks");

function binaryTreeBFS (node: BinaryTreeNode | null){

  const res: BinaryTreeNode["value"][][] = []
  
  if (!node) return [];
 
  const queue : BinaryTreeNode[] = [];
  queue.push(node);
  
  while(queue.length > 0){
    
    let size = queue.length;
    const current: BinaryTreeNode["value"][] = [];

    while(size > 0){

      const head = queue.shift()!;
      
      current.push(head.value);
      
      if (head.left) queue.push(head.left);
      if (head.right) queue.push(head.right);

      size--;

    }
    res.push(current)
  }

  return res

}


class Quirks extends AlgoQuirks<[BinaryTreeNode]> {
  public ingredientMaker() {
    const headA = new BinaryTreeNode(1);
    const headB = new BinaryTreeNode(2);
    const headC = new BinaryTreeNode(3);
    const headD = new BinaryTreeNode(4);
    const headE = new BinaryTreeNode(5);
    const headF = null //new BinaryTreeNode(6);
    const headG = new BinaryTreeNode(7);
    const headH = new BinaryTreeNode(8);
    const headI = new BinaryTreeNode(9);
    const headJ = null //new BinaryTreeNode(1);
    const headK = null //new BinaryTreeNode(22);
    const headL = new BinaryTreeNode(3);
    const headM = new BinaryTreeNode(4);
    const headO = new BinaryTreeNode(5);
    const headP = new BinaryTreeNode(6);
    const headQ = new BinaryTreeNode(7);
    const headR = new BinaryTreeNode(8);
    headA.left = headB;
    headA.right = headC;
    headB.left = headD;
    headB.right = headE;
    headC.left = headF;
    headC.right = headG;
    headD.left = headH;
    headD.right = headI;
    // headE.left = headJ;
    // headE.right = headK;
    // headF.left = headL;
    // headF.right = headM;
    headG.left = headO;
    headG.right = headP;
    headH.left = headQ;
    headH.right = headR;

    return [headA] as [BinaryTreeNode]
  }

  public main(ingredient: BinaryTreeNode) {
    // console.log('ingredient', ingredient)
    // return JSON.stringify(binaryTreeBFS(ingredient))
    // console.log(ingredient)
    // return ingredient
    return binaryTreeBFS(ingredient)

  }

  public reference(ingredient: BinaryTreeNode) {
    return []
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);





export = {
  binaryTreeBFS
}