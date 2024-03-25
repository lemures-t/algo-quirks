// P15 00:35:44

/**
 * morris 遍历
 * 
 * 是一种遍历二叉树的方式，并且时间复杂度O(N)，额外空间复杂度O(1) // 递归需要O(n)
 * 通过利用原树种大量空闲指针的方式，达到节省空间的目的
 * 
 * 先序、终序可以由 morris 遍历加工得到啊
 * 后序遍历需要把处理时机放在，能够达到两次的节点并且是第二次到达的时候
 * 
 * 
 * Morris 遍历细节
 *  假设来到当前节点 cur ，开始时 cur 来到头节点位置
 *  1）如果 cur 没有左孩子， cur 向右移动（ cur = cur.right )
 *  2）如果 cur 有左孩子，找到左子树上最右的节点 mostRight :
 *    a．如果 mostRight 的右指针指向空，让其指向 cur ,然后 cur 向左移动（ cur = cur.left )
 *    b．如果 mostRight 的右指针指向 cur ，让其指向 null ,然后 cur 向右移动（ cur = cur.right )
 *  3) cur 为空时遍历停止
 * 
 *  说明
 *  步骤1：cur 节点，寻找左子树的最右叶子节点，将最右叶子节点，指向为 cur 节点，（用以回溯，所以看遍历路径，这种 cur 节点会被问两次）
 *  步骤2：之后，cur 指向 cur.left，继续重复步骤1，将从头节点出发的所有左子树的最右叶子节点，都指向为某个根节点
 *  步骤3：直到 cur.left 为空，cur 指向 cur.right, 访问某个根节点的右子树
 *    步骤3.1 右子树根节点如果仍然有左子树，则继续重复步骤 1，
 *    步骤3.2 右子树如果没有左子树，则重复步骤3，此时cur.right可能为步骤1 中所指向的 cur 节点，如果是，则重复步骤 1
 *  步骤4：3.2 之后，会重复找到左子树的最右叶子节点，当发现该叶子节点所指向的是 cur 节点时，将指向置空，恢复为默认状态，cur 指向 cur.right，重复步骤 3
 *  
 *  可以看出，寻找左子树的最右叶子节点，会进行两边，假设其会覆盖所有的节点，则该操作的时间复杂度为 T(2n) 仍然是 O(n) 级别
 * 
 * 
 */
import BinaryTreeNode = require("./base");
import AlgoQuirks = require("../../AlgoQuirks");

type IParam = BinaryTreeNode
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker() {

    const str = '1,2,3,4,5,6,7,#,#,8,9,#,#'
    const head = BinaryTreeNode.generateBinaryTree(str);
    console.log(head?.toString())
    return [head] as [IParam]
  }

  public main(ingredient: IParam) {

    const path: IParam["value"][] = []
    function morrisTraverse(head: BinaryTreeNode | null){

      let cur: BinaryTreeNode | null = head;

      if (!cur) return;

      while(cur !== null){
        
        path.push(cur.value)
        
        let mostRight : BinaryTreeNode | null = cur.left;

        if (mostRight !== null){
          // 左子树存在
          // 寻找左子树的最右叶子节点，节点无右子树，或右子树为当前节点自己时，认为找到了左子树的最右叶子节点
          while(mostRight.right !== null && mostRight.right !== cur){
            mostRight = mostRight.right;
          }
          // 左子树的最右叶子节点无右子树
          if (mostRight.right == null){
            // 左子树的最右叶子节点右子树指向当前节点
            mostRight.right = cur;
            // 第一次访问
            // cur 左移，继续遍历左子树
            cur = cur.left;
          }
          // 左子树的最右叶子节点右子树为当前节点
          if (mostRight.right === cur){
            // 左子树的最右叶子节点右子树置空，恢复最初状态
            // 第二次访问
            mostRight.right = null
            // cur 右移，开始遍历右子树
            cur = cur.right
          }

        }else{
          // 左子树不存在，cur 右移，开始遍历右子树
          cur = cur.right
        }

      }

    }


    morrisTraverse(ingredient)

    return path
  }

  public reference(ingredient: IParam) {
    return [1,2,4,2,5,8,5,9,1,3,6,3,7]
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);


