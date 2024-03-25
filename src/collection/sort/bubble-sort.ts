import AlgoQuirks = require("../../AlgoQuirks");

type IParam = number[]
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    if (time === 0) return [[]] as [IParam];
    if (time === 1) return [[1]] as [IParam];

    let arr: number[] = []
    for (let i = 0 ; i < 200; i++){
      arr.push(Math.floor(Math.random() * 200))
    }
    return [arr] as [IParam]
  }

  public main(ingredient: IParam) {

    const arr = ingredient;

    for (let i = arr.length -1; i > -1; i--){

      // 从 0 ~ arr.length - 1 中，将最大的值交换到 arr.length - 1 位置上;
      // 在 0 ~ arr.length - 2 中，继续迭代
      for (let j = 0; j < i; j++){
        let pre = arr[j];
        let next = arr[j+1];
        if (pre > next){
          const temp = pre;
          pre =  next;
          next = temp
        }
      }

    }

    return arr
  
  }

  public reference(ingredient: IParam) {
    return ingredient.sort((a, b)=> a - b)
  }
}

const quirks = new Quirks();

quirks.runWithRef(200, false);

