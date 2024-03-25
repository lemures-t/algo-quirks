// P15 00:13
import BinaryTreeNode = require("../../../collection/binary-tree/base");
import AlgoQuirks = require("../../../AlgoQuirks");

type IParam = BinaryTreeNode
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker() {

    const str = '1,2,#,4,5,#,#,7,6,#,8'
    const head = BinaryTreeNode.generateBinaryTree(str)
    console.log(head?.toString())
    return [head] as [IParam]
  }

  public main(ingredient: IParam) : number {

    function findMaxDistance(head: IParam | null) : {height: number, maxDistance: number} {

      if (!head){
        return {
          height: 0,
          maxDistance: 0
        }
      }

      const left = findMaxDistance(head.left);
      const right = findMaxDistance(head.right);

      const height = Math.max(left.height, right.height) + 1;
      //00:19:45
      const maxDistance = Math.max(left.maxDistance, right.maxDistance, left.height + right.height + 1);

      return {
        height,
        maxDistance
      }
      
    }

    return findMaxDistance(ingredient).maxDistance

  }

  public reference(ingredient: IParam): number {
    return 5
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);

