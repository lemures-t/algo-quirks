// 最低公共祖先
// P8 01:23:00

import BinaryTreeNode = require("../../collection/binary-tree/base");
import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [BinaryTreeNode, BinaryTreeNode, BinaryTreeNode]
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {

    const strs = [
      ` 
        0,
        1,2,
        3,4,5,6,
        7,8,9,10,11,12,13,14
      `,
      ` 
        0,
        1,2,
        3,4,5,6,
        7,8,9,10,11,12,13,14
      `,
    ]

    const heads = strs.map(str=> BinaryTreeNode.generateBinaryTree(str))

    const head = heads[time];
    console.log(`${head}`)
    if (time === 0){
      return [[head!, head!.findNode(2)!, head!.findNode(12)!]] as [IParam]
    } else {
      return [[head!, head!.findNode(7)!, head!.findNode(10)!]] as [IParam]
    }

  }

  public main(ingredient: IParam) {
    // 讨论
    // * O1 为 O2 的祖先，O2 为 O1 的祖先
    // * O1 和 O2 不互为祖先
    
    function traverse(head: BinaryTreeNode | null, O1: BinaryTreeNode, O2: BinaryTreeNode): BinaryTreeNode | null{
      
      if (!head || head === O1 || head === O2){
        return head;
      }

      const left = traverse(head.left, O1, O2);
      const right = traverse(head.right, O1, O2);

      // O1 和 O2 不互为祖先, left right 为 O1 O2
      if (left !== null && right !== null) return head;

      // left === null || right === null, 返回不为空的那个
      // 一个为 O1 或 O2 或 公共祖先, 另一个为 null
      if (left !== null) return left;
      if (right !== null) return right;

      // left === null && right === null 返回 null
      // 无左右子树的情况
      return null;

    }

    return traverse(ingredient[0], ingredient[1], ingredient[2])
  
  }

  public reference(ingredient: IParam) {

    const head = ingredient[0];
    const O1 = ingredient[1];
    const O2 = ingredient[2];

    // 用 parent 指针代替了 hashMap
    function linkParent(node: BinaryTreeNode | null){
      if (!node) return;

      if (node.left) node.left.parent = node
      if (node.right) node.right.parent = node;
      linkParent(node.left);
      linkParent(node.right);
    }

    linkParent(head);

    const set = new WeakSet<BinaryTreeNode>();
    let cur: BinaryTreeNode | null = O1
    // 将 O1 的父节点都放入 set 中
    while(cur){
      set.add(cur)
      cur = cur.parent;
    }
    // 遍历 O2 的父节点，和 set 中进行匹配，匹配到的即为最近公共祖先
    cur = O2
    while(cur){
      if (cur && set.has(cur)) {
        return cur
      }
      cur = cur.parent;
    }
    
    return null

  }
}

const quirks = new Quirks();

quirks.runWithRef(2, false);


