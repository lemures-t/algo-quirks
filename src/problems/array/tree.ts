/**
 * 输入两个数组 number[]
 * arr1 表示节点值
 * arr2 表示索引 i 在 arr1 中的相应的节点值的父节点的值
 * 再输入一个节点值 n
 * 输出一个数组，表示 n 这个节点下所有子节点
 */

import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [number[], number[], number]

type IReturn = number[];
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    return [[1,3,5,2,6,8, 9, 7, 4, 10], [undefined, 1, 1, 1, 5, 6, 6, 2, 5, 2], 5] as IParam
  }

  public main(nodeList: number[], parentNodeList: number[], target: number) {


    // 遍历父节点数组，找到 match target 的节点，按索引，遍历 nodeList 找到子节点
    // 找到 match target 的节点 -> 先遍历一遍，存成 map，key 是 target, value 是子节点的索引
    // 递归各个子节点

    const parentNodeMap = new Map<number, number[]>();
    
    for (let i = 0 ; i < parentNodeList.length; i++){
      const childNodeIndex = i;
      const parentNode = parentNodeList[i]
      if (typeof parentNode !== 'undefined'){
        const childrenNodeIndex = parentNodeMap.get(parentNode)
        if (childrenNodeIndex) {
          childrenNodeIndex.push(i)
        }else{
          parentNodeMap.set(parentNode, [i])
        }
      }
    }

    const findChildNode = (parentNode: number)=>{
      let res: number[] = []
      const childrenNodeIndexList = parentNodeMap.get(parentNode);
      if (childrenNodeIndexList?.length){
        for (let i = 0; i < childrenNodeIndexList.length; i++){
          const childNodeIndex = childrenNodeIndexList[i];
          const node = nodeList[childNodeIndex]
          res.push(node)
          res = res.concat(findChildNode(nodeList[childNodeIndex]))
        }
      }
      return res;
    }

    return findChildNode(target)

  }
  

  public reference(...ingredient: IParam) {
   return []
  }


  public comparator(res: IReturn, ...ingredient: IParam): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runMain(1);

