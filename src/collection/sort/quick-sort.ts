import AlgoQuirks = require("../../AlgoQuirks");

// https://www.bilibili.com/video/BV19G411T7EC?p=59
type IParam = [number[]]

type IReturn = number[];
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    const len = Math.floor(Math.random() * 20);
    const arr = new Array(len);
    for (let i = 0 ; i < arr.length; i++){
      arr[i] = Math.floor(Math.random() * 20)
    }
    return [arr] as IParam
  }

  public main(arr: number[]){

    function swap (arr: unknown[], index1: number, index2: number){
      const temp = arr[index2];
      arr[index2] = arr[index1];
      arr[index1] = temp;
    }

    function partition(arr: number[], L: number, R: number){
      
      // 选最后一个数作为标记
      const pvoit = arr[R]
      // 小于 pvoit 的数，在左区域，左区域边界指针，初始为 -1
      let left = L - 1;
      // 大于 pvoit 的数，在右区域，右区域边界指针，初始为 arr.length - 1, 即包含了 pvoit 
      let right = R
      
      
      for (let i = L; i < arr.length; ){
        const target = arr[i];
        // 小于
        if (target < pvoit){
          // 当前位置与左区域边界指针的右一个做交换
          swap(arr, i, left + 1)
          // 左区域右扩一个位置
          left++
          // 当前位置指针移动
          i++
        // 大于
        } else if (target > pvoit){
          // 当前位置与右区域边界指针的左一个做交换
          swap(arr, i, right - 1)
          // 右区域左扩一个位置
          right--
        // 等于
        }else{
          i++
        }
        // 指针与右区域的边界指针相遇，表示已完成
        if (i >= right) {
          // pviot 与 右区域的最左侧的值做交换
          swap(arr, R, right)
          break;
        }
      }

      //  返回左区域边界指针和右区域边界指针
      return [left, right + 1]
    
    }

    function sort(arr: number[], L: number, R: number ){
      const [left, right] = partition(arr, L, R)
      if (left > L) sort(arr, L, left) 
      if (right < R) sort(arr, right, R)
    }

    sort(arr, 0, arr.length -1)    
  
    return arr
  }
  

  public reference(...ingredient: IParam) {
    return ingredient[0].sort((a, b) => a - b)
  }

  public comparator(res: IReturn, time: number, ...args: IParam): boolean {
    return false
  }

}

const quirks = new Quirks();

quirks.runTest(1000)