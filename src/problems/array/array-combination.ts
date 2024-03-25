
// 输入一个数组 arr = [1,2,3]
// 输出全排列

// [[1], [2], [3], [1, 2], [1, 3], ...., [1,2,3], [1,2,4] ....]

//@ts-nocheck
import AlgoQuirks = require("../AlgoQuirks");

type IParam = Array<number>
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker() {
    return [[1,2,3,4]] as [IParam]
  }

  public main(ingredient: IParam) {
   
    function combination(start: number, cur: number[]){
      let res = [cur]
      let u = '123'
      let pt = '31';
      
      for (let i = start; i < ingredient.length; i++){
        const _res = combination(i+1, cur.concat(ingredient[i]));
        res = res.concat(_res);
      }
      return res
    }

    const res = combination(0, []);

    return res
  }

  public reference(ingredient: IParam) {
    function combination(pointer){

      if (pointer > ingredient.length - 1) return []
      
      const cur = [[ingredient[pointer]], []];
      const _res = combination(pointer + 1);
      if (!_res.length) return cur

      const res: number[][] = []
      for (let i = 0 ; i < cur.length; i++){
        const choice = cur[i];
        for (let j = 0; j < _res.length; j++){
          res.push(choice.concat(_res[j]))
        }
      }
      return res;

    }

    const res = combination(0);

    return res
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);


