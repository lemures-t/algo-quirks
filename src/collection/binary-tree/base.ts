export = class BinaryTreeNode {
  public value: number;
  public left: BinaryTreeNode | null;

  public right: BinaryTreeNode | null;
  public parent: BinaryTreeNode | null; //父节点，默认不初始化

  constructor(v: number){
    this.value = v;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  public findNode(v: number){
    
    function traverse(head:BinaryTreeNode | null) : BinaryTreeNode | null{
      if (!head) return null;
      
      if(head.value === v) return head;
      
      const left = traverse(head.left);
      const right = traverse(head.right);
      
      if (left) return left;
      if (right) return right;

      return null
      
    }

    return traverse(this)
  }

  // 广度遍历，打印一颗二叉树
  public toString(){

    const queue : (BinaryTreeNode | null)[] = [this];
    
    let res: string[] = []
    
    while(queue.length){

      let size = queue.length;
      let cur = ''
      let allEmpty = true;
      
      while(size > 0){
        const head = queue.shift();
        if (head){
          cur += head.value + '@'
          queue.push(head.left);
          queue.push(head.right);
          allEmpty = false;
        } else {
          cur += '#@'
          queue.push(null)
          queue.push(null)
        }
        size --
      }

      if (allEmpty) break;
      res.push(cur)
    
    }

    let str = '';

    // 叶子节点 grid 数
    const leafGrid = Math.pow(2, res.length) - 1
    // 1 层，前置空格数
    const basePre = Math.floor(leafGrid / 2);
    
    for (let i = 0; i < res.length; i++){
      // 每一行的前置空格数
      const pre = Math.floor(basePre / Math.pow(2, i));
      // 每一行的节点数
      const nodes = Math.pow(2, i);
      // 每一行节点之间的空格数
      const grid = Math.floor((leafGrid - pre * 2 - nodes) / Math.max(nodes - 1, 1));
      // console.log('g', pre, nodes, grid)
      const nodeRes = res[i].split('@').join(' '.repeat(grid))
      str += ' '.repeat(pre) + nodeRes + '\n'
    }

    return str

  }
  /**
   * 从持久化的二叉树结果通过广度遍历转换成二叉树
   * ['3,9,20,#,#,15,7']
   */
  public static generateBinaryTree(s: string, option?:{linkParent?: boolean}): BinaryTreeNode | null{

    const arr = s.split(',');
    const nodes : (BinaryTreeNode | null)[] = [];

    for (let i = 0; i < arr.length; i++){
      const v = arr[i].trim();
      if (v !== '#'){
        const node = new BinaryTreeNode(Number(v));
        nodes[i] = node;
      }else{
        nodes[i] = null;
      }
    }
    for (let i = 0, j =1; j < nodes.length; i++){
      const node = nodes[i];
      if (node){
        // 下面取 left 和 right 的方法是重点
        node.left = nodes[j++];
        node.right = nodes[j++];
        if (option?.linkParent){
          if (node.left) node.left.parent = node;
          if (node.right) node.right.parent = node;
        }
      }else{
        // 空节点时，j 也要增加，防止后序节点挂错
        j += 2;
      }
    }

    return nodes[0]

  }

  public static sampleStr = `
    1,2,3,14,4,10,9, 
    #,#,5,#,#,11,#,#,
    #,#,#,#,6,#,#,#,#,#,12,#,#,#,#,#,
    #,#,#,#,#,#,#,#,#,7,#,#,#,#,#,#,#,#,#,#,#,13,#,#,#,#,#,#,#,#,#,#,
    #,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,8,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#
  `
}