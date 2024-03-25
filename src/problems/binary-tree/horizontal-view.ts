import BinaryTreeNode = require("../../collection/binary-tree/base");
import AlgoQuirks = require("../../AlgoQuirks");

type IParam = BinaryTreeNode
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker() {

    const arr = "1,2,3,5,#"

    const head = BinaryTreeNode.generateBinaryTree(arr)

    return [head] as [IParam]
  }

  // bfs
  public main(ingredient: IParam) {
    
    let cur = ingredient;
    let queue = [cur];

    const res = []
    while (queue.length){
      let size = queue.length;
      let init = true;

      while(size > 0){
        
        const node = queue.shift()!;

        // left-view
        // if (init){
        //   res.push(node.value)
        //   init = false;
        // }

        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)

        size--
        
        // right-view
        if (size === 0){
          res.push(node.value)
        }
      }
    }

    return res
  
  }

  // dfs
  public reference(ingredient: IParam) {
    
    const res: IParam["value"][] = []
    function traverse(head: IParam | null, level: number){

      if (!head) return null;

      // 先右后左，遍历到的第一个元素是当前层级的最右侧的元素
      // 长度等于层级时，表示当前这个元素就是遍历到的第一个元素，加入结果中
      // 证明：长度等于层级时，如果当前元素不是遍历到的第一个元素，长度会大于层级，与假设矛盾
      // 所以长度等于层级时，表示当前这个元素就是遍历到的第一个元素，
      if (res.length === level) res.push(head.value);

      traverse(head.right, level + 1);
      traverse(head.left, level + 1);

    }
    
    traverse(ingredient, 0)
    
    return res

  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);


