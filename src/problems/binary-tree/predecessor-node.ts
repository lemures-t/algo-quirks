// 前序节点
// 中序遍历结果中的在 X 节点前的那个节点
// 假设二叉树存在 parent 指针

import BinaryTreeNode = require("../../collection/binary-tree/base");
import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [BinaryTreeNode, BinaryTreeNode]
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    const str = ` 
      0,
      1,2,
      3,4,5,6,
      7,8,9,10,11,12,13,14
    `;
    // const str = BinaryTreeNode.sampleStr
    // 中序遍历结果
    // [7,3,8,1,9,4,10,0,11,5,12,2,13,6,14]
    
    const head = BinaryTreeNode.generateBinaryTree(str, {linkParent: true});
    return [[head, head!.findNode(time)]] as [IParam]
  }

  public main(ingredient: IParam) {
    // 讨论
    // 中序遍历的特征
    // 节点 X 如果有左子树，X 的前序节点是，左子树的最右节点
    // 节点 X 如果没有左子树，X 的前序节点是 Y，则 Y 的右子树的最左节点是 X
    // 如果不存在这样的 Y，则 X 的前序节点是 null, 此时 X 的节点是整棵树的最左的节点

    // 时间复杂度 O(k) k 是目标节点和其前序节点之间的距离，前提是输入已经有了 parent 指针
    const target = ingredient[1];

    let cur = target;
    if (!cur) return null
    
    if (cur.left){
      // 有左子树
      let node = cur.left;
      while(node.right){
        node = node.right
      }
      // 找到左子树的最右节点
      return node;
    }else{
      // 无左子树
      let node = cur
      // 向上遍历父节点
      while(node.parent){
        const parent = node.parent;
        // 找到一个节点，他是父节点的右节点，返回父节点
        if (parent.right === node) return parent
        node = parent
      }
      // 全部遍历完，仍然没有结果，直到树的根节点
      // 此时，表示 target 是树的最左节点
      return null
    }
  }

  public reference(ingredient: IParam) {
    
    // 时间复杂度 O(n)
    const head = ingredient[0];
    const target = ingredient[1];

    const inOrderList : BinaryTreeNode[] = [];
    function traverse(node: BinaryTreeNode | null){
      if (!node) return ;

      traverse(node.left);
      inOrderList.push(node);
      traverse(node.right);
    }

    traverse(head);
    // console.log('inOrderlist', inOrderList.map(b => b.value))
    
    for (let i = 0; i < inOrderList.length; i++){
      const cur = inOrderList[i];
      if (cur === target){
        return inOrderList[i - 1] ?? null
      }
    }

    return null;

  }
}

const quirks = new Quirks();

quirks.runWithRef(15, false);

