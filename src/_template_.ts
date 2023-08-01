import AlgoQuirks = require("./AlgoQuirks");

type IParam = [string, number]

type IReturn = void;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    return ['', 1] as IParam
  }

  public main(args_0: string, args_1: number): void {
      
  }
  

  public reference(...ingredient: IParam) {
    const args_0 = ingredient[0]
    const args_1 = ingredient[1]
  }

  public comparator(res: void, args_0: string, args_1: number): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runWithRef(1);

