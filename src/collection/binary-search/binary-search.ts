import AlgoQuirks = require("../AlgoQuirks");


class BinarySerch extends AlgoQuirks<[number[], number], number>{


  public ingredientMaker(): [number[], number] {
    
    const number = 20;
    const arr = new Array(200);
    for (let i = 0; i < number; i++){
      arr[i] = parseInt((Math.random() * 100).toString(), 10)
    }
    // sort 方法默认按字典序升序
    const targetArr = Array.from(new Set(arr)).sort((a,b) => a - b);
    // 15 * 0.9999999999999999999999999999999999 精度丢失 变成 15 =_=|||
    const targetIndex= parseInt((targetArr.length * Math.random()).toString(), 10);
    const target = Math.random() > 0.5 ? targetArr[targetIndex] ?? targetArr[targetIndex - 1] : 200
    
    console.log('target', targetIndex, target)
    return [targetArr, target]
  }

  /**
   * 更通用一些的二分查找
   * https://www.bilibili.com/video/BV1d54y1q7k7
   * 
   * 核心思想是用两端指针划定左右边界
   * 边界的划定是用 divide 方法进行的
   * 因为 divide 是一个方法，所以可以比较自由定义实现，比如可以认为小于等于某个数，或者大于等于某个数的为一边
   * 最后根据需要返回编辑值即 L 或 R
   * 可以用来解决类似视频中，找到大于某个数的第一个数，等 case;
   * 当然也可以处理找到某个数这样常规的二分查找能解决的问题
   * 
   */
  public main(arr: number[], target:number){

    let L = -1;
    let R = arr.length;

    // 根据题目自己实现
    const divide = function(index: number): boolean{ 
      if (arr[index] < target) return true;
      return false;
    }

    while (L + 1 !== R){
      const M =  L + Math.floor((R - L) / 2); 
      if (divide(M)){
        L = M;
      } else {
        R = M;
      }
    }
    // 如果题目中说一定能找到 target 就可以不用这个判断
    // if (arr[R] !== target) return -1
    return R;
  }

  /**
   * 常规的二分查找
   * https://www.bilibili.com/video/BV1fA4y1o715
   * 
   * 用来查找有序数组中的某个数
   * L、R 以及 while 的判断条件，要根据右区间的开合情况来决定
   * 这里用的是左闭、右闭的区间
   */
  public reference(arr: number[], target: number) {
    // 左闭，右闭
    let L = 0;
    let R = arr.length - 1;

    while (L <= R){

      const M = L + Math.floor((R - L) / 2);

      if (arr[M] < target){
        L = M + 1;
      } else if (arr[M] > target){
        R = M - 1;
      } else {
        return M
      }
    }
    return -1
  }


}


const binarySearch = new BinarySerch();

binarySearch.runWithRef(20, false)
