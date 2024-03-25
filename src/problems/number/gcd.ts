import AlgoQuirks = require("../../AlgoQuirks");

function gcd (a: number, b: number){
  let dividend = Math.max(a,b);
  let divisor = Math.min(a,b);
  let mod = Number.MAX_SAFE_INTEGER;

  while( mod > 0 ){
    mod = dividend % divisor;
    dividend = divisor;
    divisor = mod;
  }
  
  return dividend
}


export = gcd;
/**
 * 最大公约数 Greatest Common Divisor
 */
type IParam = [number, number]

type IReturn = number;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    return [121, 143] as IParam
  }

  // 辗转相除法
  public main(a: IParam[0], b: IParam[1]): IReturn {

    return gcd(a, b)
      
  }
  
  // 更相减损法
  public reference(a: IParam[0], b: IParam[1]): IReturn {
    
    let minuend = a;
    let subtrahend = b;
    let difference = Number.MAX_SAFE_INTEGER;
    
    while (difference > 0){
      difference = Math.abs(minuend - subtrahend);
      minuend = subtrahend;
      subtrahend = difference
    }

    return minuend
    
  }

  public comparator(res: IReturn, time: number, args_0: IParam[0], args_1: IParam[1]): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runTest(1);

