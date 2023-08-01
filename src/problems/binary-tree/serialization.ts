import BinaryTreeNode = require("../../collection/binary-tree/base");
import AlgoQuirks = require("../../AlgoQuirks");

/**
 * 中序不行的原因是，中序的根节点在中间，无法确定谁是谁的根节点
 * 例如
 * #,2,#,5,#,4,#,1,#,3,#
 * 下面两棵树都可以通过中序遍历成上面的结果
 * `
 * 1,
 * 2,3,
 * #,4,#,#,
 * #,#,5,#,#,#,#,#,
 * `
 * `
 * 1,
 * 5,3
 * 2,4,#,#
 * `
 */
type IParam = {head: BinaryTreeNode, method: 'PRE' | 'POST'}


function serialize (node: BinaryTreeNode | null,  method: 'PRE' | 'POST'){
  function traverse(head: BinaryTreeNode | null): string{

    if (!head) return '#,'

    const left = traverse(head.left)
    const right = traverse(head.right)
    if (method === 'PRE'){
      return `${head.value},` + left + right
    } else {
      return left + right + `${head.value},`
    }
    

  }
  return traverse(node)
}

function deSerialize(str: string,  method: 'PRE' | 'POST'): BinaryTreeNode | null {
  
  // 反序列化核心是找到每一个子树的根节点
  const arr = str.split(',');

  // 前序，根节点在数组前面，所以用队列方式遍历 
  function traversePreOrder(arr: string[]): BinaryTreeNode | null{

    if (!arr.length) return null;

    const value = arr.shift()!;
    
    if (value === '#') return null;

    const root = new BinaryTreeNode(Number(value));
    root.left = traversePreOrder(arr);
    root.right = traversePreOrder(arr);

    return root

  }

  // 后序，根节点在数组末尾，所以用栈的方式遍历
  function traversePostOrder(arr: string[]): BinaryTreeNode | null{

    if (!arr.length) return null;

    const value = arr.pop()!;
    if (value === '#') return null;
    
    const root = new BinaryTreeNode(Number(value));
    root.right = traversePostOrder(arr);
    root.left = traversePostOrder(arr);

    return root

  }

  return method === 'PRE' ? traversePreOrder(arr) : traversePostOrder(arr)

}


class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {

    const str = ` 
      0,
      1,2,
      3,4,#,6,
      7,8,9,10,#,#,#,14
    `;
  
    const head = BinaryTreeNode.generateBinaryTree(str, {linkParent: true});
    console.log(`${head}`)
    const method = ['PRE', 'POST'][time]
    return [{head, method}] as [IParam]
  }

  public main(ingredient: IParam) {
    
    const str = serialize(ingredient.head, ingredient.method).slice(0, -1);
    console.log('serialization', str)
    
    return deSerialize(str, ingredient.method);

  }

  public reference(ingredient: IParam) {
    return ingredient.head
  }
}

const quirks = new Quirks();

quirks.runWithRef(2, false);


