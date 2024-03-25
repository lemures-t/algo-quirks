import BinaryTreeNode = require("../../../collection/binary-tree/base");
import AlgoQuirks = require("../../../AlgoQuirks");

/**
 * https://www.cnblogs.com/idorax/p/6441043.html
 * 
 * 完全二叉树
 * 最后一层可以不满，但所有的节点都靠左
 * A Complete Binary Tree （CBT) is a binary tree in which every level, 
 * except possibly the last, is completely filled, and all nodes 
 * are as far left as possible.
 */
type IParam = BinaryTreeNode
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    const strs = [
      `
        0,
        1,2,
        3,4,#,#,
        7,#,#,#,#,#,#,#
      `,
      `
        0,
        1,2,
        3,4,#,#,
        #,#,#,#,#,#,#,#
      `,
      `
        0,
        1,2,
        3,4,5,6,
        7,8,9,#,#,#,#,#
      `,
      `
        0,
        1,2,
        3,4,5,6,
        7,8,#,9,#,#,#,#
      `,
    ]
    const node = BinaryTreeNode.generateBinaryTree(strs[time]);
    return [node] as [IParam]
  }

  public main(ingredient: IParam) {
   
    let cur : BinaryTreeNode | null = ingredient;
    const queue: BinaryTreeNode[] = [cur];
    let isLeaf = false;

    while (queue.length > 0){

      const node = queue.shift()!;

      if (node.right && !node.left) return false;
      if (isLeaf && (node.left || node.right)) return false;
      // 不满的被认为是最后一层
      if (!node.left || !node.right) isLeaf = true;

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right);

    }

    return true
  
  }

  public reference(ingredient: IParam) {
    return true
  }
}

const quirks = new Quirks();

quirks.runWithRef(4, false);


