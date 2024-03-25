/**
 * P14
 * 
 * 有一个函数 f, 不等概率返回 01 (返回 0 的概率是 p)
 * 实现一个函数 g, 等概率返回 01, 只调用函数 f;
 * 
 * 基本思路
 *  调用两次 f, 重试第二次调用，直到两次调用的返回值不相等即可
 *  因为两次调用返回值不相等是等概率的，概率均为 p*(1-p)
 *  
 * 另外
 * 两次调用值均为 0 的概率为
 *  (p*p) / ((p*p)+((1-p)*(1-p))
 * 两次调用值均为 1 的概率为
 *  (1-p)*(1-p) / ((p*p)+((1-p)*(1-p)) = 1 - ((p*p) / ((p*p)+((1-p)*(1-p)))
 */


import AlgoQuirks = require("../../AlgoQuirks");

type IParam = undefined
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    return [undefined] as [IParam]
  }

  public main(ingredient: IParam) {
    
    function f(){
      const p = Math.random();
      return p < 0.8 ? 0 : 1
    }

    function g(){
      let ans;
      
      // ans1 = f() 0 | 1;
      // ans2 = f() 0 | 1;
      // ans1 和 ans2 的情况讨论
      // [0,0], [0,1], [1,0], [1,1]
      // 概率分别为
      // (p*p), (p*(1-p)) ((1-p)*p) ((1-p)*(1-p))
      // 可以发现 [0,1], [1,0] 的情况是等概率的
      // 所以抛掉 [0,0], [1,1] 即 ans1 === ans2 的情况（依然用重试的办法）
      do{
        ans = f();
      }while (ans === f());

      return ans
    }

    return g();
  
  }

  public reference(ingredient: IParam) {
    return 0.5
  }
}

const quirks = new Quirks();


let n = 100000 // 次数越大越精确
for (let i = 0 ; i <= 1; i++){
  let count = 0;
  for (let j = 1 ; j <= n; j++){   
    if (quirks.main(undefined) === i) count++;
  }
  console.log(i, count / n)
}

console.log(quirks.reference(undefined));
