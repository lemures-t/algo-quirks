
/**
 * 给定一个正整型数组，和一个目标数，
 * 从这个数组里取一些数（可重复），相加的结果等于目标数
 * 这些数组成一个数组，求所有可能的这种数组
 * 需要排除掉重复的结果，例如 [2,2,3] 和 [3,2,2] 被认为是一种结果
 * 
 * e.g.
 * arr: [2,3,5,7], target: 7
 * return: [2,2,3], [2,5], [7]
 * 
 * arr: [2], target: 8
 * return [2,2,2,2]
 * 
 * arr: [2,3], target: 1
 * return []
 * 
 */

import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [number[], number]

type IReturn = number[][]
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    
    return [
      [[2,3,5,7], 7],
      [[2], 8],
      [[2,3], 1],
      [[1,2,3,4,5,6,7,8,9], 10]
    ][time] as IParam
  }

  public main(arr: IParam[0], target: IParam[1]): IReturn {
  

    function search(sourceArr: IParam[0], targetNum: IParam[1]) : IReturn{

      let res: IReturn = [];
      
      if (!sourceArr.length) return res;

      for (let i = 0; i < sourceArr.length; i++){
        const num = sourceArr[i];
        const nextTargetNum = targetNum - num;

        if (nextTargetNum === 0){
          res.push([num])
        } else if (nextTargetNum > 0){
          // sourceArr.slice(i) 去重的作用
          // 只在 i 和 i 以后的空间内搜索，i 以前的空间已经进行过搜索了，不需要再去搜索
          const searchRes = search(sourceArr.slice(i), nextTargetNum);
          if (searchRes.length > 0 ){
            searchRes.forEach(group=>{
              group.unshift(num)
            })
            res = res.concat(searchRes)
          }
        }
      }

      return res
    }

    return search(arr, target)
      
  }
  

  public reference(...ingredient: IParam): IReturn {
    return []
  }

  public comparator(res: IReturn, time: number, args_0: IParam[0], args_1: IParam[1]): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runMain(4);

