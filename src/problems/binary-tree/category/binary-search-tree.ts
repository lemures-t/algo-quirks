import BinaryTreeNode = require("../../../collection/binary-tree/base");
import AlgoQuirks = require("../../../AlgoQuirks");

/**
 * 搜索二叉树
 * 树的所有节点，左树都比它小，右树都比他大
 */


type IParam = BinaryTreeNode
class IsBST extends AlgoQuirks<[IParam], boolean> {
  public ingredientMaker(time: number) {
    const str = `
      7,
      3,11,
      1,5,10,15,
      #,#,4,#,#,#,#,#
    `
    const node = BinaryTreeNode.generateBinaryTree(str)
    console.log(node?.toString())
    return [node] as [IParam]
  }

  public main(ingredient: IParam) : boolean{

    let preValue = Number.MIN_SAFE_INTEGER;
    function traverse(head: IParam | null) : boolean{

      if (head === null) return true;

      const bool = traverse(head.left);
      
      if (!bool) return false;

      if (preValue >= head.value) return false;
      preValue = head.value;

      return traverse(head.right);

    }

    return traverse(ingredient)
   
  
  }

  public reference(ingredient: IParam) : boolean {

    function traverse(head: IParam | null) : boolean{

      if (head === null)  return true;

      const nextLeft = traverse(head.left);
      const nextRight = traverse(head.right);

      if (!nextLeft || !nextRight) return false;

      let left = true;
      let right = true;

      if (head.left) {
        left = head.left.value < head.value
      }

      if (head.right){
        right = head.right.value > head.value
      }

      return left && right
    
    }


    return traverse(ingredient)

  }
  public comparator(res: boolean): boolean {
    return false
  }
}

const quirks = new IsBST();

quirks.runWithRef(1, false);


