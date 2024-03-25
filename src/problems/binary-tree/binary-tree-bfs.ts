// 【代码题】 二叉树层序遍历, 每层的节点放到一个数组里
// 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
// 例如：
// 给定的二叉树是{3,9,20,#,#,15,7},
// 该二叉树层序遍历的结果是[[3],[9,20],[15,7]]
import BinaryTreeNode = require('../../collection/binary-tree/base');
import binaryTreeBFS = require('../../collection/binary-tree/bfs')
import AlgoQuirks = require("../../AlgoQuirks");


class Quirks extends AlgoQuirks<[string]> {

  /**
   * 从持久化的二叉树直接输出成层序遍历的结果
   */
  private bfsFromPersistence(s: string): string[][]{

    const arr = s.split(',');
    
    const res : string[][] = []
    const head = arr[0];
    const queue =[head];
    let i = 1;
    
    while(queue.length > 0){

      let size = queue.length;
      const level : string[] = [];
      
      while(size > 0){
        
        const head = queue.shift();
        if (head !== '#') level.push(head!);
        
        const left = arr[i++];
        if (left) queue.push(left);
        
        const right = arr[i++];
        if (right) queue.push(right);
        
        size--
      }

      res.push(level)
    
    }
   
    return res

  }

  public ingredientMaker() {

    return ['3,9,20,#,#,15,7'] as [string]
  }

  public main(ingredient: string) {
   
    // const p = this.generateBinaryTree(ingredient);
    const res = this.bfsFromPersistence(ingredient);
    return res
    // return JSON.stringify(d)
    // return BinaryTreeNode.generateBinaryTree(ingredient);
  }

  public reference(ingredient: string) {
    return ''
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);


