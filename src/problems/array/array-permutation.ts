// 输入一个数组 arr = [1,2,3]
// 输出全排列

// [[1,2,3], [1,3,2], [2,1,3], [2, 3, 1], [3, 1, 2], [3,2,1]]

//@ts-nocheck
import AlgoQuirks = require("../AlgoQuirks");

type IParam = Array<number>
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker() {
    return [[1,2,3,9]] as [IParam]
  }

  // [[1,2], [2,1]]
  public main(ingredient: IParam) {
   
    function permutate (arr: number[]){

      if (!arr.length) return [[]]
      let res: number[[]] = [];
      
      for (let i = 0; i < arr.length; i++){
        
        const _arr = [...arr] 
        _arr.splice(i, 1)
      
        const _res = permutate(_arr);
        
        for (let j = 0 ; j < _res.length; j++){
          res.push([arr[i]].concat(_res[j]))
        }
      }

      return res
      
    }

    const res = permutate(ingredient);

    return res
  }

  public reference(ingredient: IParam) {
    return []
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);


