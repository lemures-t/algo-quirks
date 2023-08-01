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

    for (let i = 0; i < arr.length; i++){
      
      let minIndex = i;

      // 选出 i ~ arr.length - 1 中的最小值，替换 i, 保证 i 位置位最小；
      // 下一个迭代，从 i+1 ~ arr.length - 1, 不断重复
      for (let j = i+1; j < arr.length; j++){
        if (arr[j] < arr[minIndex]) minIndex = j;
      }

      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

    }

    return arr
  
  }

  public reference(ingredient: IParam) {
    return ingredient.sort((a, b)=> a - b)
  }
}

const quirks = new Quirks();

quirks.runWithRef(200, false);

