import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [number[][]]

type IReturn = number[];
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    const arr = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11,12,13,14,15],
      [16,17,18,19,20],
    ]
    return [arr] as IParam
  }

  public main(matrix: number[][]): number[] {

    let i = 0; // 行
    let j = 0; // 列
    const max_i =  matrix.length - 1; 
    if (max_i < 0) return [];
    const max_j = matrix[0].length - 1; 

    const arr: number[] = [];

    let dir: -1 | 1 = 1 // -1 右上; 1 左下;

    while (true){

      const n = matrix[i][j];
      arr.push(n);

      if (i + 1 > max_i && j + 1 > max_j) break;

      // 向左下
      if (dir > 0){
        // 先考虑一般情况
        if (i + 1 <= max_i && j - 1 >=0){
          i++;
          j--;
          continue;
        }
        // 再考虑边界
        // 到下边了
        if (i + 1 > max_i){
          j++;
        }
        // 到左边了, j++ 之后 j - 1 不可能 < 0
        if (j - 1 < 0){
          i++;  
        }
        dir = -1
      // 向右上
      } else {
        if(i - 1 >= 0 && j + 1 <= max_j){
          i--;
          j++;
          continue;
        }
        // 到右边了
        if (j + 1 > max_j){
          i++;
        }
        // 到上边了, i++ 之后，i - 1 不可能小于 0
        if(i - 1 < 0){
          j++;
        }
        dir = 1
      }

    }

    return arr
      
  }
  

  public reference(...ingredient: IParam) {
    return []
  }

  public comparator(): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runWithRef(1);

