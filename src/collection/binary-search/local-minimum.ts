/**
 * P.18
 * 
 * 局部最小
 * 
 * 在一个相邻位置不相等的无序数组中，寻找局部最小。
 * 局部最小的定义为，
 * 最左侧 arr[0] < arr[1], index 0 为局部最小
 * 最右侧 arr[arr.length - 2] > arr[arr.length - 1], index arr.length - 1 为局部最小
 * 中间位置 arr[i - 1] > arr[i] && arr[i] < arr[i+1], index i 为局部最小
 * 
 */


import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [number[]];
type IReturn = number;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {

    const arr: number[] = [];

    if (time === 0) return [[]] as IParam;
    if (time === 1) return [[0, 1, 2]] as IParam;
    if (time === 2) return [[2, 1, 0]] as IParam;
    if (time === 3) return [[1]] as IParam;
    
    for (let i =0 ; i < Math.floor(Math.random() * 200); i++){
      
      let num;

      do {
        num = Math.floor(Math.random() * Math.floor(Math.random() * 200));
      }while (i > 0 && num === arr[i - 1])
      
      arr.push(num)

    }

    return [arr] as IParam


  }

  public main(arr: number[]) {
    if (arr.length === 0) return -1;
    if (arr.length === 1) return 0;

    if (arr[0] < arr[1]) return 0;
    if (arr[arr.length - 2] > arr[arr.length - 1]) return arr.length - 1; 

    let L = 0;
    let R = arr.length - 1;

    while (L <= R){

      const mid = Math.floor(L + (R - L) / 2);

      if (mid - 1 > -1 && mid + 1 < arr.length && arr[mid - 1] > arr[mid] && arr[mid + 1] > arr[mid] ){
        return mid
      }

      if (mid - 1 > -1 && arr[mid - 1] < arr[mid]) {
        R = mid - 1
        continue;
      }

      if (mid + 1 < arr.length && arr[mid + 1] < arr[mid]){
        L = mid + 1
        continue;
      }


    }

    return -1; // 永远走不到
    
  }

  public comparator(res: number, arr: number[]): boolean {

    if (arr.length === 0) return res === -1;
    if (arr.length === 1) return res === 0;
  
    const target = arr[res];
    if (typeof target === 'undefined') return false;
    
    const left = res - 1 > -1 ? arr[res - 1] > target  : true;
    const right = res + 1 < arr.length ? arr[res + 1] > target : true;

    return left && right;
      
  }

  public reference(arr: number[]) {
    return -1
  }
}

const quirks = new Quirks();

quirks.runWithComparator(100000, {printLog: false});

