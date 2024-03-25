// 二维矩阵旋转 90 度
// link: https://leetcode.cn/problems/rotate-matrix-lcci/
//       https://leetcode.cn/problems/rotate-image/


import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [number[][]]

type IReturn = void;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    const p = [
      [ 5, 1, 9,11],
      [ 2, 4, 8,10],
      [13, 3, 6, 7],
      [15,14,12,16]
    ] 
    // 预期
    // [
    //   [15,13, 2, 5],
    //   [14, 3, 4, 1],
    //   [12, 6, 8, 9],
    //   [16, 7,10,11]
    // ]
    
    // 输出
    // [
    //   [15,13,2,5],
    //   [14,6,3,1],
    //   [12,8,4,9],
    //   [16,7,10,11]
    // ]



    return [p] as IParam
  }

  public main(matrix: IParam[0]): IReturn {

    if (!matrix.length || !matrix[0]?.length) return;

    /**
     * 按圈旋转矩阵，输入左上角和右下角的坐标
     * @param tlx top-left x
     * @param tly top-left y
     * @param rbx bottom-right x
     * @param rby bottom-right y
     */
    function loop(tlx: number, tly: number, rbx: number, rby: number){
      // 在第 tlx 行，按列 i 做旋转
      // i 的范围，是 rby - tly - 1
      for (let i = 0; i < rby - tly; i++){
        
        // 0,0 -> 0,3 -> 3,3 -> 3,0
        // 0,1 -> 1,3 -> 3,2 -> 2,0
        // 0,2 -> 2,3 -> 3,1 -> 1,0
        // [tlx][tly+i] -> [tlx+i][rby] -> [rbx][rby - i] -> [rbx - i][tly]
        // 1,1 -> 1,2 -> 2,2-> 2,1
        
        // 规则就是保持某行或列不变，在列或行上移动 i
        const temp = matrix[tlx][tly + i];
        matrix[tlx][tly+i] = matrix[rbx - i][tly];
        matrix[rbx - i][tly] = matrix[rbx][rby - i];
        matrix[rbx][rby - i] = matrix[tlx + i][rby]
        matrix[tlx + i][rby] = temp;

      }

    }

    let tlx = 0, tly =0, rbx = matrix.length - 1, rby = matrix[0].length - 1

    while(tlx < rbx){
      loop(tlx++, tly++, rbx--, rby--)
    }

    return
      
  }
  

  public reference(...ingredient: IParam): IReturn {
    return;
  }

  public comparator(res: IReturn, time: number, args_0: IParam[0]): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runMain(1);

