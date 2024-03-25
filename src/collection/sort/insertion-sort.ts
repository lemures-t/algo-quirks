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

    for(let i = 0 ; i< arr.length; i++){
      
      let target = arr[i];
      // 从 0 ~ i 中，将 i 和 i-1 ~ 0 进行逐个比较(j)，如果 arr[i] < arr[j]，交换
      // 一次迭代保证 0 ~ i 有序，进行下一次迭代
      // 类似于从牌堆里拿一张牌，然后在手牌中找到合适的位置，插入。
      for(let j = i - 1; j >=0 && target < arr[j]; j--){
        const temp = target;
        target = arr[j];
        arr[j] = temp;
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

