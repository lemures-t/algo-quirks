import AlgoQuirks = require("./AlgoQuirks");

type IParam = [string, number]

type IReturn = void;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    return ['', 1] as IParam
  }

  public main(args_0: IParam[0], args_1: IParam[1]): IReturn {
      
  }
  

  public reference(...ingredient: IParam): IReturn {
    const args_0 = ingredient[0]
    const args_1 = ingredient[1]
  }

  public comparator(res: IReturn, time: number, args_0: IParam[0], args_1: IParam[1]): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runTest(1);

