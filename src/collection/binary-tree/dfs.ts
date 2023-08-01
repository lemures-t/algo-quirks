import BinaryTreeNode = require("./base");
import AlgoQuirks = require("../../AlgoQuirks");

// 递归
function binaryTreeDFS (node: BinaryTreeNode | null, method: 'PRE' | 'IN' | 'POST'){

  const res: BinaryTreeNode["value"][] = []

  function traverse(head: BinaryTreeNode | null){
    if (!head) return;

    if (method === 'PRE'){
      res.push(head.value) //前序
    }
    traverse(head.left);
    if (method === 'IN'){
      res.push(head.value) //中序
    }
    traverse(head.right);
    if (method === 'POST'){
      res.push(head.value) //后序
    }

  }

  traverse(node)

  return res

}

// morris 遍历
function binaryTreeDFSByMorris(node: BinaryTreeNode | null, method: 'PRE' | 'IN' | 'POST'){

  function _reserveNodeLink(node: BinaryTreeNode | null){

    let pre: BinaryTreeNode | null = null;
    let next: BinaryTreeNode | null = null;
    let cur = node;
    
    while(cur){
      next = cur.right
      cur.right = pre;
      pre = cur;
      cur = next;
    }

    return pre
    
  }
  
  function _collectReverseNode(node: BinaryTreeNode | null){
    
    const res : BinaryTreeNode["value"][] = [];
    const head = _reserveNodeLink(node);
    let cur = head;
    
    while (cur){
      res.push(cur.value)
      cur = cur.right
    }
    _reserveNodeLink(head)
    return res;

  }

  let res: BinaryTreeNode["value"][] = []
  function morrisTraverse(head: BinaryTreeNode | null){

    let cur: BinaryTreeNode | null = head;
  
    if (!cur) return;
  
    while(cur !== null){
      
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
          // **第一次访问 cur**
          if(method === 'PRE') res.push(cur.value);
          // cur 左移，继续遍历左子树
          cur = cur.left;
        }
        // 左子树的最右叶子节点右子树为当前节点
        if (mostRight.right === cur){
          // 左子树的最右叶子节点右子树置空，恢复最初状态
          mostRight.right = null
          // **第二次访问 cur**
          if (method === 'IN') res.push(cur.value);
          if (method === 'POST'){
            // 后序遍历，需要逆序打印左子树根节点的右边界
            const _res = _collectReverseNode(cur.left);
            res = res.concat(_res);
          }
          // cur 右移，开始遍历右子树
          cur = cur.right
        }
  
      }else{
        if(method === 'PRE' || method === 'IN') res.push(cur.value)
        // 左子树不存在，cur 右移，开始遍历右子树
        cur = cur.right
      }  
    }

    if (method === 'POST'){
      // 后序遍历，最后需要逆序打印头节点的右边界
      const _res = _collectReverseNode(head);
      res = res.concat(_res);
    }
  
  }

  morrisTraverse(node)

  return res
}

// 非递归，先序，自建栈
function binaryTreeDFSByStackPreOrder(node: BinaryTreeNode | null){

  const res = new Array<BinaryTreeNode["value"]>();
  const stack = new Array<BinaryTreeNode>();
  
  if (!node) return []
  
  stack.push(node)
  
  while(stack.length > 0){

    const cur = stack.pop()!;
    
    res.push(cur.value);

    if (cur.right) stack.push(cur.right);
    if (cur.left) stack.push(cur.left);

  }

  return res

}

// 非递归，中序后序，自建栈，朴素 while 循环
function binaryTreeDFSByStackInPostOrderSimple(node: BinaryTreeNode | null, method: 'IN' | 'POST'){

  const res = new Array<BinaryTreeNode["value"]>();
  const stack = new Array<BinaryTreeNode>();

  if (!node) return [];

  let cur: BinaryTreeNode | null = node;

  while(cur !== null){
    stack.push(cur)
    cur = cur.left
  }

  while(stack.length > 0){

    const target = stack[stack.length -1];

    if (method === 'IN'){
      stack.pop();
      res.push(target.value);
    }

    if (method === 'POST'){
      // @ts-ignore
      if (target.rightTraversed){
        stack.pop();
        res.push(target.value);
        continue;
      }
      // @ts-ignore
      target.rightTraversed = true;
    }

    if (target.right){
      let _target: BinaryTreeNode | null = target.right;
      
      while(_target !== null){
        stack.push(_target)
        _target = _target.left
      }

    }
  }

  


  return res;




}
// 非递归，中序后序，自建栈，精妙 while 循环
function binaryTreeDFSByStackInPostOrder(node: BinaryTreeNode | null , method: 'IN' | 'POST'){

  const res = new Array<BinaryTreeNode["value"]>();
  const stack = new Array<BinaryTreeNode>();

  let cur = node;
  if (!cur) return [];

  while(stack.length > 0 || cur !== null){
    if (cur !== null){
      stack.push(cur);
      cur = cur.left
    } else {
      const target = stack[stack.length -1];
      if (method === 'IN'){
        stack.pop();
        res.push(target.value);
      }
      if (method === 'POST'){
        // @ts-ignore
        if (target.traversedRight){
          stack.pop();
          res.push(target.value);
          continue
        }
        // @ts-ignore
        target.traversedRight = true;
      }
      cur = target.right;
    }
  }


  return res


}



type IParam = BinaryTreeNode

class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    // const str = '1, 2,3, 4,5,6,7, 8,9,10,11,12,13,14,15'
    const str = BinaryTreeNode.sampleStr
    const head = BinaryTreeNode.generateBinaryTree(str);
    return [head] as [IParam]
  }

  public main(ingredient: IParam) {
    const preOrder = binaryTreeDFS(ingredient, 'PRE');
    const inOrder = binaryTreeDFS(ingredient, 'IN');
    const postOrder = binaryTreeDFS(ingredient, 'POST');
    return [
      preOrder,
      inOrder,
      postOrder
    ]
  }

  public reference(ingredient: IParam) {

    // const preOrder = binaryTreeDFSByMorris(ingredient, 'PRE');
    const preOrder = binaryTreeDFSByStackPreOrder(ingredient);
    
    // const inOrder = binaryTreeDFSByMorris(ingredient, 'IN');
    // const inOrder = binaryTreeDFSByStackInPostOrder(ingredient, 'IN');
    const inOrder = binaryTreeDFSByStackInPostOrderSimple(ingredient, 'IN');

    // const postOrder = binaryTreeDFSByMorris(ingredient, 'POST');
    // const postOrder = binaryTreeDFSByStackInPostOrder(ingredient, 'POST');
    const postOrder = binaryTreeDFSByStackInPostOrderSimple(ingredient, 'POST');

    
    return [
      preOrder,
      inOrder,
      postOrder
    ]
    // return [
    //   [1,2,4,8,9,5,10,11,3,6,12,13,7,14,15],
    //   [8,4,9,2,10,5,11,1,12,6,13,3,14,7,15],
    //   [8,9,4,10,11,5,2,12,13,6,14,15,7,3,1],
    // ]
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);


