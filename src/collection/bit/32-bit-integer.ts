/**
 * 将一个 32 位的整型，打印成 2 进制数
 * 不用原生方法
 */

/**
 * https://juejin.cn/post/7035844421522292750
 * js 中除 10 进制之外的其他进制的 number 类型字面量，如 0b, 0o, 0x, 都会自动转成 10 进制输出
 * 
 * 10 进制的 number 类型数字，可以通过 Number.prototype.toString(radix?) 方法，转成相应的进制字符串
 * 相应的进制字符串，可以通过 parseInt(string, radix) 方法转成对应进制的 10 进制表示, Number(string) 也可以实现这种转换
 * 所以 10 进制和其他进制是可以直接通过原生方法进行互转的
 * 
 * 所以，如果不自己实现，希望 8 进制转 2 进制，可以通过 10 进制做中转
 * Number(string).toString(radixTarget)
 * parseInt(string, radixSource).toString(radixTarget)
 * 
 * const b = 0b1001111001111
 * b.toString(16) -> 也可以直接转成 16 进制
 * 
 */



/**
 * https://blog.csdn.net/m0_37263637/article/details/81628209
 * 32 位有符号整型的范围是 - 2^31 ~ 2^31 - 1 (-2^31, 0 ~ 2^31 - 1), 大约在 21 亿的样子
 * js 整型位运算只支持 32 位整型
 */

/**
 * https://eminoda.github.io/2020/01/23/js-base-64-double/
 * https://blog.csdn.net/freeristantent/article/details/124066890
 * 
 * IEEE754
 * 63位，正负位 (S sign),
 * 62 - 52 位，指数位（E exponent),
 * 51 - 0 位, 尾数位（M mantissa）
 * 
 * js 整型范围，IEEE754 约定 1.M，共 53 位，范围为 -2^53 + 1(Number.MIN_SAFE_INTEGER) ~ 2^53 -1(Number.MAX_SAFE_INTEGER), 
 * js 最小精度，2^-52 (Number.EPSILON)
 * 
 * 
 * 1 * 1 * 1.0
 */

/**
 * 32 为有符号整型，最高位 31 位是符号位, 0 为正 -1^0 , 1 为负数 -1^1;
 * 负数用 1xxxxx 表示，计算方法是 xxxx 按位取反后 +1, 得出的数 * -1 即为 1xxxx 表示的负数
 * 
 * 1 + (-1) = 0
 *    0,001 
 * +  1,111
 * =  0,000
 * 
 */


/**
 * 
 * int 32
 * 
 * >> 带符号右移，左边第一位用符号位补
 * >>> 不带符号右移，左边第一位用 0 来补
 * 
 * 相反数, 其实就是负数
 * a 的相反数是 ~a + 1
 * 32位整型的最小值，相反数还是他自己 (10000..0 -> 01111..1 + 1 -> 10000..0)
 * 
 */


import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [number]
type IReturn = string
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {

    const num = 2100000000;
    return [num] as IParam
  }

  public main(ingredient: number) {
   
    let res = ''
    for (let i = 31; i > -1; i--){

      // ((1 << i) & ingredient)
      // 第 i 位为 1 的数 x 与 ingredient 与运算
      // 如果 ingredient 的 i 位 也是 1, 则返回 1, 否则返回 0
      // x 的其他位都是 0, 与 ingredient 的其他位做与运算，返回都是 0
      // 因此，执行完成后，会返回 1 << i 或者 0, (1 << i 因为是 2 进制，输出的时候会直接变成 10 进制)
      // 所以判断输出是否大于 0, 如果大于 0，则 i 位为 '1'

      const bit = ((1 << i) & ingredient) > 0 ? '1' : '0'
      
      // 不打印高位多余的 0
      if (bit === '0' && !res) continue;
      
      res += bit
    }    
    return res
  
  
  }

  public comparator(res: string, args_0: number): boolean {
    return true
  }

  public reference(ingredient: number) {
    return ingredient.toString(2)
  }
}

const quirks = new Quirks();

quirks.runWithRef(1);

