import AlgoQuirks = require("../../AlgoQuirks");

import gcd = require('./gcd')
/**
 * 最小公倍数 Lowest Common Multiple
 */
type IParam = [number, number]

type IReturn = number;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    return [121, 143] as IParam
  }

  
  public main(a: IParam[0], b: IParam[1]): IReturn {

    const GCD = gcd(a,b);
    
    return a * b / GCD
      
  }
  
  // 更相减损法
  public reference(a: IParam[0], b: IParam[1]): IReturn {
    
    return 0
    
  }

  public comparator(res: IReturn, time: number, args_0: IParam[0], args_1: IParam[1]): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runMain(1);

