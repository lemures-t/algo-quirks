/**
 * P13 从 1-5 随机，到 1-7 随机
 * 
 * 假设有一个函数 f，等概率返回 a - b (16 - 42) 上的整型,
 * 实现一个函数 g, 等概率返回 c - d ( 8 - 21) 上的整型
 * g 函数不能调用系统的 Math.random() 只能调用 f 来实现获取随机数。
 * 
 * 基本思路
 * 
 * 1. 用 f 生成一个等概率返回 01 的生成器 [fair01Generator]
 *  核心逻辑是将 a - b 之间的一半数映射为 0，另一半数隐射为1，如果 a - b 之间有偶数个数，则要减去一个数后折半（用重试减去）
 * 2. 用 fair01Generator 生成等概率返回 0 - (d-c) 的生成器
 *  核心逻辑是
 *    * 设 0 - (d-c) 之间存在 N 个数
 *    * 用 fair01Generator 结合位运算 (<< 左移)，实现一个等概率返回 0 - 2^M 次方的函数 [fair0NGenerator]
 *        其中 2^(M-1) < N，即 M 是令 2^M >= N 的最小数
 *    * 用 fair0NGenerator 来生成 0 - (d-c) 之间的数，若结果大于 d-c 则重试
 * 3. 调用 2 的方法后 +c, 返回的结果即为 0 - d 之间的数
 *  
 * 要点是，重试不影响生成某个数的概率 
 * 
 */


import AlgoQuirks = require("../../AlgoQuirks");

type IParam = undefined
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    return [undefined] as [IParam]
  }

  public main(ingredient: IParam) {
    
    function f (){
      return Math.floor(Math.random() * 27) + 16
    }

    // 用 f 实现 等概率 0 - 1 生成器
    function fair01Generator(){
      let ans = 16;
      // f 等概率返回 16 - 42 之间的整型，共 27 个数;
      // 随便除掉其中的 1 个数（可以取第一个，也可以取中间的数）
      // 如果 a - b 之间的整数是偶数，则就不需要除掉一个数了
      while(ans === 16){
        // 如果 ans 为需要除掉的数，则重试
        ans = f(); 
      }
      // 将剩余的一半数映射为 0， 另一半数映射为 1
      return ans > 16 && ans <= 29 ? 0 : 1
    }

    function g(){

      // 等概率返回 8 - 21 的整型，只需要等概率返回 0 - 13 的整型，再 +8 即可

      // 等概率返回 0 - 15 的整型
      function fair015Generator(){
        
        let num = 0;
        
        // i 表示二进制位数，2^4 共 16 个数，可以表示 0 - 15 范围的整型
        for (let i = 0; i < 5; i++){
          // 循环求出各个位是 0 还是 1，累加起来，得到一个 0 - 15 的整数
          num += (fair01Generator() << i)
        }

        return num;
      }

      
      let ans = Number.MAX_SAFE_INTEGER;
      // 等概率返回 0 - 15 的结果，如果大于 13，则重试。
      // ans 为等概率返回的 0 - 13 的结果
      while(ans > 13){
        ans = fair015Generator()
      }
      // ans + 8, 等概率返回 8 - 21 的结果
      return ans + 8

    }


    return g()
  
  }

  public reference(ingredient: IParam) {

    return 1 / 14
  }
}

const quirks = new Quirks();


let n = 100000 // 次数越大越精确
for (let i = 8 ; i <= 21; i++){
  let count = 0;
  for (let j = 1 ; j <= n; j++){   
    if (quirks.main(undefined) === i) count++;
  }
  console.log(i, count / n)
}


console.log( quirks.reference(undefined))
