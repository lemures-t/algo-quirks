import BinaryTreeNode = require("../../collection/binary-tree/base");
import AlgoQuirks = require("../../AlgoQuirks");

type IParam = BinaryTreeNode

class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker() {
    const arr = "1,2,3,9,10,5,6,7,8"

    const head = BinaryTreeNode.generateBinaryTree(arr)
    console.log(head?.toString())
    console.log('res.ingredients')
    return [head] as [IParam]
  }

  public main(ingredient: IParam) {
    
    const columnMap = new Map<number, IParam["value"]>();

    function traverse (head: IParam | null, col: number) {

      if (!head) return;
      
      // 顶视图
      // if (typeof columnMap.get(col) === 'undefined'){
      //   columnMap.set(col, head.value)
      // }
      // 底视图
      columnMap.set(col, head.value)
      
      traverse(head.left, col - 1);
      traverse(head.right, col + 1);

    }

    traverse(ingredient, 0);

    return Array.from(columnMap.keys()).sort((a, b)=> a - b).reduce((prev, next)=>{
      const v = columnMap.get(next);
      if (typeof v !== 'undefined') prev.push(v);
      return prev
    }, [] as IParam["value"][]);


  }

  public reference(ingredient: IParam) {
    return ''
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);



